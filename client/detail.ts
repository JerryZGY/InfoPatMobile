import {Component, Input, OnChanges, AfterViewInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {ParsedContent} from "lib/responser";
import {DynamicCounter} from "client/lib/ts/dynamicCounter";
@Component({ selector: "detail", templateUrl: "client/detail.html" })
export class Detail implements OnChanges, AfterViewInit {
    @Input() content: ParsedContent[];

    ngOnChanges() {

    }

    ngAfterViewInit() {
        this.renderBarChart();
        // !this.counter ? this.renderDynamicCounter() : this.updateDynamicCounter();
    }

    renderBarChart() {
        // var data = this.content,
        //     size = 364,
        //     radius = size / 2 - 10,
        //     arc = d3.svg.arc().innerRadius(radius - 40).outerRadius(radius),
        //     pie = d3.layout.pie().padAngle(.02).value((d) => { return d["count"]; }),
        //     osvg = d3.select(`#${this.type}-svg`);
        // osvg.selectAll("*").remove();
        // var svg = osvg.append("g").attr("transform", "translate(" + size / 2 + "," + size / 2 + ")");
        // svg.datum(data.map((d) => { return { "count": 0 } })).selectAll("path")
        //     .data(pie)
        //     .enter().append("path")
        //     .attr("class", (d, i) => `color-${i}`)
        //     .attr("d", <any>arc)
        //     .each(function(d) { this._current = d });
        // svg.datum(data).selectAll("path")
        //     .data(pie)
        //     .transition().duration(750)
        //     .attrTween("d", arcTween);
        // function arcTween(attr) {
        //     var i = d3.interpolate(this._current, attr);
        //     this._current = i(0);
        //     return (t) => arc(<any>i(t));
        // }
        var data = this.content;

        var margin = { top: 20, right: 20, bottom: 30, left: 40 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "%");

        var svg = d3.select("svg").append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function(d) { return d.key; }));
            y.domain([0, d3.max(data, function(d) { return d.count; })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Frequency");

            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.key); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d.count); })
                .attr("height", function(d) { return height - y(d.count); });

        function type(d) {
            d.frequency = +d.frequency;
            return d;
        }
    }
}