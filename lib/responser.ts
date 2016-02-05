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
    publishedYear_agg: Aggs,
    appliedYear_agg: Aggs,
    docKind_agg: Aggs,
    applType_agg: Aggs,
    patentCountry_agg: Aggs,
    applicant_agg: Aggs,
    primaryApplicant_agg: Aggs,
    assignee_agg: Aggs,
    primaryAssignee_agg: Aggs,
    inventor_agg: Aggs,
    primaryInventor_agg: Aggs,
    examiner_agg: Aggs,
    primaryExaminer_agg: Aggs,
    ipc_agg: Aggs,
    mainIpc_agg: Aggs,
    upc_agg: Aggs,
    mainUpc_agg: Aggs,
    cpc_agg: Aggs,
    mainCpc_agg: Aggs,
    locarno_agg: Aggs,
    mainLocarno_agg: Aggs
}

export interface Aggs {
    buckets: {
        key_as_string?: string;
        key: string;
        doc_count: number;
    }[]
}

export interface ParsedAggs {
    [key: string]: ParsedContent[];
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