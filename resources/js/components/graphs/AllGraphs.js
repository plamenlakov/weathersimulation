import React from 'react';
import PPMLineGraph from "./PPMLineGraph";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Map from "../Map";
import Simulation from '../classes/Simulation';
import BarChart from './BarChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import Inputs from './Inputs';


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
        //this.startSimulation = this.startSimulation.bind(this);
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
        this.setState({
            currentData: null,
        }, () => {
            var newData = this.simulation.getPPMOverall(2020, this.state.populationIncrease, this.state.deforestationIncrease, this.state.electricityIncrease,
                this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease, this.state.industryIncrease,
                this.state.agricultureIncrease);
    
            if (this.state.paused) {
                this.unpauseSimulation();
            }
    
            
            this.changeRunningState(false);
            this.updateModuleData(newData)
            document.getElementById("buttonStartSim").style.display = 'initial';
            document.getElementById("buttonsWhenStarted").style.display = 'none';
        })
        
    }

    resumeSimulation() {
        var newData = this.simulation.resumeFromCurrentState(this.state.currentData, this.state.yearToStop, this.state.populationIncrease, this.state.deforestationIncrease, this.state.electricityIncrease,
            this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease, this.state.industryIncrease,
            this.state.agricultureIncrease)

        this.changeRunningState(true);
        this.unpauseSimulation();
        this.updateModuleData(newData);

    }

    changeInputValuesAndStart(yearToStop, inputDeforestation, inputElectricity, inputTransportation, inputAgriculture, inputIndustry, inputBuilding, inputManufacturing) {
        this.setState({
            yearToStop: yearToStop,
            deforestationIncrease: inputDeforestation,
            electricityIncrease: inputElectricity,
            transportationIncrease: inputTransportation,
            agricultureIncrease: inputAgriculture,
            industryIncrease: inputIndustry,
            buildingIncrease: inputBuilding,
            manufacturingIncrease: inputManufacturing
        }, () => this.startSimulation())
    }

    changeInputValuesAndResume(yearToStop, inputDeforestation, inputElectricity, inputTransportation, inputAgriculture, inputIndustry, inputBuilding, inputManufacturing) {
        this.setState({
            yearToStop: yearToStop,
            deforestationIncrease: inputDeforestation,
            electricityIncrease: inputElectricity,
            transportationIncrease: inputTransportation,
            agricultureIncrease: inputAgriculture,
            industryIncrease: inputIndustry,
            buildingIncrease: inputBuilding,
            manufacturingIncrease: inputManufacturing
        }, () => this.resumeSimulation())
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
                            <Col md={this.state.isRunning ? '0' : '3'} className={this.state.isRunning ? '' : 'border border-primary rounded p-3 mt-3'}>
                                <Inputs paused={this.state.paused}
                                    changeInputValuesAndStart={this.changeInputValuesAndStart.bind(this)}
                                    changeInputValuesAndResume={this.changeInputValuesAndResume.bind(this)}
                                    isRunning={this.state.isRunning}
                                    currentState={this.state.currentState}
                                    stateIcon={this.state.stateIcon}
                                    pauseSimulation={this.pauseSimulation.bind(this)}
                                    stopSimulation={this.stopSimulation.bind(this)} />

                            </Col>
                            <Col md={this.state.isRunning ? '12' : '9'} className='p-3'>
                                <Map data={this.state.moduleData}
                                    isRunning={this.state.isRunning}
                                    paused={this.state.pausted}
                                    currenWaterLevels={this.state.currentWaterLevels}
                                    currentYearData={this.state.currentData}
                                    updateCurrentData={this.updateCountryDataOnRunTime.bind(this)} />
                            </Col>
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