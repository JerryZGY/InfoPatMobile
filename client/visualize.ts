import {Component} from "angular2/core";
import {RouterLink} from 'angular2/router';
import {DynamicCounter} from 'client/lib/ts/dynamicCounter';
import {MeteorComponent} from 'angular2-meteor';
import {Results} from "collections/results";
@Component({ selector: "visualize", templateUrl: "client/visualize.html", directives: [RouterLink] })
export class Visualize extends MeteorComponent{
    result;
    results;
    total;
    counter: DynamicCounter;
    constructor() {
        super();
        this.subscribe("results", () => {
            this.results = Results.find();
            this.autorun(() => {
                this.result = this.results.fetch()[0];
                this.total = {
                    year: this.result.aggs.year.reduce((x, y) => x + y.count, 0),
                    type: this.result.aggs.type.reduce((x, y) => x + y.count, 0),
                    country: this.result.aggs.country.reduce((x, y) => x + y.count, 0)
                }
                this.updateDynamicCounter(this.total["year"]);
            }, true);
            this.renderDonutChart();
            this.renderDynamicCounter();
        });
    }

    renderDonutChart() {
        var data = this.result.aggs.year,
            width = 364,
            height = 364,
            radius = height / 2 - 10,
            arc = d3.svg.arc().innerRadius(radius - 40).outerRadius(radius),
            pie = d3.layout.pie().value((d) => { return d["count"]; }).padAngle(.01),
            color = d3.scale.ordinal().range(["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3",
            "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#FF5722", "#795548", "#607D8B"]),
            svg = d3.select("svg")
            .append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        svg.datum(data.map((d) => { return { "count": 0 } })).selectAll("path")
            .data(pie)
            .enter().append("path")
            .style("fill", (d, i) => color(i))
            .attr("d", arc)
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
    
    renderDynamicCounter() {
        this.counter = new DynamicCounter("counter", this.total["year"]);
    }
    
    updateDynamicCounter(value: number) {
        if (this.counter) this.counter.update(value);
    }
}