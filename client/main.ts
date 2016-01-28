import {RouterLink} from 'angular2/router';
import {Results} from 'collections/results';
import {Component, View} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';
import {IParsedData} from 'lib/dataTypes';

@Component({ selector: 'main' })

@View({
    templateUrl: 'client/main.html',
    directives: [RouterLink]
})

export class Main extends MeteorComponent {
    tw = false;
    us = false;
    eu = false;
    cn = false;
    jp = false;
    kr = false;
    isSearching = false;
    isSearched = false;
    isLegacy = false;
    results: Mongo.Cursor<IParsedData>;
    result: IParsedData;
    viewType = "legacy";
    yearTotal: number = 0;
    typeTotal: number = 0;
    countryTotal: number = 0;

    constructor() {
        super();
        this.subscribe("results", () => {
            this.results = Results.find();
            this.autorun(() => {
                this.result = this.results.fetch()[0];
                this.yearTotal = this.result.aggs.year.reduce((x, y) => x + y.count, 0);
                this.typeTotal = this.result.aggs.type.reduce((x, y) => x + y.count, 0);
                this.countryTotal = this.result.aggs.country.reduce((x, y) => x + y.count, 0);
            }, true);
        });
    }

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
                // if (err)
                console.log("Update error:", err, res);
                this.isSearching = false;
                this.isSearched = true;
                this.isLegacy = true;
            });
        }
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
        svg.append("text")
            .text(this.countryTotal + "筆")
            .attr("class", "label")
            .attr("dy", "15");
        svg.datum(values.map(function(d) { return { "count": 0 }; })).selectAll("path")
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
    }
}