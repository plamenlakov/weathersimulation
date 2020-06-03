import React from 'react';
import Simulation from './classes/Simulation';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
function Comaprison() {

    var simulation = new Simulation();
    var sim1Data;
    var sim2Data;
    var chartdata = [];

    if (document.getElementById('sim1Compare').value != '' && document.getElementById('sim2Compare').value != '') {
        sim1Data = simulation.playExistingSimulation(JSON.parse(document.getElementById('sim1Compare').value))
        sim2Data = simulation.playExistingSimulation(JSON.parse(document.getElementById('sim2Compare').value))
        console.log(+Object.keys(sim1Data[0]))
        formatedData();
    }
    
    function formatedData() {

        for(let year in sim1Data){
            chartdata.push({'Year': +Object.keys(sim1Data[year]), 'PPM1': sumPPM(sim1Data[year][+Object.keys(sim1Data[year])]), 'PPM2': sumPPM(sim2Data[year][+Object.keys(sim2Data[year])])})
        }
     
    }

    function sumPPM(array) {
        var result = 0;
        array.forEach(c => {
            result += c.ppm;
        });
        
        return result;
    }
    console.log(chartdata)
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("linechartcompare", am4charts.XYChart);

        // Add data
        chart.data = chartdata;

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "PPM1";
        series.dataFields.dateX = "Year";
        series.strokeWidth = 2;
        series.minBulletDistance = 10;
        series.tooltipText = "[bold]{date.formatDate()}:[/] {PPM1}\n[bold]{previousDate.formatDate()}:[/] {PPM2}";
        series.tooltip.pointerOrientation = "vertical";

        // Create series
        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "PPM2";
        series2.dataFields.dateX = "Year";
        series2.strokeWidth = 2;
        series2.strokeDasharray = "3,4";
        series2.stroke = series.stroke;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;

    }); // end am4core.ready()

    return (
        <div>
            <div id="linechartcompare"></div>
        </div>
    );
}


export default Comaprison;

