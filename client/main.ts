import {Component, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({ selector: 'main' })

@View({
    templateUrl: 'client/main.html',
    directives: [RouterLink]
})

export class Main { }