import {RouterLink} from 'angular2/router';
import {Results} from 'collections/results';
import {Component, View} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';

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
    results;
    viewType = "legacy";
    yearTotal;

    constructor() {
        super();
        this.subscribe('results', () => {
            this.results = Results.findOne();
            this.yearTotal = Results.findOne()["aggs"]["year"].reduce((memo, year) => memo + year.count, 0);
        }, true);
    }

    reload() {
        this.isSearching = false;
        this.isSearched = false;
        this.viewType = "legacy"
        $("#search").focus();
    }

    search(text) {
        // Meteor.call("search", text);
        $("#search").blur();
        this.isSearching = true;
        setTimeout(() => {
            this.isSearching = false;
            this.isSearched = true;
            this.isLegacy = true;
        }, 100)
    }

    renderChartByViewType() {
        d3.select("svg").selectAll("*").remove();
        var width = 500,
            height = 500,
            radius = Math.min(width, height) / 2,
            color = d3.scale.category20(),
            arc = d3.svg.arc().innerRadius(radius - 100).outerRadius(radius - 20),
            pie = d3.layout.pie().value(function(d) { return d["count"]; }),
            svg = d3.select("svg").append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
            values = d3.values(this.results.aggs[this.viewType]);
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