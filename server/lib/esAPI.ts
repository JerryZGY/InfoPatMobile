import {Response, Aggs, Hit, ParsedAggs, ParsedContent, IParsedData} from 'lib/dataTypes';

class ParsedData implements IParsedData {
    total: number;
    hits: Hit[];
    took: number;
    aggs: ParsedAggs;
   
    constructor(res: Response) {
        this.total = res.total;
        this.hits = res.hits;
        this.aggs = <ParsedAggs>{
            year: this.parse(res.aggs.year_agg),
            type: this.parse(res.aggs.applType_agg),
            country: this.parse(res.aggs.patentCountry_agg)
        };
    }
    
    private parse(aggs: Aggs): ParsedContent[] {
        return aggs.buckets.slice(0, 6).map((x) => { return <ParsedContent>{ "key": x.key_as_string || x.key, "count": x.doc_count } });
    }
}

export class RemoteServer {
    private remoteServer = DDP.connect('http://upat.webpat.co/');
    private options = { "enableAggs": true, "aggs": ["year_agg", "applType_agg", "patentCountry_agg"] };

    search(text: string, cb: (data: ParsedData) => void) {
        this.remoteServer.call("patent_search", text, 10, 0, this.options, (err, res: Response) => cb(new ParsedData(res)))
    }
}