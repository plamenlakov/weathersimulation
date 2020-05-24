import React from 'react';
import { Chart } from "react-google-charts";
import Spinner from 'react-bootstrap/Spinner';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import { sum } from 'd3';

class PPMLineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            yearIndex: 0,

            yearAxis: null,
            valueAxis: null
        }
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.data != prevProps.data) {
            if (+Object.keys(this.props.data[0]) == 2020) {
                this.state.yearAxis.max = +Object.keys(this.props.data[this.props.data.length - 1]) + 5
                this.chart.data = []
            }
            this.state.yearIndex = 0;
            this.play();
        }
    }
    play() {
        let self = this;
        var interval = setInterval(function () {
            if (self.state.yearIndex < self.props.data.length) {
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
    nextYear() {
        var self = this;
        let newData = this.formatedData(this.state.yearIndex);

        this.chart.addData(newData[0]);
        this.chart.invalidateData();
        this.state.valueAxis.max = this.chart.data[this.chart.data.length - 1].PPM * 2
        this.state.yearIndex++;
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
        //yearAxis.max = 2100
        yearAxis.interpolationDuration = 650;
        yearAxis.duration = 650;
        yearAxis.renderer.axisFills.template.disabled = true;
        yearAxis.renderer.ticks.template.disabled = true;
        yearAxis.min = 2015;
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
        series.tensionX = 0.9;


        // Create a range to change stroke for values below 0
        // let range = valueAxis.createSeriesRange(series);
        // range.value = 0;
        // range.endValue = 800;
        // range.contents.stroke = chart.colors.getIndex(4);
        // range.contents.fill = range.contents.stroke;
        // range.contents.strokeOpacity = 0.7;
        // range.contents.fillOpacity = 0.1;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();

        chart.cursor.xAxis = yearAxis;
        chart.cursor.snapToSeries = series;
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);

        chart.numberFormatter.numberFormat = "####.###";
        chart.background.fill = "#fff0ff";
        chart.paddingRight = 40;

        series.tooltip.getFillFromObject = false;
        series.tooltip.adapter.add("x", (x, target) => {
            if (series.tooltip.tooltipDataItem.valueY < 0) {
                series.tooltip.background.fill = chart.colors.getIndex(4);
            }
            else {
                series.tooltip.background.fill = chart.colors.getIndex(0);
            }
            return x;
        });

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;
        // var bullet = series.createChild(am4charts.CircleBullet);
        // bullet.circle.radius = 5;
        // bullet.fillOpacity = 1;
        // bullet.fill = chart.colors.getIndex(0);
        // bullet.isMeasured = false;

        // series.events.on("validated", function () {
        //     if (series.dataItems.last) {
        //         bullet.moveTo(series.dataItems.last.point);
        //     }
        //     else {

        //     }

        //     bullet.validatePosition();
        // });

        this.chart = chart;



    }


    componentDidMount() {
        var container = document.getElementById("linechartdiv");
        this.createChart(container);
    }

    render() {

        return (
            <div id="linechartdiv" style={{ height: 500 + 'px' }}></div>
        )
    }
}


export default PPMLineGraph;