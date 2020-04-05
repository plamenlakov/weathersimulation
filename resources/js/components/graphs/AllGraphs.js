import React from 'react';
import Piechart from "./Piechart";
import PPMLineGraph from "./PPMLineGraph";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Map from "../Map";
import Simulation from '../classes/Simulation';
import PPMData from '../classes/PPMData';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import MapData from "../classes/MapData";


class AllGraphs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            populationIncrease: 0.0,
            deforestation: 0.0,
            ppmData: [["Year", "PPM"], [2020, 0], [2021, 0], [2022, 0], [2023, 0], [2023, 0], [2024, 0], [2025, 0]],
            mapData: [],
            isFetching : true
        }
        this.startSimulation = this.startSimulation.bind(this);
    }

    componentWillMount() {
        var sim = new Simulation();
        var self = this;
        sim.loadCountries('http://localhost:8000/Csv/countries.csv')
            .then(function () {
                self.updateMapData(sim.countries);
            });
    }

    startSimulation() {
        var sim = new Simulation();
        var self = this;
        sim.loadCountries('http://localhost:8000/Csv/countries.csv')
            .then(function () {
                self.ppmcalculation = new PPMData(sim.countries);
                self.mapcalculation = new MapData(sim.countries);
                var dataPPM = self.ppmcalculation.evaluatePPM(2050, self.state.populationIncrease, self.state.deforestation);
                var dataMap = self.mapcalculation.changedCountries(2021, self.state.populationIncrease, self.state.deforestation);
                self.updatePpmData(dataPPM);
                self.updateMapData(dataMap);
            });
    }

    //Update populationIncrease input
    updatePopulationInput(evt) {
        this.setState({
            populationIncrease: Number(evt.target.value)
        })
    }

    //Update deforestation input
    updateDeforestationInput(evt) {
        this.setState({
            deforestation: Number(evt.target.value)
        })
    }

    //Update PpmData state
    updatePpmData(data) {
        this.setState({
            ppmData: data
        })
    }

    //update map data state
    updateMapData(data) {
        this.setState({
            mapData: data,
            isFetching : false
        })
    }

    //Entry point for launching the simulation

    render() {
        return (<div className="App">
                <Row className="m-1">
                    <Col md="12" className="border border-dark p-3">
                        <div>
                            <InputGroup className="mb-3" value={this.state.deforestation} onChange={evt =>
                                this.updateDeforestationInput(evt)}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="deforestationInput">Deforestation %</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                /></InputGroup>
                            <InputGroup className="mb-3" value={this.state.populationIncrease} onChange={evt =>
                                this.updatePopulationInput(evt)}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="populationInput">Population growth %</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                /></InputGroup>
                            <Button variant="primary" id="buttonStartSim"
                                    onClick={this.startSimulation}>Simulation</Button>
                        </div>
                    </Col>
                </Row>
                {this.state.isFetching ? <h3>Loading</h3> : <Map data={this.state.mapData}/>}
                <Alert variant='secondary' className='m-3'>
                    <Alert.Heading className='m-2'>Charts</Alert.Heading>
                    <Row className="m-1 justify-content-center">
                        <Col md="6" className="text-center mt-3">
                            <Piechart/>
                        </Col>
                        <Col md="6" className="text-center mt-3">
                            <PPMLineGraph data={this.state.ppmData}/>
                        </Col>
                    </Row>
                </Alert>
            </div>
        )
    }
}

// function AllGraphs() {
//     return (
//         <div>
//
//
//
//
//         </div>
//     );
// }

export default AllGraphs;