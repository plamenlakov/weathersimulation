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

class Controls extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // deforestationIncrease: 0.0,
            // electricityIncrease: 0.0,
            // transportationIncrease: 0.0,
            // buildingIncrease: 0.0,
            // manufacturingIncrease: 0.0,
            // industryIncrease: 0.0,
            // agricultureIncrease: 0.0,
            // yearToStop: 2020,
            // inputError: false,
            // warning: "",
        }

    }

    render() {

        return (
            <div>
                    <Button variant="success" id="buttonStartSim"
                        onClick={this.props.startSimulation}>Create new simulation</Button>

                    <div id="buttonsWhenStarted" style={{display: 'none'}}>
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

        )

    }

}

export default Controls;