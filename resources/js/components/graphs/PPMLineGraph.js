import React from 'react';
import { Chart } from "react-google-charts";
import Spinner from 'react-bootstrap/Spinner';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class PPMLineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: []
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.data != prevProps.data) {
            this.setState({
                chartData: this.props.data
            }, () => { this.chart.data = this.state.chartData })
        }
    }

    componentDidMount() {

        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        let chart = am4core.create("linechartdiv", am4charts.XYChart);

        // Add data
        let chartdata = this.props.data.map(d => d['Year']);
        //console.log(chartdata);
        this.setState({
            chartData: chartdata
        }, () => { chart.data = this.state.chartData })

        // function generatechartData() {
        //     let chartData = [];
        //     let firstDate = new Date();
        //     firstDate.setDate(firstDate.getDate() - 150);
        //     let visits = -40;
        //     let b = 0.6;
        //     for (var i = 0; i < 150; i++) {
        //         // we create date objects here. In your data, you can have date strings
        //         // and then set format of your dates using chart.dataDateFormat property,
        //         // however when possible, use date objects, as this will speed up chart rendering.
        //         let newDate = new Date(firstDate);
        //         newDate.setDate(newDate.getDate() + i);
        //         if (i > 80) {
        //             b = 0.4;
        //         }
        //         visits += Math.round((Math.random() < b ? 1 : -1) * Math.random() * 10);

        //         chartData.push({
        //             date: newDate,
        //             visits: visits
        //         });
        //     }
        //     return chartData;
        // }

        // Create axes
        let yearAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        yearAxis.dataFields.category = "Year";
        yearAxis.title.text = "Year";
        //yearAxis.dataFields.category = "Year";

        //yearAxis.startLocation = 0.5;
        //yearAxis.endLocation = 0.5;

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

    // options() {
    //     return (
    //         {
    //             legend: {position: 'bottom'},
    //             backgroundColor: '#fff0ff',
    //             title: 'PPM emission per year',

    //             hAxis: {
    //                 title: 'Year',
    //                 format: '####'
    //             },
    //             vAxis: {
    //                 title: 'CO2 emissions in cubic tonnes',
    //                 format: 'short'
    //             },
    //         }
    //     )
    // }

    render() {
        return (
            <div id="linechartdiv" style={{ height: 500 + 'px' }}></div>
            // <div>
            //     <Chart
            //         width={'100%'}
            //         height={'500px'}
            //         chartType="AreaChart"
            //         loader={<h3 className="text-center justify-content-center align-self-center">Loading graph<Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></h3>}
            //         data={this.props.data}
            //         options={this.options()}
            //         rootProps={{'data-testid': '4'}}
            //     />
            // </div>
        )
    }
}


export default PPMLineGraph;