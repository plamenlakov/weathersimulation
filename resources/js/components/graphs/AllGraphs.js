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
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

class AllGraphs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            populationIncrease: 0.0,
            deforestation: 0.0,
            yearToStop: 2021,
            ppmData: [["Year", "PPM"], [2020, 0], [2021, 0], [2022, 0], [2023, 0], [2023, 0], [2024, 0], [2025, 0]],
            mapData: [],
            ppmPieData: [["Country", "PPM"], ["Start a simulation to see results", 100]],
            isFetching: true,
            warning: ""
        }
        this.startSimulation = this.startSimulation.bind(this);
    }

    componentWillMount() {
        var sim = new Simulation();
        var self = this;
       
        sim.loadCountries('http://localhost:8000/Csv/countries.csv')
            .then(function () {
                //assign initial values
                self.updateMapData(sim.countries);
            });
    }

    startSimulationMap(){
        var sim = new Simulation();
        var self = this;

        sim.loadCountries('http://localhost:8000/Csv/countries.csv')
            .then(function () {

                var mapcalculation = new MapData(sim.countries);

                var dataMap = mapcalculation.changedCountries(self.state.yearToStop, self.state.populationIncrease, self.state.deforestation);

                self.updateMapData(dataMap);
            });
    }

    startSimulationPieChart() {
        var sim = new Simulation();
        var self = this;

        sim.loadCountries('http://localhost:8000/Csv/countries.csv')
            .then(function () {

                var ppmPieCalculation = new PPMData(sim.countries);

                var dataPPMPie = ppmPieCalculation.evaluatePPMPie(self.state.yearToStop, self.state.populationIncrease, self.state.deforestation);

                self.updatePpmPieData(dataPPMPie);
            });
    }

    startSimulationLineGraph() {
        var sim = new Simulation();
        var self = this;

        sim.loadCountries('http://localhost:8000/Csv/countries.csv')
            .then(function () {

                var ppmcalculation = new PPMData(sim.countries);

                var dataPPM = ppmcalculation.evaluatePPM(self.state.yearToStop, self.state.populationIncrease, self.state.deforestation);

                self.updatePpmData(dataPPM);
            });
    }

    startSimulation(){
        this.startSimulationLineGraph();
        this.startSimulationMap();
        this.startSimulationPieChart();
    }

    //Update populationIncrease input
    updatePopulationInput(evt) {
        this.setState({
            populationIncrease: +evt.target.value

        })

    }

    //Update deforestation input
    updateDeforestationInput(evt) {
        this.setState({
            deforestation: +evt.target.value
        })
    }

    //Update year input
    updateYearInput(evt) {
        if(+evt.target.value >= 2021){
            this.setState({
                yearToStop: +evt.target.value,
                warning: ""
            })
        }else{
            this.setState({
                warning: "Please provide an year after 2021."
            })
        }
    }

    //Update PpmData state
    updatePpmData(data) {
        this.setState({
            ppmData: data
        })
    }
    //update Piechart data
    updatePpmPieData(data, lastYear) {
        this.setState({
            ppmPieData: data,
        })
    }

    //update map data state
    updateMapData(data) {
        this.setState({
            mapData: data,
            isFetching: false
        })
    }

    //Entry point for launching the simulation

    render() {
        return (<div className="App">
            <Row className="m-3 text-center">
                <Col md="3" className="border border-primary rounded p-3 mt-3">
                    <InputGroup className="mb-3" value={this.state.deforestation} onChange={evt =>
                        this.updateDeforestationInput(evt)}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="deforestationInput">Deforestation %</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder={this.state.deforestation} 
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        /></InputGroup>
                    <InputGroup className="mb-3" value={this.state.populationIncrease} onChange={evt =>
                        this.updatePopulationInput(evt)}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="populationInput">Population growth %</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder={this.state.populationIncrease}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        /></InputGroup>
                        <InputGroup className="mb-3" value={this.state.yearToStop} onChange={evt =>
                        this.updateYearInput(evt)}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="YearInput">Year to stop simulation:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder={this.state.yearToStop}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        /><Form.Label>{this.state.warning}</Form.Label>
                        </InputGroup>
                    <Button variant="primary" id="buttonStartSim"
                        onClick={this.startSimulation}>Make a simulation</Button>

                </Col>
                <Col md="9" className="mt-3">{this.state.isFetching ? <h3 className="text-center justify-content-center align-self-center">Loading map<br/><Spinner animation="grow"></Spinner><Spinner animation="grow"></Spinner><Spinner animation="grow"></Spinner></h3> : <Map data={this.state.mapData} />}</Col>
            </Row>
            
            <Alert variant='primary' className='m-3'>
                <Alert.Heading className='m-2'>Charts</Alert.Heading>
                <Row className="m-1 justify-content-center">
                    <Col md="6" className="text-center mt-3">
                        <Piechart data={this.state.ppmPieData}/>
                    </Col>
                    <Col md="6" className="text-center mt-3">
                        <PPMLineGraph data={this.state.ppmData} />
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