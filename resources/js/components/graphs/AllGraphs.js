import React from 'react';
import Piechart from "./Piechart";
import PPMLineGraph from "./PPMLineGraph";

function AllGraphs() {
    return(
        <div>
            <PPMLineGraph/>
            <Piechart/>
        </div>
    );
}

export default AllGraphs;