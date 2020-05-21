import React from 'react';
import Piechart from "./Piechart";
import PPMLineGraph from "./PPMLineGraph";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Map from "../Map";
import Simulation from '../classes/Simulation';
//import PPMData from '../classes/PPMData';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
//import MapData from "../classes/MapData";
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import BarChart from './BarChart';
import TextField from '@material-ui/core/TextField';


class AllGraphs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            populationIncrease: 0.0,
            deforestationIncrease: 0.0,
            electricityIncrease: 0.0,
            transportationIncrease: 0.0,
            buildingIncrease: 0.0,
            manufacturingIncrease: 0.0,
            industryIncrease: 0.0,
            agricultureIncrease: 0.0,
            currentData: null,

            moduleData: null,
            yearToStop: 2020,
            isFetching: true,
            warning: "",
            inputError: false,
            paused: false,
            isMapLoaded: false
        }
        this.startSimulation = this.startSimulation.bind(this);
    }

    set simulation(v) {
        this._simulation = v;
    }

    get simulation() {
        return this._simulation;
    }

    componentWillMount() {
        var self = this;
        this.simulation = new Simulation();

        this.simulation.loadCountries('/Csv/countries.csv')
            .then(function () {

                var initialData = self.simulation.getPPMOverall(self.state.yearToStop, self.state.populationIncrease, self.state.deforestationIncrease, self.state.electricityIncrease,
                    self.state.transportationIncrease, self.state.buildingIncrease, self.state.manufacturingIncrease, self.state.industryIncrease,
                    self.state.agricultureIncrease);

                self.updateModuleData(initialData)
            })

    }

    startSimulation() {
        var newData = this.simulation.getPPMOverall(this.state.yearToStop, this.state.populationIncrease, this.state.deforestationIncrease, this.state.electricityIncrease,
            this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease, this.state.industryIncrease,
            this.state.agricultureIncrease);

        this.updateModuleData(newData)
        document.getElementById("buttonStartSim").style.display = 'none';
        document.getElementById("buttonsWhenStarted").style.display = 'initial';
        

    }

    pauseSimulation() {

        this.setState({
            paused: true
        })
    }

    stopSimulation() {
        var newData = this.simulation.getPPMOverall(2020, this.state.populationIncrease, this.state.deforestationIncrease, this.state.electricityIncrease,
            this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease, this.state.industryIncrease,
            this.state.agricultureIncrease);

        this.updateModuleData(newData)
        document.getElementById("buttonStartSim").style.display = 'initial';
        document.getElementById("buttonsWhenStarted").style.display = 'none';
    }

    resumeSimulation() {
        var newData = this.simulation.resumeFromCurrentState(this.state.currentData, this.state.yearToStop, this.state.populationIncrease, this.state.deforestationIncrease, this.state.electricityIncrease,
            this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease, this.state.industryIncrease,
            this.state.agricultureIncrease)

        //this.updateModuleData(newData);

        this.setState({
            paused: false,
            moduleData: newData
        })
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
            deforestationIncrease: +evt.target.value
        })
    }
    updateElectricityInput(evt) {
        this.setState({
            electricityIncrease: +evt.target.value
        })
    }
    updateTransportationInput(evt) {
        this.setState({
            transportationIncrease: +evt.target.value
        })
    }
    updateBuildingInput(evt) {
        this.setState({
            buildingIncrease: +evt.target.value
        })
    }
    updateManufacturingInput(evt) {
        this.setState({
            manufacturingIncrease: +evt.target.value
        })
    }

    updateIndustryInput(evt) {
        this.setState({
            industryIncrease: +evt.target.value
        })
    }
    updateAgricultureInput(evt) {
        this.setState({
            agricultureIncrease: +evt.target.value
        })
    }

    updateCountryDataOnRunTime(data) {
        this.setState({
            currentData: data
        }, () => console.log(this.state.currentData))

    }


    //Update year input
    updateYearInput(evt) {
        if (+evt.target.value >= 2021) {
            this.setState({
                yearToStop: +evt.target.value,
                inputError: false
            }, () => { this.setState({ warning: "Current chosen year: " + this.state.yearToStop }) })
        } else {
            this.setState({
                warning: "Please provide an year after 2021.",
                inputError: true
            })
        }
    }

    updateModuleData(data) {
        this.setState({
            moduleData: data,
            isFetching: false
        })
    }

    updateSingleCountry(data) {

    }

    render() {
        return (
            <div className="App">
                {this.state.isFetching ? <h3 className="text-center justify-content-center align-self-center">Loading...<br /><Spinner animation="grow"></Spinner><Spinner animation="grow"></Spinner><Spinner animation="grow"></Spinner></h3> :

                    <>
                        <Row className="m-3 text-center">
                            <Col md="3" className="border border-primary rounded p-3">

                                <TextField className="m-2" placeholder={this.state.deforestationIncrease.toString()} label="Deforestation %" variant="outlined" onChange={evt =>
                                    this.updateDeforestationInput(evt)} fullWidth />

                                <TextField className="m-2" placeholder={this.state.electricityIncrease.toString()} label="Electricity increase %" variant="outlined" onChange={evt =>
                                    this.updateElectricityInput(evt)} fullWidth />

                                <TextField className="m-2" placeholder={this.state.transportationIncrease.toString()} label="Transportation increase %" variant="outlined" onChange={evt =>
                                    this.updateTransportationInput(evt)} fullWidth />

                                <TextField className="m-2" placeholder={this.state.buildingIncrease.toString()} label="Building increase %" variant="outlined" onChange={evt =>
                                    this.updateBuildingInput(evt)} fullWidth />

                                <TextField className="m-2" placeholder={this.state.manufacturingIncrease.toString()} label="Manufacturing increase %" variant="outlined" onChange={evt =>
                                    this.updateManufacturingInput(evt)} fullWidth />

                                <TextField className="m-2" placeholder={this.state.industryIncrease.toString()} label="Industry increase %" variant="outlined" onChange={evt =>
                                    this.updateIndustryInput(evt)} fullWidth />

                                <TextField className="m-2" placeholder={this.state.agricultureIncrease.toString()} label="Agriculture increase %" variant="outlined" onChange={evt =>
                                    this.updateAgricultureInput(evt)} fullWidth />

                                <TextField className="m-2 mb-3" placeholder={this.state.yearToStop.toString()} label="Year to stop simulation" variant="outlined" onChange={evt =>
                                    this.updateYearInput(evt)} fullWidth helperText={this.state.warning} error={this.state.inputError} />

                                <Button variant="primary" id="buttonStartSim"
                                    onClick={this.startSimulation}>Make a simulation</Button>

                                <div id="buttonsWhenStarted" style={{ display: 'none' }}>
                                    <Button variant="secondary" id="buttonPauseSim" className='m-2' disabled={this.state.paused}
                                        onClick={this.pauseSimulation.bind(this)} >Pause</Button>

                                    <Button variant="primary" id="buttonResumeSim" className='m-2' disabled={!this.state.paused}
                                        onClick={this.resumeSimulation.bind(this)}>Resume</Button>

                                    <Button variant="danger" id="buttonStopSim" className='m-2'
                                        onClick={this.stopSimulation.bind(this)}>Stop</Button>
                                </div>



                            </Col>
                            <Col md="9"><Map data={this.state.moduleData} /></Col>
                        </Row>

                        <Alert variant='primary' className='m-3'>
                            <Alert.Heading className='m-2'>Charts</Alert.Heading>
                            <Row className="m-1 justify-content-center">
                                <Col md="12" className="mt-3">
                                    <BarChart data={this.state.moduleData} paused={this.state.paused} updateCountryDataOnRunTime={this.updateCountryDataOnRunTime.bind(this)} />
                                </Col>

                            </Row>
                            <Row className="m-1 justify-content-center">
                                <Col md="6" className="text-center mt-3">

                                </Col>
                                <Col md="6" className="text-center mt-3">
                                    <PPMLineGraph data={this.state.moduleData} />
                                </Col>
                            </Row>

                        </Alert>

                    </>


                }


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