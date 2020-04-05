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
                title: `${this.props.data[0]}`,
                backgroundColor: '#fff0ff',
                pieHole: 0.4,
                //sliceVisibilityThreshold: 0.02,
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


    render() {
        return (
            <div>
                <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="PieChart"
                    loader={<h4>Loading graph<Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></h4>}
                    data={this.props.data}
                    options={this.options()}
                    rootProps={{ 'data-testid': '3' }} />
            </div>
        );
    }
}
export default Piechart;