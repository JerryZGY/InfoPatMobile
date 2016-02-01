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
    us = false;
    eu = false;
    cn = false;
    jp = false;
    kr = false;
    isSearching = false;
    isSearched = false;
    isLegacy = false;
    viewType = "legacy";

    reload() {
        this.isSearching = false;
        this.isSearched = false;
        $("#search").focus();
    }

    search(text) {
        if (text) {
            $("#search").blur();
            this.isSearching = true;
            Meteor.call("search", text, (err, res) => {
                this.isSearching = false;
                this.isSearched = true;
                this.isLegacy = true;
            });
        }
    }
}