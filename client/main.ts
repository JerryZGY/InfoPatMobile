import {RouterLink} from 'angular2/router';
import {Component, View} from 'angular2/core';
import {Logger} from 'lib/logger';
import {RadioControlValueAccessor} from "client/lib/ts/radio_value_accessor";
import {Analyze} from "client/analyze"
@Component({ selector: 'main' })

@View({
    templateUrl: 'client/main.html',
    directives: [RouterLink, RadioControlValueAccessor, Analyze]
})

export class Main {
    tw = false;
    cn = true;
    us = true;
    // eu = false;
    // jp = false;
    // kr = false;
    isSearching = false;
    isSearched = false;
    isLegacy = false;
    viewType = "legacy";

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