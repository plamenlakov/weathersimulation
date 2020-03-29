import React from 'react';
import * as d3 from 'd3';

class Map extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        const width = 960,
            height = 1160,
            projection = d3.geoMercator(),
            path = d3.geoPath().projection(projection);

        const svg = d3.select("div#root").append("svg")
            .attr("width", width)
            .attr("height", height);

        const countries = d3.json('http://localhost:8080/custom.geo.json')
            .then(data => {
                console.log(data);
                svg.selectAll("path")
                        .data(data.features)
                        .enter()
                        .append("path")
                        .attr("d", path);
            })



    }
    render() {

        return(
            <div>

            </div>
        );
    }
}

export default Map;