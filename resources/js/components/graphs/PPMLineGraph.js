import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import CountUp from 'react-countup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faTemperatureLow, faSun, faCloudSun, faWater, faSwimmer, faInfoCircle, faExclamationTriangle, faRadiationAlt } from '@fortawesome/free-solid-svg-icons';
import Alert from 'react-bootstrap/Alert'

class PPMLineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            yearIndex: 0,
            tempIndex: 0,
            interval: null,

            yearAxis: null,
            valueAxis: null,
            series: null,
            containerWidth: 0,
            start: 0,
            end: 0,

            startPPM: 0,
            endPPM: 0,

            startWater: 0,
            endWater: 0
        }
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.data != prevProps.data) {
            clearInterval(this.state.interval);
            if (+Object.keys(this.props.data[0]) == 2020) {
                this.chart.data = [];
                this.state.tempIndex = 0;
                
            }

            this.state.yearAxis.max = +Object.keys(this.props.data[this.props.data.length - 1]) + 5
            this.state.yearIndex = 0;
            this.play();

        }
        if (prevProps.simulationSpeed != this.props.simulationSpeed) {
            clearInterval(this.state.interval);
            this.play();
        }

    }
    play() {
        let self = this;
        this.state.interval = setInterval(function () {
            if (self.state.yearIndex < self.props.data.length) {
                if (self.props.paused) {
                    clearInterval(self.state.interval);
                } else {
                    self.nextYear();
                }
            }
            else {
                clearInterval(self.state.interval);
            }
        }, 1300 / this.props.simulationSpeed)
    }
    nextYear() {
        let newData = this.formatedData(this.state.yearIndex);

        this.chart.addData(newData[0]);
        this.chart.invalidateData();

        if (this.props.temperatures[this.state.tempIndex + 1]) {
            this.setState({
                start: this.props.temperatures[this.state.tempIndex],
                end: this.props.temperatures[this.state.tempIndex + 1],
                startPPM: this.chart.data[this.state.tempIndex].PPM,
                endPPM: this.chart.data[this.state.tempIndex + 1].PPM,
                startWater: this.props.waterLevels[this.state.tempIndex],
                endWater: this.props.waterLevels[this.state.tempIndex + 1]
            })
        } else {
            this.setState({
                start: this.props.temperatures[this.state.tempIndex],
                end: this.props.temperatures[this.state.tempIndex],
                startPPM: this.chart.data[this.state.tempIndex].PPM,
                endPPM: this.chart.data[this.state.tempIndex].PPM,
                startWater: this.props.waterLevels[this.state.tempIndex],
                endWater: this.props.waterLevels[this.state.tempIndex]
            })
        }

        if (this.chart.data[this.chart.data.length - 1].PPM > 0) {
            this.state.valueAxis.max = this.chart.data[this.chart.data.length - 1].PPM * 2
        }
        else {
            this.state.valueAxis.max = Math.max.apply(Math, this.chart.data.map(function (m) { return m.PPM }));
        }
        this.state.yearIndex++;
        this.state.tempIndex++;
    }

    formatedData(year) {

        let chartdata = [];
        let currentYear;
        let totalPPMYear;
        let countryPPMs = [];
        let yearData = [];
        yearData = this.props.data[year];

        for (var country in yearData) {
            let countryData = yearData[country];
            countryPPMs = countryData.map(c => c['ppm']);

        }

        currentYear = +Object.keys(yearData);
        totalPPMYear = (this.sumPPM(countryPPMs));
        chartdata.push({ 'Year': currentYear, 'PPM': totalPPMYear })
        return chartdata;
    }

    sumPPM(array) {
        var result = 0;
        array.forEach(c => {
            result += c;
        });

        return result;
    }


    createChart(container) {
        // Themes begin
        am4core.useTheme(am4themes_animated);

        // Themes end
        let chart = am4core.create(container, am4charts.XYChart);
        chart.data = this.formatedData(0);

        // Create axes
        let yearAxis = chart.xAxes.push(new am4charts.ValueAxis());
        yearAxis.dataFields.category = "Year";
        yearAxis.title.text = "Year";
        yearAxis.interpolationDuration = 650;
        yearAxis.duration = 650;
        yearAxis.renderer.axisFills.template.disabled = true;
        yearAxis.renderer.ticks.template.disabled = true;
        yearAxis.min = 2015;
        yearAxis.max = 2025;
        yearAxis.keepSelection = true;
        //yearAxis.dataFields.category = "Year";
        this.state.yearAxis = yearAxis;

        // Create value axis
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "[font-style: italic]CO2 emissions in PPM[/]";
        valueAxis.interpolationDuration = 650;
        valueAxis.rangeChangeDuration = 650;
        valueAxis.renderer.minLabelPosition = 0.05;
        valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;
        valueAxis.max = chart.data[0].PPM * 2
        this.state.valueAxis = valueAxis;

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "PPM";
        series.dataFields.valueX = "Year";
        series.strokeWidth = 3;
        series.tooltipText = "{valueY}";
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.fillOpacity = 0.5;
        series.tooltip.label.padding(12, 12, 12, 12)
        series.fillOpacity = 0.1;
        series.interpolationDuration = 1300;
        series.defaultState.transitionDuration = 0;
        //series.tensionX = 0.9;
        series.minBulletDistance = 35;
        this.state.series = series;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();

        chart.cursor.xAxis = yearAxis;
        chart.cursor.snapToSeries = series;
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);

        chart.numberFormatter.numberFormat = "####.###";
        chart.background.fill = "#fff0ff";
        chart.paddingRight = 40;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

        this.chart = chart;



    }

    infoMessage() {
        var message = <></>;
        if (this.state.end >= 1 && this.state.end < 2) {
            message =
                <Alert variant="primary">
                    <Alert.Heading> <FontAwesomeIcon icon={faInfoCircle} />&nbsp; Between 1 and 2 °C increase</Alert.Heading>
            The hot European summer of 2003 will be an annual norm. Instead of absorbing CO2, plants start to emmit it. Around half a billion tonnes of carbon is added to the atmosphere from European plants.
                </Alert>
        }
        else if (this.state.end >= 2 && this.state.end < 3) {
            message =
                <Alert variant="warning">
                    <Alert.Heading><FontAwesomeIcon style={{ color: '#FD7E14' }} icon={faExclamationTriangle} />&nbsp;Between 2 and 3 °C increase</Alert.Heading>
            Food industry becomes unable to grow plants at the most generous areas in the world nowadays. Billions are left without food. Warmer waters absorb less CO2 leaving more to accumulate in the atmosphere. On land, huge amount of CO2 is stored in soil. It is being released with gigatonnes. The Amazon rainforest will be crippled by drought and heat.
        </Alert>
        }
        else if (this.state.end >= 3 && this.state.end < 4) {
            message =
                <Alert variant="danger">
                    <Alert.Heading><FontAwesomeIcon style={{ color: '#FD7E14' }} icon={faExclamationTriangle} />&nbsp;Between 3 and 4 °C increase</Alert.Heading>

                </Alert>
        }
        else if (this.state.end >= 4 && this.state.end < 5) {
            message =
                <Alert variant="danger">
                    <Alert.Heading><FontAwesomeIcon style={{ color: '#FF1E14' }} icon={faRadiationAlt} />&nbsp;Between 4 and 5 °C increase</Alert.Heading>

                </Alert>
        }
        else if (this.state.end >= 5 && this.state.end < 6) {
            message =
                <Alert variant="danger">
                    <Alert.Heading><FontAwesomeIcon style={{ color: '#FF1E14' }} icon={faRadiationAlt} />&nbsp;Between 5 and 6 °C increase</Alert.Heading>

                </Alert>
        }


        return message;
    }

    componentDidMount() {
        var container = document.getElementById("linechartdiv");

        this.setState({
            containerWidth: container.getBoundingClientRect().right - container.getBoundingClientRect().left,
            end: this.props.temperatures[this.state.tempIndex],
            endPPM: this.sumPPM(this.props.data[0][2020].map(function (c) { return c.ppm })),
            endWater: this.props.waterLevels[this.state.tempIndex]
        })
        this.createChart(container);
        var self = this;
        function OnResize() {
            self.setState({
                containerWidth: container.getBoundingClientRect().right - container.getBoundingClientRect().left
            })
        }
        window.addEventListener('resize', OnResize, false)
    }

    render() {

        return (
            <div>
                <div id="linechartdiv" style={{ height: this.state.containerWidth + 'px' }}></div>
                <div className='container mt-3' style={{ backgroundColor: '#fff0ff' }}>


                    <Row className='p-4 align-items-center'>

                        <Col md={3} className='align-self-center'>
                            <div style={{ fontSize: this.state.end > 100 - 14.9 ? 15 : 20, color: this.state.end > 2 ? 'red' : 'green' }}>
                                {this.state.end > 2 ? <FontAwesomeIcon icon={faTemperatureHigh} /> : <FontAwesomeIcon icon={faTemperatureLow} />}
                                &nbsp;
                                <CountUp start={this.state.start + 14.9} end={this.state.end + 14.9} delay={1.3 / this.props.simulationSpeed} decimals={2} suffix=" °C" />

                            </div>
                            (<CountUp start={this.state.start} end={this.state.end} delay={1.3 / this.props.simulationSpeed} decimals={2} prefix={this.state.end > 0 ? '+' : ''} />)
                        </Col>
                        <Col md={6} className='align-self-center'>
                            <div style={{ fontSize: this.state.end > 100 - 14.9 ? 15 : 20, color: this.state.end > 2 ? 'red' : 'green' }}>
                                {this.state.end > 2 ? <FontAwesomeIcon icon={faCloudSun} /> : <FontAwesomeIcon icon={faSun} />}
                                &nbsp;
                                <CountUp start={this.state.startPPM + 417.16} end={this.state.endPPM + 417.16} delay={1.3 / this.props.simulationSpeed} decimals={2} suffix=" PPM" />
                            </div>
                            (<CountUp start={this.state.startPPM} end={this.state.endPPM} delay={1.3 / this.props.simulationSpeed} decimals={2} prefix={this.state.end > 0 ? '+' : ''} />)
                        </Col>
                        <Col md={3} className='align-self-center'>
                            <div style={{ fontSize: this.state.end > 100 - 14.9 ? 15 : 20, color: this.state.end > 2 ? 'red' : 'green' }}>
                                {this.state.end > 2 ? <FontAwesomeIcon icon={faSwimmer} /> : <FontAwesomeIcon icon={faWater} />}
                                &nbsp;
                                <CountUp start={this.state.startWater} end={this.state.endWater} delay={1.3 / this.props.simulationSpeed} decimals={2} suffix=" m." />
                            </div>
                            (<CountUp start={this.state.startWater} end={this.state.endWater} delay={1.3 / this.props.simulationSpeed} decimals={2} prefix={this.state.end > 0 ? '+' : ''} />)
                        </Col>
                    </Row>
                    <Row className='p-2 text-justify'>
                        <Col>
                            {this.infoMessage()}
                        </Col>

                    </Row>


                </div>
            </div>


        )
    }
}


export default PPMLineGraph;