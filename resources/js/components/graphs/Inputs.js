import React from 'react';
import AlertM from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faStop, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class Inputs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deforestationIncrease: 0.0,
            electricityIncrease: 0.0,
            transportationIncrease: 0.0,
            buildingIncrease: 0.0,
            manufacturingIncrease: 0.0,
            industryIncrease: 0.0,
            agricultureIncrease: 0.0,
            yearToStop: 2020,
            inputError: false,
            warning: "",
        }

    }

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


    render() {

        return (
            <div>
                <div style={{ display: this.props.isRunning ? 'none' : 'initial' }}>
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.deforestationIncrease.toString()} label="Deforestation %" variant="outlined" onChange={evt =>
                        this.updateDeforestationInput(evt)} fullWidth />

                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.electricityIncrease.toString()} label="Electricity increase %" variant="outlined" onChange={evt =>
                        this.updateElectricityInput(evt)} fullWidth />

                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.transportationIncrease.toString()} label="Transportation increase %" variant="outlined" onChange={evt =>
                        this.updateTransportationInput(evt)} fullWidth />

                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.buildingIncrease.toString()} label="Building increase %" variant="outlined" onChange={evt =>
                        this.updateBuildingInput(evt)} fullWidth />

                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.manufacturingIncrease.toString()} label="Manufacturing increase %" variant="outlined" onChange={evt =>
                        this.updateManufacturingInput(evt)} fullWidth />

                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.industryIncrease.toString()} label="Industry increase %" variant="outlined" onChange={evt =>
                        this.updateIndustryInput(evt)} fullWidth />

                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.agricultureIncrease.toString()} label="Agriculture increase %" variant="outlined" onChange={evt =>
                        this.updateAgricultureInput(evt)} fullWidth />

                    <TextField className="mb-5" disabled={this.props.isRunning} placeholder={this.state.yearToStop.toString()} label="Year to stop simulation" variant="outlined" onChange={evt =>
                        this.updateYearInput(evt)} fullWidth helperText={this.state.warning} error={this.state.inputError} />


                    <Button variant="success" id="buttonStartSim"
                        onClick={() => this.props.changeInputValuesAndStart(this.state.yearToStop, this.state.deforestationIncrease, this.state.electricityIncrease, this.state.transportationIncrease, this.state.agricultureIncrease, this.state.industryIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease)}>Create new simulation</Button>

                    <div id="buttonsWhenStarted" style={{display: 'none'}}>
                        <Button variant="primary" id="buttonPauseSim" className='m-2' disabled={this.props.paused}
                            onClick={this.props.pauseSimulation} ><FontAwesomeIcon icon={faPause} /></Button>

                        <Button variant="primary" id="buttonResumeSim" className='m-2' disabled={!this.props.paused}
                            onClick={() => this.props.changeInputValuesAndResume(this.state.yearToStop, this.state.deforestationIncrease, this.state.electricityIncrease, this.state.transportationIncrease, this.state.agricultureIncrease, this.state.industryIncrease, this.state.buildingIncrease, this.state.manufacturingIncrease)}><FontAwesomeIcon icon={faPlay} /></Button>

                        <Button variant="danger" id="buttonStopSim" className='m-2'
                            onClick={this.props.stopSimulation}>{this.props.stateIcon}</Button>
                        <div className='text-center'>
                            <Chip label={this.props.currentState} />
                        </div>

                    </div>

                    <div className="mt-4">
                        <Form.Check
                            disabled={this.props.isRunning}
                            type="switch"
                            id="pandemic_switch"
                            label="🦠 Start Pandemic"
                            onChange={evt => this.togglePandemic(evt)}
                        />
                    </div>
                </div>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={this.props.isRunning}
                    autoHideDuration={6000}>
                    <AlertM icon={false} severity="info">
                        <div>

                            <Button variant="primary" id="buttonPauseSim" className='m-2' disabled={this.props.paused}
                                onClick={this.props.pauseSimulation} ><FontAwesomeIcon icon={faPause} /></Button>

                            <Button variant="primary" id="buttonResumeSim" className='m-2' disabled={!this.props.paused}
                                onClick={this.props.resumeSimulation}><FontAwesomeIcon icon={faPlay} /></Button>

                            <Button variant="danger" id="buttonStopSim" className='m-2'
                                onClick={this.props.stopSimulation}>{this.props.stateIcon}</Button>
                            <div className='text-center'>
                                <Chip label={this.props.currentState} />
                            </div>

                        </div>
                    </AlertM>
                </Snackbar>




                {/* <div className='m-2' style={{ display: this.simulation.hasPandemic && this.props.isRunning ? 'initial' : 'none' }}>
                    <AlertM severity="info" variant='outlined' >
                        A pandemic is taking effect!
                    </AlertM>
                </div> */}


                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.props.isRunning}
                    autoHideDuration={6000}>
                    <AlertM severity="warning">
                        The simulation must be paused to change values!
                                        </AlertM>
                </Snackbar>
            </div>

        )

    }

}

export default Inputs;