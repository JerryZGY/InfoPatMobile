import {IParsedData} from 'lib/responser';
import {Results} from 'collections/results';
import {MeteorComponent} from 'angular2-meteor';
import {Component, Input, OnChanges} from 'angular2/core';
import {DynamicCounter} from 'client/lib/ts/dynamicCounter';

@Component({
    selector: 'analyze',
    templateUrl: 'client/analyze.html'
})

export class Analyze extends MeteorComponent implements OnChanges {
    @Input() viewTypeProperty: string;
    viewType: string;
    viewTypeString = {
        "year": "核准年度分析",
        "type": "專利類型分析",
        "country": "專利國別分析"
    };
    result: IParsedData;
    results: Mongo.Cursor<IParsedData>;
    total: { [key: string]: number };

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
            }, true);
        });
    }

    ngOnChanges(changes) {
        this.viewType = changes["viewTypeProperty"].currentValue;
        if (this.viewType != "legacy") this.renderChartByViewType();
    }

    renderChartByViewType() {
        d3.select("svg").selectAll("*").remove();
        var width = 500,
            height = 500,
            radius = Math.min(width, height) / 2,
            color = d3.scale.category20c(),
            arc = d3.svg.arc().innerRadius(radius - 100).outerRadius(radius - 20),
            pie = d3.layout.pie().value(function(d) { return d["count"]; }),
            svg = d3.select("svg").append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
            values = d3.values(this.result.aggs[this.viewType]);
        svg.datum(values.map(function(d) { return { "count": 0 }; }))
            .selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("fill", function(d, i) { return color(<any>i); })
            .attr("d", <any>arc)
            .each(function(d) { this._current = d });
        svg.datum(values).selectAll("path").data(pie).transition().duration(750).attrTween("d", arcTween);
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) {
                return arc(<any>i(t));
            };
        }
        this.renderDynamicCounterOnSVG(svg);
    }

    renderDynamicCounterOnSVG(svg: d3.Selection<any>) {
        let infoWrapper = svg.append("foreignObject")
        .attr({
            "x": -125,
            "y": -50,
            "width": 250,
            "height": 100
        }).append("xhtml:div").attr("class", "info-wrapper");
        infoWrapper.append("xhtml:div").attr("class", "info").text(this.viewTypeString[this.viewType]);
        infoWrapper.append('xhtml:div').attr("id", "counter");
        new DynamicCounter("counter", this.total[this.viewType]);
    }
}