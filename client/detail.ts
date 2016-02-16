import {Component, Input, OnChanges, AfterViewInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {ParsedContent} from "lib/responser";
import {DynamicCounter} from "client/lib/ts/dynamicCounter";
@Component({ selector: "detail", templateUrl: "client/detail.html" })
export class Detail implements OnChanges, AfterViewInit {
    @Input() content: ParsedContent[];
    total: number;

    ngOnChanges() { this.total = this.content.reduce((x, y) => x + y.count, 0) }

    ngAfterViewInit() {
        // this.renderBarChart();
        // !this.counter ? this.renderDynamicCounter() : this.updateDynamicCounter();
    }
}