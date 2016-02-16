import {Component, Input, OnChanges, AfterViewInit} from "angular2/core";
import {ParsedContent} from "lib/responser";
import {DynamicCounter} from "client/lib/ts/dynamicCounter";
@Component({ selector: "analyze", templateUrl: "client/analyze.html" })
export class Analyze implements OnChanges, AfterViewInit {
    @Input() type: string;
    @Input() content: ParsedContent[];
    counter: DynamicCounter;
    total: number;

    ngOnChanges() { this.total = this.content.reduce((x, y) => x + y.count, 0) }

    ngAfterViewInit() {
        this.renderDonutChart();
        !this.counter ? this.renderDynamicCounter() : this.updateDynamicCounter();
    }

    renderDonutChart() {
        var data = this.content,
            size = 364,
            radius = size / 2 - 10,
            arc = d3.svg.arc().innerRadius(radius - 40).outerRadius(radius),
            pie = d3.layout.pie().padAngle(.02).value((d) => { return d["count"]; }),
            osvg = d3.select(`#${this.type}-svg`);
        osvg.selectAll("*").remove();
        var svg = osvg.append("g").attr("transform", "translate(" + size / 2 + "," + size / 2 + ")");
        svg.datum(data.map((d) => { return { "count": 0 } })).selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("class", (d, i) => `color-${i}`)
            .attr("d", <any>arc)
            .each(function(d) { this._current = d });
        svg.datum(data).selectAll("path")
            .data(pie)
            .transition().duration(750)
            .attrTween("d", arcTween);
        function arcTween(attr) {
            var i = d3.interpolate(this._current, attr);
            this._current = i(0);
            return (t) => arc(<any>i(t));
        }
    }

    renderDynamicCounter() { this.counter = new DynamicCounter(`${this.type}-dynamic`, this.total) }
    updateDynamicCounter() { this.counter.update(this.total) }
}