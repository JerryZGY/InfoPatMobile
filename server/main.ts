import {Results} from 'collections/results';

let esAPI = DDP.connect('http://upat.webpat.co/');

function parseYearAggs(aggs: Aggs): Object[] {
    return aggs.year_agg.buckets.slice(0, 20).map((x) => { return { "year": x.key_as_string, "count": x.doc_count } });
}

function parseTypeAggs(aggs: Aggs): Object[] {
    return aggs.applType_agg.buckets.map((x) => { return { "type": x.key, "count": x.doc_count } });
}

function parseCountryAggs(aggs: Aggs): Object[] {
    return aggs.patentCountry_agg.buckets.map((x) => { return { "type": x.key, "count": x.doc_count } });
}

esAPI.call("patent_search", "test", 10, 0, { "enableAggs": true, "aggs": ["year_agg", "applType_agg", "patentCountry_agg"] }, function(err, resp: Resp) {
    let data = {
        "total": resp.total,
        "hits": resp.hits,
        "aggs": {
            "year": parseYearAggs(resp.aggs),
            "type": parseTypeAggs(resp.aggs),
            "country": parseCountryAggs(resp.aggs)
        }
    }
    Results.update(Results.findOne() || {}, { $set: data }, { upsert: true });
})

Meteor.methods({
    // search: function(text: string, country: string[]) {
    //     esAPI.call("patent_search", text, 10, 0, { "enableAggs": true, "aggs": ["year_agg", "applType_agg", "patentCountry_agg"] }, function(err, resp: Resp) {
    //         console.log(parseYearAggs(resp.aggs));
    //         let a: Resp = resp;
            
    //         // Results.update(Results.findOne() || {}, { $set: res }, { upsert: true });
    //     })
    // }
});

Meteor.publish('results', function() {
    return Results.find();
});