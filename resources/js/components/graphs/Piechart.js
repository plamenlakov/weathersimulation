import React from 'react';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import * as d3 from "d3";

function Piechart() {
    document.addEventListener('DOMContentLoaded', function (e) {
        const EU_COUNTRIES = [
        'Austria',
        'Belgium',
        'Bulgaria',
        'Croatia',
        'Cyprus',
        'CZECHOSLOVAKIA',
        'Denmark',
        'Estonia',
        'Finland',
        'France',
        'Germany',
        'Greece',
        'Hungary',
        'Ireland',
        'Italy',
        'Latvia',
        'Lithuania',
        'Luxembourg',
        'Malta',
        'Netherlands',
        'Poland',
        'Portugal',
        'Romania',
        'Slovenia',
        'Spain',
        'Sweden',
        'United Kingdom',]

        var width = 250,
            height = 250,
            svg = d3.select("svg").attr('width', width).attr('height', height).attr('r', radius),
            radius = Math.min(width, height) / 2,
            g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c', '#a99a1c', '#afeafe', '#333333', '#999999', '#00FF00']);

        // Generate the pie
        var pie = d3.pie();

        // Generate the arcs
        var arc = d3.arc()
            .innerRadius(radius / 2)
            .outerRadius(radius);

        var final_data = [];
        d3.csv("https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_csv/data/0f04181960a0a896ebaf6d8afb0b71a6/fossil-fuel-co2-emissions-by-nation_csv.csv")
        .then(function (data) {
            let smallImpact = 0;
            data.forEach(row => {
                let isEUCountry = EU_COUNTRIES.some(eu => eu.toUpperCase() == row.Country);
                if (row.Year == "2014" && isEUCountry) {
                    row.Total = +row.Total;
                    row.Country = row.Country;
                    final_data.push(row.Country, row.Total);
                    final_data.sort();
                }
            })
            console.log(final_data);

            var arcs = g.selectAll("arc")
                .data(pie(final_data))
                .enter()
                .append("g")
                .attr("class", "arc");

            //Draw arc paths
            arcs.append("path")
                .attr("fill", function (d, i) {
                    return color(i);
                })
                .attr("d", arc)
                .append('arcs:title').text(function(d, i){console.log(final_data.slice(final_data.length / 2)[i]); return `Country: ${d.data.Country} \nEmissions: ${final_data.slice(0, final_data.length / 2)[i]}`});
        });

    });

    return (
        <div>
            <h1>PieChart</h1>
            <div id="piechart"></div>
            <svg></svg>
        </div>
    );
}
export default Piechart;