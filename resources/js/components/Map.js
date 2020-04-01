import React from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import Alert from 'react-bootstrap/Alert';
// import '\\.\\.\\.\\app.css';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {


            const width = 1180,
                height = 900,
                projection = d3.geoMercator()
                    .center([13, 52]) //longitude, latitude
                    .translate([width / 2, height / 2]) // center the image
                    .scale([width / 1.5]);
            const path = d3.geoPath().projection(projection);
            const populationCsv = "http://localhost:8000/population2020.csv";
            const forestCsv = "http://localhost:8000/forestation.csv";


            const svg = d3.select("#Map").append("svg")
                .attr("width", width)
                .attr("height", height);

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
                            d3.select(this).attr("fill", "darkgrey")
                            d3.csv(populationCsv, function (populationData) {
                                if (populationData.GEO == d.properties.name_long)
                                    console.log("Country: " + populationData.GEO + "\nPopulation: " + populationData.Value);
                            })
                            d3.csv(forestCsv, function (forestData) {
                                if (forestData.Country == d.properties.name_long)
                                    console.log("Forest % " + forestData.Value);
                            });
                        })
                        .on("click", function (d) {
                            document.getElementById("countryName").innerHTML = `<b>${d.properties.name_long}</b>`;
                            document.getElementById("modal-body").innerHTML = `<h5 class="alert alert-danger">proba</h5>`
                            document.getElementById("modalButton").click();
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