import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class StepperTutorial extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        }
    }

    handleStepUp() {
        this.setState({
            activeStep: this.state.activeStep++
        })
    }

    handleStepDown() {
        this.setState({
            activeStep: this.state.activeStep--
        })
    }

    render() {
        return (
            <div>
                <Stepper activeStep={this.state.activeStep} orientation='vertical'>
                    <Step key='1st step'>
                        <StepLabel>1st step</StepLabel>
                        <StepContent>
                            Neshto da ima
                        </StepContent>
                        <div>
                            <Button
                                disabled={this.state.activeStep === 0}
                                onClick={this.handleStepDown.bind(this)}
                                color='secondary'
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleStepUp.bind(this)}
                            >
                                {this.state.activeStep === 3 - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </Step>

                    <Step key='2nd step'>
                        <StepContent>
                            Neshto da ima 2
                        </StepContent>
                        <div>
                            <Button
                                disabled={this.state.activeStep === 0}
                                onClick={this.handleStepDown.bind(this)}
                                color='secondary'
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleStepUp.bind(this)}
                            >
                                {this.state.activeStep === 3 - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </Step>
                    
                    <Step key='3rd step'>
                        <StepContent>
                            Neshto da ima 3
                        </StepContent>
                        <div>
                            <Button
                                disabled={this.state.activeStep === 0}
                                onClick={this.handleStepDown.bind(this)}
                                color='secondary'
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleStepUp.bind(this)}
                            >
                                {this.state.activeStep === 3 - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </Step>
                </Stepper>
            </div>
        )
    }


}

export default StepperTutorial;