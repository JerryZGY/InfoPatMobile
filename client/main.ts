import {Component, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({ selector: 'main' })

@View({
    templateUrl: 'client/main.html',
    directives: [RouterLink]
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
    
    reload() {
        this.isSearching = false;
        this.isSearched = false;
        $("#search").focus();
    }
    
    search(text) {
        $("#search").blur();
        this.isSearching = true;
        setTimeout(() => {
            this.isSearching = false;
            this.isSearched = true;
        }, 2000)
    }
}