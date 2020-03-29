import React from 'react';
import * as d3 from "d3";

// class PPMLineGraph extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {

//         }

//     }

//     render() {
//         return(
//             <div>

//             </div>
//         );
//     }
// }


function PPMLineGraph() {

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

        var final_data = [];
        var margin = { top: 20, right: 20, bottom: 30, left: 100 },
            width = 600 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        d3.csv("https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_csv/data/0f04181960a0a896ebaf6d8afb0b71a6/fossil-fuel-co2-emissions-by-nation_csv.csv")
            .then(function (data) {

                //Filter rows only for UK
                data.forEach(row => {
                    let isEUCountry = EU_COUNTRIES.some(eu => eu.toUpperCase() == row.Country);
                    if (row.Year >= "1980" && row.Country == "UNITED KINGDOM") {
                        row.Total = +row.Total;
                        row.Country = row.Country;
                        final_data.push([row.Total, row.Country, row.Year]);
                    }

                });

                //Sort data on year (starting from the smallest)
                final_data.sort(function (a, b) { return a[2] - b[2] });
                console.log(final_data);

                let PPMs = final_data.map(function (value, i) { return +value[0] });
                let Years = final_data.map(function (value, i) { return +value[2] });

                var svg = d3.select("#line_graph").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom)
                    .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                let smallestYear = Math.min(...Years);
                let lastYear = Math.max(...Years);

                var xAxis = d3.scaleLinear()
                    .domain([smallestYear, lastYear]) //Number range on the X axis
                    .range([margin.left, width - margin.right]);

                let highestPPM = Math.max(...PPMs);

                var yAxis = d3.scaleLinear()
                    .domain([0, highestPPM + 20000])
                    .range([height - margin.bottom, margin.top]);

                //drawing the X axis
                svg.append("g").attr("transform", "translate(" + -margin.left + "," + (height - margin.bottom) + ")").call(d3.axisBottom(xAxis).tickFormat(d3.format(1000))).style("font-size", "20px");

                //draw the Y axis
                svg.append("g").call(d3.axisLeft(yAxis).tickFormat(d3.format(1000))).style("font-size", "18px");
                
                              
                //Add X label
                svg.append("text")
                    .attr("text-anchor", "end")
                    .attr("x", 0 + 15)
                    .attr("y", height + 10)
                    .text("Year")
                    .style("font-size", "20px");

                //Add Y label
                svg.append("text")
                    .attr("text-anchor", "end")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -margin.left + 30)
                    .attr("x", -height + margin.top + margin.bottom + 60)
                    .text("PPM value")
                    .style("font-size", "20px");

                //draw a line
                console.log(PPMs);
                svg.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    .attr("transform", "translate(" + -margin.left + "," + 0 + ")") //remove margin from left
                    .attr("d", d3.line().x(function(d, i){if(Years[i] != undefined){return xAxis(Years[i])}}).y(function(d, i){if(PPMs[i] != undefined){return yAxis(PPMs[i])}}))

            });




    });

    return (
        <div>
            <h3>Line graph</h3>
            <div id="line_graph"></div>
        </div>
    )
}


export default PPMLineGraph;