import React from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import Simulation from "./classes/Simulation";


class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        var self = this;
        console.log(this.props.data)
        const width = 1280,
            height = 900,
            projection = d3.geoMercator()
                .center([13, 52]) //longitude, latitude
                .translate([width / 2, height / 2]) // center the image
                .scale([width / 1.5]);
        const path = d3.geoPath().projection(projection);
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
        
        d3.json('http://localhost:8000/Europe.geo.json')
            .then(topology => {
                //onsole.log(topology);
                svg.selectAll(".country")
                    .data(topology.features)
                    .enter()
                    .append("path")
                    .attr("class", ".country")
                    .attr("d", path)
                    .attr("fill", "#cccccc")
                    .attr("stroke", "#333333")
                    .attr("stroke-width", "0.5")
                    .on("mouseover", function (d) {
                        var countryNames = self.props.data.map(d => d['name']);
                        var hoveredCountryName = countryNames.find(c => c == d.properties.name);
                        for (let i = 0; i < self.props.data.length; i++) {
                            if (self.props.data[i].name == hoveredCountryName) {
                                d3.select(this)
                                .attr("fill", "darkgrey")
                                .style("cursor", "pointer");
                            }
                           
                        }
                    })
                    .on("click", function (d) {
                        document.getElementById("countryName").innerHTML = `<b>${d.properties.name}</b>`;
                        var countryNames = self.props.data.map(d => d['name']);
                        var clickedCountryName = countryNames.find(c => c == d.properties.name);
                        var countryPopulation = NaN;
                        var countryForest = NaN;
                        var countryArea = NaN;
                        var countryPPM = NaN;
                        for (let i = 0; i < self.props.data.length; i++) {
                            if (self.props.data[i].name == clickedCountryName) {
                                countryPopulation = self.props.data[i].population;
                                countryForest = self.props.data[i].forests;
                                countryArea = self.props.data[i].area;
                                countryPPM = self.props.data[i].ppm;
                            }
                        }
                        if (clickedCountryName == null) {
                            document.getElementById("modal-body").innerHTML = `Not used!`;
                            document.getElementById("modalButton").click();
                        } else {
                            document.getElementById("modal-body").innerHTML = `<h5>Population: ${countryPopulation}</h5>
                                                                                    <h5>Forest: ${countryForest} %</h5>
                                                                                    <h5>Area: ${countryArea}km2</h5>
                                                                                    <h5>PPM: ${countryPPM}</h5>`;
                            document.getElementById("modalButton").click();
                        }

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
                <div id="Map"  className="border border-primary rounded img-thumbnail" style={{backgroundColor: "#7fcdff"}}></div>
            </div>
        );
    }
}

export default Map;