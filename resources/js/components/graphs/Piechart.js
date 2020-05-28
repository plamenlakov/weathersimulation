/* eslint-disable no-undef */
import React from 'react';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { csv } from "d3";
import { Chart } from "react-google-charts";
import Spinner from 'react-bootstrap/Spinner';
import Electricity from '../classes/ConcreteSectors/Electricity';
import Building from '../classes/ConcreteSectors/Building';
import Transportation from '../classes/ConcreteSectors/Transportation';
import Agriculture from '../classes/ConcreteSectors/Agriculture';
import Manufacturing from '../classes/ConcreteSectors/Manufacturing';
import Industry from '../classes/ConcreteSectors/Industry';

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
        pieData.push(["Electricity", this.props.country.sectors.find(el => el instanceof Electricity).value])
        pieData.push(["Transportation", this.props.country.sectors.find(tr => tr instanceof Transportation).value])
        pieData.push(["Industry", this.props.country.sectors.find(ind => ind instanceof Industry).value]);
        pieData.push(["Agriculture", this.props.country.sectors.find(ag => ag instanceof Agriculture).value]);
        pieData.push(["Manufacturing", this.props.country.sectors.find(man => man instanceof Manufacturing).value]);
        pieData.push(["Building", this.props.country.sectors.find(bl => bl instanceof Building).value]);
        
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