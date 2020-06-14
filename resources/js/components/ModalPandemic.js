import React from 'react';
import Table from 'react-bootstrap/Table';
import CountUp from 'react-countup';
import Chip from '@material-ui/core/Chip';

class ModalPandemic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPandemicModal: false,
            currentCountryArray: [],
            interval: null,

            start: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            end: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yearIndex: 0
        }

    }

    nextYear() {

        this.setState({
            start: this.state.currentCountryArray.map(function (country) { return country.infectedPopulation })
        })


        this.setState({
            currentCountryArray: this.props.data[this.state.yearIndex][+Object.keys(this.props.data[this.state.yearIndex])]
        }, () => this.setState({ end: this.state.currentCountryArray.map(function (country) { return country.infectedPopulation }) }));

        this.state.yearIndex++;
    }

    play() {
        var self = this;

        this.state.interval = setInterval(function () {
            if (self.state.yearIndex < self.props.data.length) {
                if (self.props.paused) {
                    clearInterval(self.state.interval)
                }
                else {
                    self.nextYear();

                }


            }
            else {
                clearInterval(self.state.interval);
            }
        }, 1300 / this.props.simulationSpeed)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data != this.props.data) {
            clearInterval(this.state.interval);
            if(+Object.keys(this.props.data[0]) == 2020){
                this.state.yearIndex = 0;
                this.setState({
                    start: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    end: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    currentCountryArray: this.props.data[this.state.yearIndex][+Object.keys(this.props.data[this.state.yearIndex])]
                })
            }
            
            this.play();
        }
        if (prevProps.simulationSpeed != this.props.simulationSpeed) {
            clearInterval(this.state.interval);
            this.play();
        }
        if(prevProps.paused != this.props.paused){
            clearInterval(this.state.interval)
            this.play();
        }
        
    }

    modalBody() {
        var modalBody =
            <>
                <Chip className='m-2' style={{backgroundColor: '#F5C6CB'}} label="Infected country" />
                <Chip className='m-2' style={{backgroundColor: '#FFEEBA'}} label="Country is in lockdown" />
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Infected population</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.currentCountryArray.map((country, i) => {
                            return (
                                <tr>

                                    <td style={{ backgroundColor: this.state.currentCountryArray[i].isInfected ? this.state.currentCountryArray[i].isOnLockDown ? '#FFEEBA' : '#F5C6CB' : '' }}>{this.state.currentCountryArray[i].name}</td>
                                    <td style={{ backgroundColor: this.state.currentCountryArray[i].isInfected ? this.state.currentCountryArray[i].isOnLockDown ? '#FFEEBA' : '#F5C6CB' : '' }}><CountUp start={this.state.start[i]} end={this.state.end[i]} delay={1.3 / this.props.simulationSpeed} /></td>

                                </tr>
                            )
                        })}


                    </tbody>
                </Table>
            </>

        return modalBody;
    }

    render() {

        return (
            <div>
                {this.modalBody()}
            </div>

        )

    }

}

export default ModalPandemic;