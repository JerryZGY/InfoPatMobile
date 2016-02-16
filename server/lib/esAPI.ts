import {Response, Aggs, Hit, ParsedAggs, ParsedContent, IParsedData} from 'lib/responser';
import {Logger} from 'lib/logger';

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
        this.aggs = <ParsedAggs>{};
        for (var agg in res.aggs) {
            let data = this.parse(res.aggs[agg]);
            if (data.length != 0)
                this.aggs[agg] = data;
        }
        this.modifiedAt = new Date();
    }
    
    private parse(aggs: Aggs): ParsedContent[] {
        return aggs.buckets.map((x) => { return <ParsedContent>{ "key": x.key_as_string || x.key, "count": x.doc_count } });
    }
    
    private parseSlice(aggs: Aggs, section: number): ParsedContent[] {
        return aggs.buckets.slice(0, section).map((x) => { return <ParsedContent>{ "key": x.key_as_string || x.key, "count": x.doc_count } });
    }
}

export class RemoteServer {
    private remoteServer: any = DDP.connect('http://upat.webpat.co/');
    search(text: string, country: string[]): ParsedData {
        new Logger().debug(">>> EsAPI search call");
        let options = { "country": country, "enableHits": false, "enableAggs": true, "aggs": [
            "issuedYear_agg",
            "publishedYear_agg",
            "appliedYear_agg",
            "docKind_agg",
            "applType_agg",
            "patentCountry_agg",
            "applicant_agg",
            "primaryApplicant_agg",
            "assignee_agg",
            "primaryAssignee_agg",
            "inventor_agg",
            "primaryInventor_agg",
            "examiner_agg",
            "primaryExaminer_agg",
            "ipc_agg",
            "mainIpc_agg",
            "upc_agg",
            "mainUpc_agg",
            "cpc_agg",
            "mainCpc_agg",
            "locarno_agg",
            "mainLocarno_agg"
        ] };
        return new ParsedData(this.remoteServer.call("patent_search", text, 10, 0, options));
    }
    searchAggs(text: string, aggName: string, aggSize = 20, options: Object) {
        
    }
}