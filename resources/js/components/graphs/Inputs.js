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
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


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
            hasPandemic: false,
            yearToStartPandemic: 2020
        }
        
    }

    updateDeforestationInput(evt) {
        this.setState({
            deforestationIncrease: +evt.target.value
        }, () => this.props.changeDeforestationIncrease(this.state.deforestationIncrease))
    }
    updateElectricityInput(evt) {
        this.setState({
            electricityIncrease: +evt.target.value
        }, () => this.props.changeElectricityIncrease(this.state.electricityIncrease))
    }
    updateTransportationInput(evt) {
        this.setState({
            transportationIncrease: +evt.target.value
        }, () => this.props.changeTransportationIncrease(this.state.transportationIncrease))
    }
    updateBuildingInput(evt) {
        this.setState({
            buildingIncrease: +evt.target.value
        }, () => this.props.changeBuildingIncrease(this.state.buildingIncrease))
    }
    updateManufacturingInput(evt) {
        this.setState({
            manufacturingIncrease: +evt.target.value
        }, () => this.props.changeManufacturingIncrease(this.state.manufacturingIncrease))
    }

    updateIndustryInput(evt) {
        this.setState({
            industryIncrease: +evt.target.value
        }, () => this.props.changeIndustryIncrease(this.state.industryIncrease))
    }
    updateAgricultureInput(evt) {
        this.setState({
            agricultureIncrease: +evt.target.value
        }, () => this.props.changeAgricultureIncrease(this.state.agricultureIncrease))
    }

    updateYearInput(evt) {
        if (+evt.target.value >= 2021) {
            this.setState({
                yearToStop: +evt.target.value,
                inputError: false
            }, () => { this.setState({ warning: "Current chosen year: " + this.state.yearToStop }, () => this.props.changeYearToStop(this.state.yearToStop)) })
        } else {
            this.setState({
                warning: "Please provide an year after 2021.",
                inputError: true
            })
        }
    }

    togglePandemic(evt) {
        this.setState({
            hasPandemic: evt.target.checked
        })

        this.props.togglePandemic(evt.target.checked)
    }

    changeYearPandemic(evt) {
        if (+evt.target.value >= 2020) {
            this.setState({
                yearToStartPandemic: +evt.target.value
            })
        } else {
            this.setState({
                yearToStartPandemic: 2020
            })
        }

    }


    render() {

        return (
            <div>
                <div className='p-3'>
                    <TextField className="mb-4 mt-4" disabled={this.props.isRunning} placeholder={this.state.deforestationIncrease.toString()} label="Deforestation %" variant="outlined" onChange={evt =>
                        this.updateDeforestationInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.electricityIncrease.toString()} label="Electricity increase %" variant="outlined" onChange={evt =>
                        this.updateElectricityInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.transportationIncrease.toString()} label="Transportation increase %" variant="outlined" onChange={evt =>
                        this.updateTransportationInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.buildingIncrease.toString()} label="Building increase %" variant="outlined" onChange={evt =>
                        this.updateBuildingInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.manufacturingIncrease.toString()} label="Manufacturing increase %" variant="outlined" onChange={evt =>
                        this.updateManufacturingInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.industryIncrease.toString()} label="Industry increase %" variant="outlined" onChange={evt =>
                        this.updateIndustryInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.agricultureIncrease.toString()} label="Agriculture increase %" variant="outlined" onChange={evt =>
                        this.updateAgricultureInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.state.yearToStop.toString()} label="Year to stop simulation" variant="outlined" onChange={evt =>
                        this.updateYearInput(evt)} helperText={this.state.warning} error={this.state.inputError} fullWidth />


                    <div className="p-3">
                        <FormControlLabel
                            control={<Switch
                                checked={this.props.hasPandemic}
                                onChange={evt => this.togglePandemic(evt)}
                                color="secondary"
                                name="checkedB" />}
                            label="🦠 Start Pandemic"
                        />
                       
                    </div>

                    <div className='text-left' style={{ display: this.props.hasPandemic && !this.props.isRunning ? 'initial' : 'none' }}>

                        <Form.Text className="text-muted">
                            Country to start from:
                                                </Form.Text>
                        <Form.Control as="select" custom onChange={evt => this.updateOriginCountryInput(evt)} required>

                            {
                                this.props.countries.map((country, index) => {
                                    return (<option key={index} value={index}> {country.name} </option>)
                                })
                            }
                        </Form.Control>
                        <Form.Group controlId="pandemicForm.RateOfInfection">
                            <Form.Text className="text-muted">
                                The severity of the pandemic:
                                                    </Form.Text>
                            <Form.Control as="select" defaultValue={10} custom onChange={evt => this.updateRateOfInfectionInput(evt)} required>
                                <option value={10}>Low</option>
                                <option value={20}>Medium</option>
                                <option value={30}>High</option>
                            </Form.Control>

                        </Form.Group>
                        <TextField
                            label='Year to start pandemic'
                            onChange={evt => changeYearPandemic(evt)}
                            placeholder={this.state.yearToStartPandemic.toString()}
                            variant='outlined'
                            fullWidth />


                    </div>


                </div>

            </div>

        )

    }

}

export default Inputs;