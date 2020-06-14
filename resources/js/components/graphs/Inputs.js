import React from 'react';
import TextField from '@material-ui/core/TextField';
import Form from 'react-bootstrap/Form';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from 'react-bootstrap/Button';
import Pandemic from '../classes/Pandemic';

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
            yearToStopPandemic: 2020,
            countryToStartPandemic: null,
            infectionRate: 0,
            warningPandemic: ""
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
            if (this.props.currentData) {
                if (+Object.keys(this.props.currentData) > +evt.target.value) {
                    this.setState({
                        warning: "Please provide an year that has not passed already",
                        inputError: true
                    })
                }
                else {
                    this.setState({
                        yearToStop: +evt.target.value,
                        inputError: false
                    }, () => { this.setState({ warning: "Current chosen year: " + this.state.yearToStop }, () => this.props.changeYearToStop(this.state.yearToStop)) })
                }
            }
            else {
                this.setState({
                    yearToStop: +evt.target.value,
                    inputError: false
                }, () => { this.setState({ warning: "Current chosen year: " + this.state.yearToStop }, () => this.props.changeYearToStop(this.state.yearToStop)) })
            }

        }
        else {
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
            if(this.props.currentData != null){
                if(+Object.keys(this.props.currentData) > +evt.target.value){
                    this.setState({
                        warningPandemic: 'Choose a year bigger than the current one'
                    })
                }else{
                    this.setState({
                        yearToStopPandemic: +evt.target.value
                    })
                }
            }else{
                this.setState({
                    yearToStopPandemic: +evt.target.value
                })
            }
           
        } else {
            this.setState({
                yearToStopPandemic: 2020
            })
        }

    }

    updateOriginCountryInput(evt) {
        this.setState({
            countryToStartPandemic: evt.target.options[evt.target.selectedIndex].text
        })

    }


    createPandemic() {
        if(this.state.countryToStartPandemic == null || this.state.countryToStartPandemic == 'Choose a country *'){
            this.setState({
                warningPandemic: 'Please choose an origin country'
            })
        }
        else{
            let yearToStartPandemic = this.props.currentData ? +Object.keys(this.props.currentData) : 2020;
            let newPandemic = new Pandemic(this.state.countryToStartPandemic, yearToStartPandemic, this.state.yearToStopPandemic);
    
            this.props.createNewPandemic(newPandemic);
            this.setState({
                warningPandemic: 'Pandemic created'
            })
        }
        

    }

    render() {

        return (
            <div>
                <div className='p-3'>
                    <TextField className="mb-4 mt-4" disabled={this.props.isRunning} placeholder={this.props.inputs[0].toString()} label={"Deforestation: " + this.props.inputs[0] + "% increase"} variant="outlined" onChange={evt =>
                        this.updateDeforestationInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.props.inputs[1].toString()} label={"Electricity: " + this.props.inputs[1] + "% increase"} variant="outlined" onChange={evt =>
                        this.updateElectricityInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.props.inputs[2].toString()} label={"Transportation: " + this.props.inputs[2] + "% increase"} variant="outlined" onChange={evt =>
                        this.updateTransportationInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.props.inputs[3].toString()} label={"Building: " + this.props.inputs[3] + "% increase"} variant="outlined" onChange={evt =>
                        this.updateBuildingInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.props.inputs[4].toString()} label={"Manufacturing: " + this.props.inputs[4] + "% increase"} variant="outlined" onChange={evt =>
                        this.updateManufacturingInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.props.inputs[5].toString()} label={"Industry: " + this.props.inputs[5] + "% increase"} variant="outlined" onChange={evt =>
                        this.updateIndustryInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.props.inputs[6].toString()} label={"Agriculture: " + this.props.inputs[6] + "% increase"} variant="outlined" onChange={evt =>
                        this.updateAgricultureInput(evt)} fullWidth />
                    <br />
                    <TextField className="mb-4" disabled={this.props.isRunning} placeholder={this.props.inputs[7].toString()} label={"Year to stop simulation: " + this.props.inputs[7]} variant="outlined" onChange={evt =>
                        this.updateYearInput(evt)} helperText={this.state.warning} error={this.state.inputError} fullWidth />


                    <div className="p-3">
                        <FormControlLabel
                            control={<Switch
                                checked={this.props.hasPandemic}
                                onChange={evt => this.togglePandemic(evt)}
                                color="secondary"
                                name="checkedB" />}
                            label="🦠 Open pandemic controls"
                        />

                    </div>

                    <div className='text-left' style={{ display: this.props.hasPandemic && !this.props.isRunning ? 'initial' : 'none' }}>

                        <Form.Text className="text-muted">
                            Country to start from:
                                                </Form.Text>
                        <Form.Control as="select" custom onChange={evt => this.updateOriginCountryInput(evt)} required>
                            <option>Choose a country *</option>
                            {

                                this.props.countries.map((country, index) => {
                                    return (<option key={index} value={index}> {country.name} </option>)
                                })
                            }
                        </Form.Control>
                        <TextField
                            className='mt-2'
                            label='Year to start pandemic'
                            onChange={evt => this.changeYearPandemic(evt)}
                            placeholder={this.state.yearToStopPandemic.toString()}
                            variant='outlined'
                            fullWidth />

                        <Button className='m-2' variant='danger' onClick={this.createPandemic.bind(this)}>Create pandemic</Button>
                        <div className='text-center'>
                            {this.state.warningPandemic}
                        </div>

                    </div>

                </div>

            </div>

        )

    }

}

export default Inputs;