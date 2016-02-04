import {IParsedData, ParsedContent} from 'lib/responser';
import {RouterLink} from "angular2/router";
import {Results} from 'collections/results';
import {Component, View} from "angular2/core";
import {MeteorComponent} from "angular2-meteor";
import {Analyze} from "client/analyze"
@Component({ selector: "main", templateUrl: "client/main.html", directives: [RouterLink, Analyze] })
export class Main extends MeteorComponent {
    results: Mongo.Cursor<IParsedData>;
    aggs: { [key: string]: ParsedContent[] }[];
    tw = false;
    cn = true;
    us = true;
    isSearching = false;
    isSearched = false;
    isLegacy = false;

    constructor() {
        super();
        this.subscribe("results", () => {
            this.results = Results.find();
            this.autorun(() => {
                this.aggs = [];
                let aggs = this.results.fetch()[0].aggs;
                for (var key in aggs)
                    if (aggs[key].length != 0)
                        this.aggs.push({ "key": key, "val": aggs[key] })
            }, true);
        });
    }

    reload() {
        this.isSearching = false;
        this.isSearched = false;
        $("#legacy").click();
        $("#search").focus();
    }

    search(text) {
        if (text) {
            $("#search").blur();
            this.isSearching = true;
            Meteor.call("search", text, this.countryCheck(), (err, res) => {
                this.isSearching = false;
                this.isSearched = true;
                this.isLegacy = true;
            });
        }
    }

    countryCheck(): string[] {
        var countries: string[] = [];
        if (!this.tw) countries.push("TW");
        if (!this.cn) countries.push("CN");
        if (!this.us) countries.push("US");
        return countries
    }
}