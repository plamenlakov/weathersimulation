import React from 'react';
import Simulation from './classes/Simulation';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Button from 'react-bootstrap/Button'
class Comaprison extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLineChart: false
        }

    }

    createChart(container) {
        var simulation = new Simulation();
        var sim1Data;
        var sim2Data;
        //var chartdata = [];

        if (document.getElementById('sim1Compare').value != '' && document.getElementById('sim2Compare').value != '') {
            sim1Data = simulation.playExistingSimulation(JSON.parse(document.getElementById('sim1Compare').value))
            sim2Data = simulation.playExistingSimulation(JSON.parse(document.getElementById('sim2Compare').value))

            //formatData();

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            let chart = am4core.create(container, am4charts.XYChart);

            // Add data
            chart.data = formatData();

            // Create axes
            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.renderer.minGridDistance = 50;
            categoryAxis.dataFields.category = "Year";
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.numberFormatter.numberFormat = '###,###';

            // Create series
            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "PPM1";
            series.dataFields.categoryX = "Year";
            series.strokeWidth = 2;
            series.name = document.getElementById('sim1CompareName').value;
            series.minBulletDistance = 10;
            series.tooltipText = "[bold]{sim1Name}:[/] {PPM1}";
            series.tooltip.pointerOrientation = "vertical";
            series.numberFormatter.numberFormat = '###,###.###'
            series.minBulletDistance = 35;
            // Create series 2
            let series2 = chart.series.push(new am4charts.LineSeries());
            series2.dataFields.valueY = "PPM2";
            series2.dataFields.categoryX = "Year";
            series2.strokeWidth = 2;
            series2.name = document.getElementById('sim2CompareName').value;
            series2.strokeDasharray = "3,4";
            series2.stroke = series.stroke;
            series2.tooltipText = "[bold]{sim2Name}:[/] {PPM2}";
            series2.numberFormatter.numberFormat = '###,###.###'
            series2.minBulletDistance = 35;
            // Add cursor
            chart.cursor = new am4charts.XYCursor();

            //Add legend
            chart.legend = new am4charts.Legend();

            chart.cursor.xAxis = categoryAxis;
            chart.numberFormatter.numberFormat = "###.###";

            //Bullets
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.strokeWidth = 2;
            bullet.circle.radius = 4;
            bullet.circle.fill = am4core.color("#fff");

            var bullethover = bullet.states.create("hover");
            bullethover.properties.scale = 1.3;

            var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
            bullet2.circle.strokeWidth = 0;
            bullet2.circle.radius = 3;
            bullet2.circle.fill = am4core.color("#333");

            var bullethover2 = bullet2.states.create("hover");
            bullethover2.properties.scale = 1.3;

            this.chart = chart;
            chart.background.fill = "#fff0ff";
            this.setState({ hasLineChart: true })
        }



        function formatData() {
            var chartdata = [];

            if (sim1Data.length >= sim2Data.length) {

                for (let year in sim1Data) {
                    chartdata.push({
                        'Year': +Object.keys(sim1Data[year]),
                        'PPM1': sumPPM(sim1Data[year][+Object.keys(sim1Data[year])]),
                        //'PPM2': sumPPM(sim2Data[year][+Object.keys(sim2Data[year])]),
                        'sim1Name': document.getElementById('sim1CompareName').value,
                        'sim2Name': document.getElementById('sim2CompareName').value
                    });

                    if (sim2Data[year] != null) {
                        chartdata[year].PPM2 = sumPPM(sim2Data[year][+Object.keys(sim2Data[year])])
                    } else {
                        chartdata[year].PPM2 = null;
                    }
                }
            }
            else {
                for (let year in sim2Data) {
                    chartdata.push({
                        'Year': +Object.keys(sim2Data[year]),
                        //'PPM1': sumPPM(sim1Data[year][+Object.keys(sim1Data[year])]),
                        'PPM2': sumPPM(sim2Data[year][+Object.keys(sim2Data[year])]),
                        'sim1Name': document.getElementById('sim1CompareName').value,
                        'sim2Name': document.getElementById('sim2CompareName').value
                    });

                    if (sim1Data[year] != null) {
                        chartdata[year].PPM1 = sumPPM(sim1Data[year][+Object.keys(sim1Data[year])])
                    } else {
                        chartdata[year].PPM1 = null;
                    }
                }
            }

            return chartdata;

        }

        function sumPPM(array) {
            var result = 0;
            array.forEach(c => {
                result += c.ppm;
            });

            return result;
        }


    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    componentDidMount() {
        let container = document.getElementById('linechartcompare');

        this.createChart(container);

    }

    clearComparison() {
        this.setState({ hasLineChart: false })
    }

    render() {

        return (

            <div style={{ display: this.state.hasLineChart ? 'initial' : 'none' }}>
                <div id="linechartcompare" style={{ height: 500 + 'px' }}></div>
                <Button variant="primary" size="lg" block onClick={this.clearComparison.bind(this)}>
                    Clear comparison
                </Button>
            </div>
        );
    }


}


export default Comaprison;

