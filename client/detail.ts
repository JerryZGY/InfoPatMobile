import {Component, Input, OnChanges} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {ParsedContent} from "lib/responser";
import {DynamicCounter} from "client/lib/ts/dynamicCounter";
@Component({ selector: "detail", templateUrl: "client/detail.html" })
export class Detail implements OnChanges {
    @Input() content: ParsedContent[];
    counter: DynamicCounter;
    total: number;

    ngOnChanges() {
        if (this.content) {
            this.total = this.content.reduce((x, y) => x + y.count, 0);
            !this.counter ? this.renderDynamicCounter() : this.updateDynamicCounter();
        }
    }

    renderDynamicCounter() { this.counter = new DynamicCounter("detail-dynamic", this.total) }
    updateDynamicCounter() { this.counter.update(this.total) }
}