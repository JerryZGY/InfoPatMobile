import {Router} from "angular2/router";
import {Component, View} from "angular2/core";
@Component({ selector: "main", templateUrl: "client/main.html" })
export class Main {
    isSearching = false;
    // Country search parameter. True = Enabled
    tw = true;
    cn = false;
    us = false;

    constructor(private router: Router) {}

    search(text) {

    }

    countryCheck(): string[] {
        var countries: string[] = [];
        if (this.tw) countries.push("TW");
        if (this.cn) countries.push("CN");
        if (this.us) countries.push("US");
        return countries
    }
}