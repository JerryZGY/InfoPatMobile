import {Response, Aggs, Hit, ParsedAggs, ParsedContent, IParsedData} from 'lib/responser';

class ParsedData implements IParsedData {
    total: number;
    hits: Hit[];
    took: number;
    aggs: ParsedAggs;
    modifiedAt: Date;
   
    constructor(res: Response) {
        this.total = res.total;
        this.hits = res.hits;
        this.took = res.took;
        this.aggs = <ParsedAggs>{
            year: this.parse(res.aggs.issuedYear_agg),
            type: this.parse(res.aggs.applType_agg),
            country: this.parse(res.aggs.patentCountry_agg)
        };
        this.modifiedAt = new Date();
    }
    
    private parse(aggs: Aggs): ParsedContent[] {
        return aggs.buckets.slice(0, 6).map((x) => { return <ParsedContent>{ "key": x.key_as_string || x.key, "count": x.doc_count } });
    }
}

export class RemoteServer {
    private remoteServer: any = DDP.connect('http://upat.webpat.co/');
    private options = { "enableAggs": true, "aggs": ["issuedYear_agg", "applType_agg", "patentCountry_agg"] };
    search(text: string): ParsedData { return new ParsedData(this.remoteServer.call("patent_search", text, 10, 0, this.options)); }
}