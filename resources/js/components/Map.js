import React from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';


class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {


        const width = 1280,
            height = 900,
            projection = d3.geoMercator()
                .center([13, 52]) //longitude, latitude
                .translate([width / 2, height / 2]) // center the image
                .scale([width / 1.5]);
        const path = d3.geoPath().projection(projection);
        //const populationCsv = "http://localhost:8000/population2020.csv";
        const dataCsv = "http://localhost:8000/data.csv";

        const svg = d3.select("#Map").append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr("viewBox", "0 0 " + width + " " + height)
            .attr("preserveAspectRatio", "xMinYMin");

        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on('zoom', zoomed);

        const g = svg.append('svg');

        svg.call(zoom);
        function zoomed() {
            svg
                .selectAll('path') // To prevent stroke width from scaling
                .attr('transform', d3.event.transform);
        }

        d3.json('http://localhost:8000/custom.geo.json')
            .then(topology => {
                console.log(topology);
                svg.selectAll(".country")
                    .data(topojson.feature(topology, topology.objects.custom).features)
                    .enter()
                    .append("path")
                    .attr("class", ".country")
                    .attr("d", path)
                    .attr("fill", "#cccccc")
                    .attr("stroke", "#333333")
                    .attr("stroke-width", "0.5")
                    .on("mouseover", function (d) {
                        d3.select(this).attr("fill", "darkgrey");
                    })
                    .on("click", function (d) {
                        d3.csv(dataCsv, function (dataCsv) {
                            document.getElementById("countryName").innerHTML = `<b>${d.properties.name_long}</b>`;
                            if (dataCsv.country == d.properties.name_long)
                                document.getElementById("population").innerHTML = `<h5>Population: ${dataCsv.population}</h5>`;
                            if (dataCsv.country == d.properties.name_long)
                                document.getElementById("forest").innerHTML = `<h5>Forest: ${dataCsv.forest} %</h5>`;
                            document.getElementById("modalButton").click();
                        })
                    })
                    .on("mouseout", function (d) {
                        d3.select(this).attr("fill", "#cccccc")
                    })
            })

    }


    render() {
        const mystyle = {
            width: 500,
            height: 300,
            backgroundColor: 'white',
            borderRadius: 4,
            textAlign: 'center',
            padding: 20

        }
        return (
            <div>
                <div id="Map"></div>
            </div>
        );
    }
}

export default Map;