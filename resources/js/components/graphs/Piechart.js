import React from 'react';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import * as d3 from "d3";

function Piechart() {
    document.addEventListener('DOMContentLoaded', function (e) {
        const countryData = [
            { name: 'Germany', carEmissions: 50, population: 1000, ppmPerCapita: 12, allPolution: 1000, color: 'yellow' },
            { name: 'France', carEmissions: 40, population: 800, ppmPerCapita: 12, allPolution: 1500, color: 'blue' },
            { name: 'Italy', carEmissions: 30, population: 650, ppmPerCapita: 12, allPolution: 120, color: 'cyan' },
            { name: 'Netherlands', carEmissions: 20, population: 35, ppmPerCapita: 12, allPolution: 30, color: 'orange' },
            { name: 'UK', carEmissions: 60, population: 900, ppmPerCapita: 12, allPolution: 140, color: 'red' },
            { name: 'Spain', carEmissions: 40, population: 600, ppmPerCapita: 12, allPolution: 100, color: 'gray' }
        ]

        var width = 250,
            height = 250,
            svg = d3.select("svg").attr('width', width).attr('height', height).attr('r', radius),
            radius = Math.min(width, height) / 2,
            g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c', '#a99a1c']);

        // Generate the pie
        var pie = d3.pie();

        // Generate the arcs
        var arc = d3.arc()
            .innerRadius(radius / 2)
            .outerRadius(radius);

        var othersTotal;
        function Check(){
            countryData.forEach(country => {
                if(country.allPolution < 1000){
                    othersTotal += country.allPolution;
                }
            });
        }
        Check();
    
        //Generate groups
        var arcs = g.selectAll("arc")
            .data(pie(countryData.map(d => d.allPolution)))
            .enter()
            .append("g")
            .attr("class", "arc");

        //Draw arc paths
        arcs.append("path")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", arc)
            .append('arcs:title').text();

            
    });

    return (
        <div>
            <h1>PieChart</h1>
            <div id="piechart"></div>
            <svg> </svg>
        </div>
    );

}

export default Piechart;