import {IParsedData, ParsedContent} from 'lib/responser';
import {RouterLink} from "angular2/router";
import {Results} from 'collections/results';
import {Component, View} from "angular2/core";
import {MeteorComponent} from "angular2-meteor";
import {Analyze} from "client/analyze"
import {Detail} from "client/detail";
@Component({ selector: "main", templateUrl: "client/main.html", directives: [RouterLink, Analyze, Detail] })
export class Main extends MeteorComponent {
    // Random id for mongo query.
    queryToken: string;
    // Mongo query results.
    results: Mongo.Cursor<IParsedData>;
    // Aggregations parsed from mongo query result.
    aggs: { [key: string]: ParsedContent[] }[];
    // Country search parameter. True = Enabled
    tw = true;
    cn = false;
    us = false;
    // UI parameter.
    isSearching = false;
    isSearched = false;
    isDetail = false;
    // Detail page data binding.
    detailData: { type: string, content: ParsedContent[] };

    constructor() {
        super();
        this.queryToken = Random.id();
        this.subscribe("results", () => {
            this.results = Results.find({ _id: this.queryToken });
            this.autorun(() => this.assignKeyToAggArray(), true);
        });
    }

    assignKeyToAggArray() {
        if (this.results.fetch().length != 0) {
            this.aggs = [];
            let aggs = this.results.fetch()[0].aggs;
            for (var key in aggs)
                // Assign the first eight aggs.
                this.aggs.push({ "key": key, "val": aggs[key].slice(0, 8) });
        }
    }

    back() {
        if (!this.isDetail)
            this.transitionsContentPage(".result-wrapper", ".content-wrapper");
        else
            this.transitionsResultPage(".detail-wrapper", ".analyze-wrapper");
    }

    search(text) {
        if (text) {
            $("#search").blur();
            this.isSearching = true;
            Meteor.call("search", text, this.countryCheck(), this.queryToken, () => this.transitionsContentPage(".content-wrapper", ".result-wrapper"));
        }
    }

    countryCheck(): string[] {
        var countries: string[] = [];
        if (this.tw) countries.push("TW");
        if (this.cn) countries.push("CN");
        if (this.us) countries.push("US");
        return countries
    }

    showDetail(key: string) {
        this.detailData = {
            type: key,
            content: this.results.fetch()[0].aggs[key]
        };
        this.transitionsResultPage(".analyze-wrapper", ".detail-wrapper");
    }
    
    transitionsContentPage(current: string, next: string) {
        $(current).animate({ opacity: 0, easing: "easeOutQuart" }, 300, () => $(current).hide());
        if (this.isSearched)
            $(next).show(() => $("#search").focus()).animate({ opacity: 1, easing: "easeOutQuart" }, 300);
        else {
            $(next).show().animate({ opacity: 1, easing: "easeOutQuart" }, 300);
            $(".analyze-wrapper").scrollTop(0);
        }
        this.isSearching = false;
        this.isSearched = !this.isSearched;
    }
    
    transitionsResultPage(current: string, next: string) {
        $(current).animate({ opacity: 0, easing: "easeOutQuart" }, 300, () => $(current).hide());
        if (this.isDetail)
            $(next).show().animate({ opacity: 1, easing: "easeOutQuart" }, 300);
        else
            $(next).show().scrollTop(0).animate({ opacity: 1, easing: "easeOutQuart" }, 300);
        this.isDetail = !this.isDetail;
    }
}