import React from 'react';
import { Chart } from "react-google-charts";
import Spinner from 'react-bootstrap/Spinner';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { sum } from 'd3';

class PPMLineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            yearIndex: 0,


        }
    }

    componentWillUnmount(){
        if(this.chart){
            this.chart.dispose();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.data != prevProps.data) {
            this.state.yearIndex = 0;
            // this.chart.data = this.formatedData(this.state.yearIndex);
            this.play();
        }
    }
    play(){
        let self = this;

        var interval = setInterval(function () {
            if (self.state.yearIndex < self.props.data.length) {
                if (self.props.paused) {
                    clearInterval(interval);
                } else {
                    self.nextYear();
                }
            }
                clearInterval(interval);
        }, 1300)


    }
    nextYear(){
        let newData = this.formatedData(this.state.yearIndex);

        for (let i = 0; i < this.chart.data.length; i++) {
            this.chart.data[i].PPM = newData[i].PPM
        }
        this.chart.invalidateRawData();
        this.state.yearIndex++;
    }

    formatedData(yearIndex){
       
        let chartdata = [];
        let currentYear;
        let totalPPMYear;

        let yearData = this.props.data[yearIndex];

        // for(let yearIdentifier in yearData){
        //     yearArray.push(+Object.keys(this.props.data[yearIdentifier]))
        //     for(let year in this.props.data[yearIdentifier]){
        //         totalPPMArray.push(this.sumPPM(this.props.data[yearIdentifier][year]))
        //     }
        //
        // }
        currentYear = +Object.keys(yearData);
        totalPPMYear = (this.sumPPM(yearData));

        chartdata.push({'Year': currentYear, 'sumPPM': totalPPMYear})
        // for(let year in yearArray){
        //     chartdata.push({'Year': yearArray[year], 'sumPPM': totalPPMArray[year]})
        // }
        // console.log(chartdata)
        return chartdata;
    }

    sumPPM(array) {
        var result = 0;
        console.log(array);
        for (let i = 0; i < array.length; i++){
            result += array[i].ppm
        }
        // array.forEach(c => {
        //         //     result += c.ppm;
        //         // });

        return result;
    }

    createChart(container){

        // Themes begin
        am4core.useTheme(am4themes_animated);        // Themes end

        // Create chart instance
        let chart = am4core.create(container, am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0;
        chart.padding(0, 0, 0, 0);
        chart.zoomOutButton.disabled = true;

        // Add data
        chart.data = this.formatedData(0);
        //console.log(chartdata);

        // this.setState({
        //     chartData: chartdata
        // }, () => { chart.data = this.state.chartData })

        // Create axes
        let yearAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        yearAxis.renderer.grid.template.location = 0;
        yearAxis.renderer.minGridDistance = 30;
        yearAxis.dataFields.category = "Year";
        yearAxis.title.text = "Year";
        yearAxis.renderer.inside = true;
        yearAxis.renderer.axisFills.template.disabled = true;
        yearAxis.renderer.ticks.template.disabled = true;

        // Create value axis
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "[font-style: italic]CO2 emissions in PPM[/]";
        valueAxis.tooltip.disabled = true;
        valueAxis.interpolationDuration = 500;
        valueAxis.rangeChangeDuration = 500;
        valueAxis.renderer.inside = true;
        valueAxis.renderer.minLabelPosition = 0.05;
        valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "sumPPM";
        series.dataFields.categoryX = "Year";
        series.interpolationDuration = 500;
        series.defaultState.transitionDuration = 0;
        series.tensionX = 0.8;

        chart.events.on("datavalidated", function () {
            yearAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
        });

        yearAxis.interpolationDuration = 500;
        yearAxis.rangeChangeDuration = 500;
        // Create a range to change stroke for values below 0
        // let range = valueAxis.createSeriesRange(series);
        // range.value = 0;
        // range.endValue = -100000;
        // range.contents.stroke = chart.colors.getIndex(4);
        // range.contents.fill = range.contents.stroke;
        // range.contents.strokeOpacity = 0.7;
        // range.contents.fillOpacity = 0.1;
        //
        // // Add cursor
        // chart.cursor = new am4charts.XYCursor();
        // chart.cursor.xAxis = yearAxis;
        // chart.scrollbarX = new am4core.Scrollbar();
        //
        // chart.numberFormatter.numberFormat = "####.###";
        // chart.background.fill = "#fff0ff";
        // chart.paddingRight = 40;

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

    
        this.chart = chart;
    }

    componentDidMount() {
        var container = document.getElementById("chartdiv");
        this.createChart(container);
    }

    render() {
        
        return (
            <div id="chartdiv" style={{ height: 500 + 'px' }}></div>
        )
    }
}


export default PPMLineGraph;