import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

class StepperTutorial extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        }
    }

    handleStepUp() {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    }

    handleStepDown() {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    }

    handleReset() {
        this.setState({
            activeStep: 0
        })
    }

    render() {


        return (
            <div>
                <Stepper style={{ backgroundColor: "transparent" }} activeStep={this.state.activeStep} orientation='vertical'>
                    <Step key='1st Step'>
                        <StepLabel>Introduction</StepLabel>
                        <StepContent className='text-center'>
                            <h2>We have created a quick tutorial to have you started in our simulation!</h2>
                            <div className='text-center'>
                               
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleStepUp.bind(this)}
                                >
                                    Start
                                </Button>
                            </div>
                        </StepContent>
                    </Step>

                    <Step key='1st Step'>
                        <StepLabel>Changing main inputs</StepLabel>
                        <StepContent>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="open controls"

                                        image="images/main/OpenControls.gif"
                                        title="Open controls"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Adding new values
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Each value represents a percentage in the increase of a chosen sector. These percentages will take affect for each and every year for all the countries. This means that the same percentage will be added again and again each year. To avoid huge values consider inputting smaller numbers as shown in the example above.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>

                            </Card>
                            <div className='float-right'>
                                <Button
                                    className='m-2'
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
                                    Next
                                </Button>
                            </div>
                        </StepContent>
                    </Step>

                    <Step key='2nd Step' >
                        <StepLabel>Changing a single country input</StepLabel>
                        <StepContent>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="change values single country"

                                        image="images/main/OpenOneCountry.gif"
                                        title="change values single country"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Single country sector change
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Each value represents a percentage in the increase of a chosen sector but for one country. Under the 'Political map' tab, you can find a 2D political map of Europe. You can change the values of all countries in the EU + UK. Again, the percentage is applied for each year of the simulation.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>

                            </Card>
                            <div className='float-right'>
                                <Button
                                    className='m-2'
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
                                    Next
                                </Button>
                            </div>
                        </StepContent>

                    </Step>

                    <Step key='Starting your simulation'>
                        <StepLabel>Starting your simulation</StepLabel>
                        <StepContent>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="open controls"

                                        image="images/main/StartSimulation.gif"
                                        title="Open controls"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Starting your simulation
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            When you have the desired inputs, the only thing left is to open the controls again and click on 'Create new simulation'.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>

                            </Card>
                            <div className='float-right'>
                                <Button
                                    className='m-2'
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
                                    Next
                                </Button>
                            </div>
                        </StepContent>

                    </Step>
                    <Step key='Changing values on run time'>
                        <StepLabel>Changing values on run time</StepLabel>
                        <StepContent>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="open controls"

                                        image="images/main/ChangeValuesOnRunTime.gif"
                                        title="Open controls"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Change inputs on run time
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            In order to change anything while the simulation is running you must pause it. Then, you are able to open the contols or any country you desire, and change the values. The changes will then be applied for the years ahead.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>

                            </Card>
                            <div className='float-right'>
                                <Button
                                    className='m-2'
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
                                    Finish
                                </Button>
                            </div>
                        </StepContent>

                    </Step>
                    <Step key='1st Step'>
                        <StepLabel>Ready to go</StepLabel>
                        <StepContent className='text-center'>
                            <h2>You are all done!</h2>
                            <div className='text-center'>
                                <Button className='m-2' variant="contained" color="success" href="/simulation">
                                    Create your own
                            </Button>
                                <Button onClick={this.handleReset.bind(this)} variant="contained" color='primary'>
                                    Reset
                            </Button>
                            </div>
                        </StepContent>
                    </Step>
                   
                </Stepper>
            </div>
        )
    }


}

export default StepperTutorial;