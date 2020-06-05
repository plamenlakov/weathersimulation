import React from 'react';
import CountUp from 'react-countup';

class Temperature extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            yearIndex: 0,
            temperatureIncrease: 0,

            start: 0,
            end: 0
        }

    }
    componentDidMount() {
        this.setState({
            end: this.props.temperatures[this.state.yearIndex]
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data != prevProps.data) {

            if (+Object.keys(this.props.data[0]) == 2020) {
                this.state.yearIndex = 0;
                if( this.props.temperatures[this.state.yearIndex + 1]){
                    this.setState({
                        start:  this.props.temperatures[this.state.yearIndex],
                        end:  this.props.temperatures[this.state.yearIndex + 1]
                    })
                }else{
                    this.setState({
                        start:  this.props.temperatures[this.state.yearIndex],
                        end:  this.props.temperatures[this.state.yearIndex]
                    })
                }
            }

            this.play();
        }
    }
    play(){
        let self = this;
        var interval = setInterval(function () {
            if (self.state.yearIndex < self.props.data.length - 1) {
                if (self.props.paused) {
                    clearInterval(interval);
                } else {
                    self.nextYear();
                }
            }
            else {
                clearInterval(interval);
            }
        }, 1300)

    }
    nextYear(){
        if( this.props.temperatures[this.state.yearIndex + 1]){
            this.setState({
                start:  this.props.temperatures[this.state.yearIndex],
                end:  this.props.temperatures[this.state.yearIndex + 1]
            })
        }else{
            this.setState({
                start:  this.props.temperatures[this.state.yearIndex],
                end:  this.props.temperatures[this.state.yearIndex]
            })
        }
        // this.setState({
        //     // temperatureIncrease: this.props.temperatures[this.state.yearIndex]
        //
        //
        // });
        this.state.yearIndex++;

    }
    render() {

        return (
            <div className='mt-3' style={{ height: 220 + 'px', backgroundColor: '#fff0ff' }}>
                <div style={{fontSize: 50, color: this.state.end > 2 ? 'red' : 'green'}}>
                    <CountUp start={this.state.start} end={this.state.end} delay={1.3} decimals={2} prefix = {this.state.end > 0 ? '+' : ''} suffix = " °C"/>
                </div>

            </div>

        )

    }

}

export default Temperature;