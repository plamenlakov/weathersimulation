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
            chartData: []
        }
    }

    componentWillUnmount(){
        if(this.chart){
            this.chart.dispose();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.data != prevProps.data) {
            this.chart.data = this.formatedData();
        }
    }

    formatedData(){
       
        let chartdata = [];
        let yearArray = [];
        let totalPPMArray = [];

        for(let yearIdentifier in this.props.data){
            yearArray.push(+Object.keys(this.props.data[yearIdentifier]))
            for(let year in this.props.data[yearIdentifier]){
                totalPPMArray.push(this.sumPPM(this.props.data[yearIdentifier][year]))
            }
            
        }

        for(let year in yearArray){
            chartdata.push({'Year': yearArray[year], 'sumPPM': totalPPMArray[year]})
        }
  
        return chartdata;
    }

    sumPPM(array) {
        var result = 0;

        array.forEach(c => {
            result += c.ppm;
        });

        return result;
    }

    createChart(){

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        let chart = am4core.create("linechartdiv", am4charts.XYChart);

        // Add data
        let chartdata = this.formatedData();
        //console.log(chartdata);
        this.setState({
            chartData: chartdata
        }, () => { chart.data = this.state.chartData })

        // Create axes
        let yearAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        yearAxis.dataFields.category = "Year";
        yearAxis.title.text = "Year";

        // Create value axis
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "[font-style: italic]CO2 emissions in PPM[/]";

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "sumPPM";
        series.dataFields.categoryX = "Year";
        series.strokeWidth = 3;
        series.tooltipText = "{valueY.value}";
        series.fillOpacity = 0.1;

        // Create a range to change stroke for values below 0
        let range = valueAxis.createSeriesRange(series);
        range.value = 0;
        range.endValue = -100000;
        range.contents.stroke = chart.colors.getIndex(4);
        range.contents.fill = range.contents.stroke;
        range.contents.strokeOpacity = 0.7;
        range.contents.fillOpacity = 0.1;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = yearAxis;
        chart.scrollbarX = new am4core.Scrollbar();

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

    
        this.chart = chart;
    }

    componentDidMount() {
        this.createChart();
    }

    render() {
        
        return (
            <div id="linechartdiv" style={{ height: 500 + 'px' }}></div>
        )
    }
}


export default PPMLineGraph;