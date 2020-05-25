import React from 'react';
import PPMLineGraph from "./PPMLineGraph";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Map from "../Map";
import Simulation from '../classes/Simulation';
import BarChart from './BarChart';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faStop, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import Badge from '@material-ui/core/Badge';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import AlertM from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Chip from '@material-ui/core/Chip';
import Form from 'react-bootstrap/Form';


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
            stateIcon: null,
            currentState: null,
            currentWaterLevels: null,

            moduleData: null,
            yearToStop: 2020,
            warning: "",

            isFetching: true,
            inputError: false,
            paused: true,
            isRunning: false,
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
        var newData = this.state.currentData == null ? this.simulation.getPPMOverall(this.state.yearToStop, this.state.populationIncrease, this.state.deforestationIncrease, this.state.electricityIncrease,
            this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease, this.state.industryIncrease,
            this.state.agricultureIncrease) : this.simulation.resumeFromCurrentState(this.state.currentData, this.state.yearToStop, this.state.populationIncrease, this.state.deforestationIncrease, this.state.electricityIncrease,
                this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease, this.state.industryIncrease,
                this.state.agricultureIncrease);

        this.unpauseSimulation();
        this.changeRunningState(true)
        this.updateModuleData(newData)
        document.getElementById("buttonStartSim").style.display = 'none';
        document.getElementById("buttonsWhenStarted").style.display = 'initial';


    }

    changeRunningState(state) {
        this.setState({
            isRunning: state
        })
    }

    pauseSimulation() {

        this.setState({
            paused: true,
            isRunning: false
        })
    }

    unpauseSimulation() {
        this.setState({
            paused: false,
            isRunning: true
        })
    }

    stopSimulation() {
        var newData = this.simulation.getPPMOverall(2020, this.state.populationIncrease, this.state.deforestationIncrease, this.state.electricityIncrease,
            this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease, this.state.industryIncrease,
            this.state.agricultureIncrease);

        if (this.state.paused) {
            this.unpauseSimulation();
        }

        this.setState({
            currentData: null,
        })
        this.changeRunningState(false);
        this.updateModuleData(newData)
        document.getElementById("buttonStartSim").style.display = 'initial';
        document.getElementById("buttonsWhenStarted").style.display = 'none';
    }

    resumeSimulation() {
        var newData = this.simulation.resumeFromCurrentState(this.state.currentData, this.state.yearToStop, this.state.populationIncrease, this.state.deforestationIncrease, this.state.electricityIncrease,
            this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease, this.state.industryIncrease,
            this.state.agricultureIncrease)

        this.changeRunningState(true);
        this.unpauseSimulation();
        this.updateModuleData(newData);

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
            currentData: data,
            currentState: 'Paused'
        })


    }

    togglePandemic() {
        this.simulation.hasPandemic = !this.simulation.hasPandemic;
    }

    updateState(state) {
        if (state == 'Finished') {
            this.setState({
                stateIcon: <FontAwesomeIcon icon={faRedoAlt} />,
                paused: true
            })
            this.changeRunningState(false)
        } else {
            this.setState({
                stateIcon: <FontAwesomeIcon icon={faStop} />
            })
        }
        this.setState({
            currentState: state
        })


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
            isFetching: false,
            currentWaterLevels: this.simulation.getWaterLevels(this.simulation.temperatureIncrease)
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.isFetching ? <div className="text-center justify-content-center align-self-center"><h3 >Loading data...<br /><br /></h3> <Spinner animation="border" variant="primary" /></div> :

                    <div>
                        <Row className="m-2 text-center">
                            <Col md="3" className="border border-primary rounded p-3 mt-3">

                                <TextField className="mb-4" disabled={this.state.isRunning} placeholder={this.state.deforestationIncrease.toString()} label="Deforestation %" variant="outlined" onChange={evt =>
                                    this.updateDeforestationInput(evt)} fullWidth />

                                <TextField className="mb-4" disabled={this.state.isRunning} placeholder={this.state.electricityIncrease.toString()} label="Electricity increase %" variant="outlined" onChange={evt =>
                                    this.updateElectricityInput(evt)} fullWidth />

                                <TextField className="mb-4" disabled={this.state.isRunning} placeholder={this.state.transportationIncrease.toString()} label="Transportation increase %" variant="outlined" onChange={evt =>
                                    this.updateTransportationInput(evt)} fullWidth />

                                <TextField className="mb-4" disabled={this.state.isRunning} placeholder={this.state.buildingIncrease.toString()} label="Building increase %" variant="outlined" onChange={evt =>
                                    this.updateBuildingInput(evt)} fullWidth />

                                <TextField className="mb-4" disabled={this.state.isRunning} placeholder={this.state.manufacturingIncrease.toString()} label="Manufacturing increase %" variant="outlined" onChange={evt =>
                                    this.updateManufacturingInput(evt)} fullWidth />

                                <TextField className="mb-4" disabled={this.state.isRunning} placeholder={this.state.industryIncrease.toString()} label="Industry increase %" variant="outlined" onChange={evt =>
                                    this.updateIndustryInput(evt)} fullWidth />

                                <TextField className="mb-4" disabled={this.state.isRunning} placeholder={this.state.agricultureIncrease.toString()} label="Agriculture increase %" variant="outlined" onChange={evt =>
                                    this.updateAgricultureInput(evt)} fullWidth />

                                <TextField className="mb-5" disabled={this.state.isRunning} placeholder={this.state.yearToStop.toString()} label="Year to stop simulation" variant="outlined" onChange={evt =>
                                    this.updateYearInput(evt)} fullWidth helperText={this.state.warning} error={this.state.inputError} />

                                <Button variant="success" id="buttonStartSim"
                                    onClick={this.startSimulation}>Create new simulation</Button>

                                <div id="buttonsWhenStarted" style={{ display: 'none' }}>

                                    <Button variant="primary" id="buttonPauseSim" className='m-2' disabled={this.state.paused}
                                        onClick={this.pauseSimulation.bind(this)} ><FontAwesomeIcon icon={faPause} /></Button>

                                    <Button variant="primary" id="buttonResumeSim" className='m-2' disabled={!this.state.paused}
                                        onClick={this.resumeSimulation.bind(this)}><FontAwesomeIcon icon={faPlay} /></Button>

                                    <Button variant="danger" id="buttonStopSim" className='m-2'
                                        onClick={this.stopSimulation.bind(this)}>{this.state.stateIcon}</Button>
                                    <Row>
                                        <Col md='4'>

                                        </Col>
                                        <Col md='4'>
                                            <Chip label={this.state.currentState} />
                                        </Col>
                                        <Col md='4'>

                                        </Col>
                                    </Row>


                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        open={this.state.isRunning}
                                        autoHideDuration={6000}>
                                        <AlertM severity="warning">
                                            The simulation must be paused to change values!
                                        </AlertM>
                                    </Snackbar>


                                </div>
                                <div className="mt-4">
                                    <Form.Check
                                        disabled={this.state.isRunning}
                                        type="switch"
                                        id="pandemic_switch"
                                        label="🦠 Start Pandemic"
                                        onChange={evt => this.togglePandemic(evt)}
                                    />
                                </div>
                                <div className='m-2' style={{ display: this.simulation.hasPandemic && this.state.isRunning ? 'initial' : 'none' }}>
                                    <AlertM severity="info" variant='outlined' >
                                        A pandemic is taking effect!
                                    </AlertM>
                                </div>

                            </Col>
                            <Col md="9" className='p-3'><Map data={this.state.moduleData} isRunning={this.state.isRunning} paused={this.state.paused} currentWaterLevels={this.state.currentWaterLevels} currentYearData={this.state.currentData} updateCurrentData={this.updateCountryDataOnRunTime.bind(this)} /></Col>
                        </Row>

                        <Alert variant='primary' className='m-3'>
                            <Alert.Heading className='m-2'>Charts</Alert.Heading>
                            <Row className="m-1 justify-content-center">
                                <Col md="12" className="mt-3">
                                    <BarChart data={this.state.moduleData} updateState={this.updateState.bind(this)} paused={this.state.paused} updateCountryDataOnRunTime={this.updateCountryDataOnRunTime.bind(this)} />
                                </Col>

                            </Row>
                            <Row className="m-1 justify-content-center">
                                <Col md="6" className="text-center mt-3">

                                </Col>
                                <Col md="6" className="text-center mt-3">
                                    <PPMLineGraph data={this.state.moduleData} paused={this.state.paused} />
                                </Col>
                            </Row>

                        </Alert>

                    </div>


                }


            </div>
        )
    }
}

export default AllGraphs;