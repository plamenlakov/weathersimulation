/* eslint-disable no-undef */

import React from 'react';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { csv } from "d3";
import { Chart } from "react-google-charts";
import Spinner from 'react-bootstrap/Spinner';

class Piechart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    options() {
        return (
            {
                title: `CO₂ in tons per sector`,
                backgroundColor: '#fff0ff',
                pieSliceText: 'label',
                legend: { position: 'bottom' },
                animation: {
                    duration: 1200,
                    easing: 'ease',
                    startup: true
                }
            }
        )
    }

    formatedData(){
        var pieData = [];

        pieData.push(["SectorName", "Sector"]);
        pieData.push(["Electricity", this.props.country.electricity])
        pieData.push(["Transportation", this.props.country.transportation])
        pieData.push(["Industry", this.props.country.industry]);
        pieData.push(["Agriculture", this.props.country.agriculture]);
        pieData.push(["Manufacturing", this.props.country.manufacturing]);
        pieData.push(["Building", this.props.country.building_value]);
        
        return pieData;
    }



    render() {
        return (
            <div>
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="PieChart"    
                    loader={<h4>Loading graph<Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></h4>}
                    data={this.formatedData()}
                    options={this.options()}
                    rootProps={{ 'data-testid': '3' }} />
            </div>
        );
    }
}
export default Piechart;