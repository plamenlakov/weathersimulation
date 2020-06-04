import React from 'react';
import PPMLineGraph from "./PPMLineGraph";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Map from "../Map";
import Simulation from '../classes/Simulation';
import BarChart from './BarChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faRedoAlt, faPause, faPlay, faSave } from '@fortawesome/free-solid-svg-icons';
import Inputs from './Inputs';
import Spinner from 'react-bootstrap/Spinner';
import Drawer from '@material-ui/core/Drawer';
import Button from 'react-bootstrap/Button';
import AlertM from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Chip from '@material-ui/core/Chip';
import Temperature from './Temperature';
import Modal from 'react-bootstrap/Modal';
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
            stateIcon: null,
            currentState: null,
            currentWaterLevels: null,
            replayValues: null,
            inputInfo: [],

            moduleData: null,
            yearToStop: 2020,
            warning: "",

            isFetching: true,
            inputError: false,
            paused: true,
            isRunning: false,
            drawerOpened: false,
            activeSimulation: false,
            hasPandemic: false,
            showSaveModal: false,
            activeReRun: false,

        }

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

                self.updateModuleData(initialData);
                var inputValues = document.getElementById('reRunInputValues').value;
                self.state.replayValues = null;
                self.setState({ activeReRun: false })
                if (inputValues != '') {
                    self.state.replayValues = JSON.parse(inputValues);
                    var newData = self.simulation.playExistingSimulation(self.state.replayValues);
                    self.unpauseSimulation();
                    self.changeRunningState(true);
                    self.changeActiveState(true);
                    self.setState({ activeReRun: true })
                    self.updateModuleData(newData);
                    inputValues = '';
                }
            })


    }

    startSimulation() {
        console.log(this.state.currentData)
        var newData = this.state.currentData == null ? this.simulation.getPPMOverall(this.state.yearToStop, this.state.populationIncrease, this.state.deforestationIncrease, this.state.electricityIncrease,
            this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease, this.state.industryIncrease,
            this.state.agricultureIncrease) : this.simulation.resumeFromCurrentState(this.state.currentData, this.state.yearToStop, this.state.populationIncrease, this.state.deforestationIncrease, this.state.electricityIncrease,
                this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease, this.state.industryIncrease,
                this.state.agricultureIncrease);

        this.unpauseSimulation();
        this.updateInputInfo(newData);
        this.changeRunningState(true);
        this.updateModuleData(newData);
        this.handleOpenAndClose();
        this.changeActiveState(true);

    }

    changeActiveState(state) {
        this.setState({
            activeSimulation: state
        })
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

            this.unpauseSimulation();
            this.setState({ activeReRun: false });
            this.simulation.hasPandemic = false;
            this.changeRunningState(false);
            this.updateModuleData(newData);
            this.changeActiveState(false);
        })

    }

    resumeSimulation() {
        var newData = this.simulation.resumeFromCurrentState(this.state.currentData, this.state.yearToStop, this.state.populationIncrease, this.state.deforestationIncrease, this.state.electricityIncrease,
            this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease, this.state.industryIncrease,
            this.state.agricultureIncrease)

        this.changeRunningState(true);
        this.updateInputInfo(newData);
        this.unpauseSimulation();
        this.updateModuleData(newData);


    }

    changeYearToStop(yearToStop) { this.setState({ yearToStop: yearToStop, }) }
    changeDeforestationIncrease(defIncrease) { this.setState({ deforestationIncrease: defIncrease }) }
    changeElectricityIncreasep(elIncrease) { this.setState({ electricityIncrease: elIncrease }) }
    changeTranportationIncrease(transportIncrease) { this.setState({ transportationIncrease: transportIncrease }) }
    changeAgricultureIncrease(agrIncrease) { this.setState({ agricultureIncrease: agrIncrease }) }
    changeIndustryIncrease(indIncrease) { this.setState({ industryIncrease: indIncrease }) }
    changeBuildingIncrease(buildIncrease) { this.setState({ buildingIncrease: buildIncrease }) }
    changeManufacturingIncrease(manIncrease) { this.setState({ manufacturingIncrease: manIncrease }) }

    updateCountryDataOnRunTime(data) {
        this.setState({
            currentData: data,
            currentState: 'Paused'
        })


    }

    togglePandemic(state) {
        this.setState({
            hasPandemic: state
        })
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

    updateInputInfo(newData) {
        if (this.state.currentData == null) {

            this.state.inputInfo.push({
                2020: [[this.state.deforestationIncrease, this.state.electricityIncrease, this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease,
                this.state.industryIncrease, this.state.agricultureIncrease], this.simulation.initialCountries.map((obj) => obj.cloneObject()), this.state.yearToStop]
            })

        } else {
            this.state.inputInfo.push({
                [+Object.keys(this.state.currentData)]: [[this.state.deforestationIncrease, this.state.electricityIncrease, this.state.transportationIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease,
                this.state.industryIncrease, this.state.agricultureIncrease], newData[0][+Object.keys(this.state.currentData)].map((obj) => obj.cloneObject()), this.state.yearToStop]
            })
        }

    }
    handleOpenAndClose(event) {
        if (event) {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            if (this.state.drawerOpened) {
                this.setState({
                    drawerOpened: false
                })
            } else {
                if (this.state.replayValues == null) {
                    this.setState({
                        drawerOpened: true

                    })
                }

            }
        }
        else {
            if (this.state.drawerOpened) {
                this.setState({
                    drawerOpened: false
                })
            } else {
                if (this.state.replayValues == null) {
                    this.setState({
                        drawerOpened: true

                    })
                }
            }
        }
        this.setState({
            replayValues: null
        })

    }

    render() {
        const handleCloseModal = () => this.setState({ showSaveModal: false });
        const handleShowModal = () => this.setState({ showSaveModal: true });

        return (
            <div className="App">
                {this.state.isFetching ? <div className="text-center justify-content-center align-self-center"><h3 >Loading data...<br /><br /></h3> <Spinner animation="border" variant="primary" /></div> :

                    <div>
                        <Row className="m-2 text-center">
                            <Col md='4' className='border border-primary rounded p-3 mt-3'>

                                <PPMLineGraph data={this.state.moduleData} paused={this.state.paused} />

                                <Temperature temperatures={this.simulation.temperatureIncrease} />

                                <Button disabled={this.state.activeReRun} className="mt-3" onClick={evt => this.handleOpenAndClose(evt)}>Open controls</Button>
                                <br />
                                <br />
                                {this.state.activeSimulation ?
                                    <Chip label={this.state.currentState} />
                                    :
                                    <div></div>
                                }

                                <Drawer anchor='left' open={this.state.drawerOpened} onClose={evt => this.handleOpenAndClose(evt)}>
                                    <div className='text-center' id='inputs'>
                                        <Inputs paused={this.state.paused}
                                            changeYearToStop={this.changeYearToStop.bind(this)}
                                            changeElectricityIncrease={this.changeElectricityIncreasep.bind(this)}
                                            changeAgricultureIncrease={this.changeAgricultureIncrease.bind(this)}
                                            changeBuildingIncrease={this.changeBuildingIncrease.bind(this)}
                                            changeDeforestationIncrease={this.changeDeforestationIncrease.bind(this)}
                                            changeIndustryIncrease={this.changeIndustryIncrease.bind(this)}
                                            changeTransportationIncrease={this.changeTranportationIncrease.bind(this)}
                                            changeManufacturingIncrease={this.changeManufacturingIncrease.bind(this)}

                                            togglePandemic={this.togglePandemic.bind(this)}
                                            hasPandemic={this.state.hasPandemic}
                                            countries={this.simulation.initialCountries}
                                            isRunning={this.state.isRunning} />
                                    </div>
                                    <div className='text-center'>
                                        <Button style={{ display: !this.state.activeSimulation ? 'initial' : 'none' }} variant="success" id="buttonStartSim"
                                            onClick={this.startSimulation.bind(this)}>Create new simulation</Button>

                                        <div style={{ display: this.state.activeSimulation ? 'initial' : 'none' }}>

                                            <Button variant="primary" id="buttonPauseSim" className='m-2' disabled={this.state.paused}
                                                onClick={this.pauseSimulation.bind(this)} ><FontAwesomeIcon icon={faPause} /></Button>

                                            <Button variant="primary" id="buttonResumeSim" className='m-2' disabled={!this.state.paused}
                                                onClick={this.resumeSimulation.bind(this)}><FontAwesomeIcon icon={faPlay} /></Button>

                                            <Button variant="danger" id="buttonStopSim" className='m-2'
                                                onClick={this.stopSimulation.bind(this)}>{this.state.stateIcon}</Button>
                                            <div className='text-center'>
                                                <Chip label={this.state.currentState} />
                                            </div>

                                        </div>


                                        <div className='p-3' style={{ maxWidth: 300 + 'px' }}>
                                            <AlertM severity={this.state.isRunning ? 'warning' : 'success'}>
                                                {this.state.isRunning ? 'The simulation must be paused to change values!' : 'Go ahead and change something :)'}

                                            </AlertM>
                                            {this.state.isRunning && this.simulation.hasPandemic ?
                                                <div className='mt-3'>
                                                    <AlertM severity='info'>
                                                        A pandemic is taking effect!
                                                    </AlertM>
                                                </div>
                                                :
                                                <div></div>
                                            }


                                        </div>

                                    </div>

                                </Drawer>
                                <Snackbar
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    open={this.state.activeSimulation && !this.state.drawerOpened && !this.state.activeReRun}
                                    style={{ bottom: 75 + 'px' }}>
                                    <AlertM icon={false} severity="info">
                                        <div>

                                            <Button size='sm' variant="primary" id="buttonPauseSim" className='m-2' disabled={this.state.paused}
                                                onClick={this.pauseSimulation.bind(this)} ><FontAwesomeIcon icon={faPause} /></Button>

                                            <Button size='sm' variant="primary" id="buttonResumeSim" className='m-2' disabled={!this.state.paused}
                                                onClick={this.resumeSimulation.bind(this)}><FontAwesomeIcon icon={faPlay} /></Button>

                                            <Button size='sm' variant="danger" id="buttonStopSim" className='m-2'
                                                onClick={this.stopSimulation.bind(this)}>{this.state.stateIcon}</Button>

                                            <div style={{ display: this.state.isRunning ? 'none' : 'initial' }}>
                                                <Button size='sm' className='m-2' variant="success" onClick={handleShowModal} ><FontAwesomeIcon icon={faSave} /></Button>
                                            </div>

                                        </div>
                                    </AlertM>
                                </Snackbar>

                                <Snackbar
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    open={this.state.activeSimulation && !this.state.drawerOpened && !this.state.activeReRun}>
                                    <AlertM severity={this.state.isRunning ? 'warning' : 'success'}>
                                        {this.state.isRunning ? 'The simulation must be paused to change values!' : 'Go ahead and change something :)'}

                                    </AlertM>
                                </Snackbar>

                                <Snackbar
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    open={this.state.activeReRun}>
                                    <AlertM icon={false} severity='info'>
                                        You are watching a replay.
                                        <Button size='sm' className='m-2' variant="danger" onClick={this.stopSimulation.bind(this)}><FontAwesomeIcon icon={faStop} /></Button>
                                        
                                    </AlertM>
                                </Snackbar>


                            </Col>
                            <Col md='8' className='p-3'>
                                {/* <Map data={this.state.moduleData}
                                    isRunning={this.state.isRunning}
                                    paused={this.state.paused}
                                    currentWaterLevels={this.state.currentWaterLevels}
                                    currentYearData={this.state.currentData}
                                    updateCurrentData={this.updateCountryDataOnRunTime.bind(this)} /> */}
                            </Col>
                        </Row>

                        <Alert variant='primary' className='m-2'>
                            <Alert.Heading className='m-2'>Charts</Alert.Heading>
                            <Row className="m-1 justify-content-center">
                                <Col md="12" className="mt-3">
                                    <BarChart data={this.state.moduleData} updateState={this.updateState.bind(this)} paused={this.state.paused} updateCountryDataOnRunTime={this.updateCountryDataOnRunTime.bind(this)} />
                                </Col>

                            </Row>
                            <Row className="m-1 justify-content-center">

                            </Row>

                        </Alert>

                        <Modal show={this.state.showSaveModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <form action="/saveSimulation" method="POST">

                                <Modal.Body>
                                    <input type="hidden" name="inputsInfo" value={JSON.stringify(this.state.inputInfo)}
                                    />
                                    <input type="hidden" name="_token" value={csrf_token} />
                                    <TextField id="simulationName" name="simulationName" label="Choose simulation name (required)" variant="outlined" fullWidth />
                                    <br />
                                    <br />
                                    <TextField
                                        id="simulationDesc"
                                        name="simulationDesc"
                                        label="Simulation description"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        fullWidth
                                    />


                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal}>
                                        Close
                                </Button>
                                    <Button type='submit' variant="primary" onClick={handleCloseModal}>
                                        Save simulation
                                </Button>
                                </Modal.Footer>
                            </form>
                        </Modal>

                    </div>


                }


            </div>
        )
    }
}

export default AllGraphs;