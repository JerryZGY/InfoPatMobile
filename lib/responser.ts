export interface Response {
    total: number;
    hits: Hit[];
    took: number;
    aggs?: AllAggs;
}

export interface Hit {
    pubnoRaw: string;
    apd: string;
    apnRaw: string;
    apdRaw: string;
    title: string;
    pubDate: Date;
    database: string;
    imageUrl: string;
}

export interface AllAggs {
    issuedYear_agg: Aggs,
    applType_agg: Aggs,
    patentCountry_agg: Aggs
}

export interface Aggs {
    buckets: {
        key_as_string?: string;
        key: string;
        doc_count: number;
    }[]
}

export interface ParsedAggs {
    year: ParsedContent[],
    type: ParsedContent[],
    country: ParsedContent[]
}

export interface ParsedContent {
    key: string;
    count: number;
}

export interface IParsedData {
    total: number;
    hits: Hit[];
    took: number;
    aggs?: ParsedAggs;
    modifiedAt: Date;
}