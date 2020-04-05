import React from 'react';
import {Chart} from "react-google-charts";
import Spinner from 'react-bootstrap/Spinner';

class PPMLineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    options() {
        return (
            {
                legend: {position: 'bottom'},
                backgroundColor: '#fff0ff',
                title: 'PPM emission per year',

                hAxis: {
                    title: 'Year',
                    format: '####'
                },
                vAxis: {
                    title: 'CO2 emissions in cubic tonnes',
                    format: 'short'
                },
            }
        )
    }

    render() {
        return (
            <div>
                <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="AreaChart"
                    loader={<h3 className="text-center justify-content-center align-self-center">Loading graph<Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></h3>}
                    data={this.props.data}
                    options={this.options()}
                    rootProps={{'data-testid': '4'}}
                />
            </div>
        )
    }
}


export default PPMLineGraph;