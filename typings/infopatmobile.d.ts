// Type definitions for meteorhacks:npm 1.5.0
// https://github.com/meteorhacks/npm/
declare module Meteor {
    export function npmRequire(moduleName: string): Function;
}

declare module Async {
    export function runSync(func: (done: (error: any, result: any) => void) => void): { error: any; result: any; };
    export function wrap(funcOrObject: Function | Object, functionNameOrFunctionNameList?: string | string[]): Function;
}

// Type definitions for Materialize 0.97.5
// Definitions by: JerryZGY
interface JQuery {
    carousel(): JQuery;
    characterCounter(): JQuery;
    collapsible(): JQuery;
    scrollTo(): JQuery;
    dropdown(): JQuery;
    material_select(): JQuery;
    materialbox(): JQuery;
    parallax(): JQuery;
    pushpin(): JQuery;
    scrollSpy(): JQuery;
    sideNav(): JQuery;
    slider(): JQuery;
    tabs(): JQuery;
    tooltip(): JQuery;
}

// Type definitions for EsAPI
// Definitions by: JerryZGY
interface Resp {
    _id: string;
    total: number;
    hits: Hit[];
    took: number;
    aggs: Aggs;
}

interface Hit {
    pubnoRaw: string;
    apd: string;
    apnRaw: string;
    apdRaw: string;
    title: string;
    pubDate: Date;
    database: string;
    imageUrl: string;
}

interface Aggs {
    year_agg: {
        buckets: [{
            key_as_string: string;
            key: number;
            doc_count: number;
        }]
    },
    applType_agg: {
        buckets: [{
            key: number;
            doc_count: number;
        }]
    },
    patentCountry_agg: {
        buckets: [{
            key: number;
            doc_count: number;
        }]
    }
}