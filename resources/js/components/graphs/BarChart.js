import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            maxPPMvalue: 0,
            currentYear: 2020,
            yearIndex: 0,

            series: null,
            value: null,
            category: null,
            label: null
        }
    }
    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data != this.props.data) {
            this.state.yearIndex = 0;
            this.sendStateToParent('Running...')
            this.play();
        }

    }

    sendDataToParent(data){
        this.props.updateCountryDataOnRunTime(data)
    }

    sendStateToParent(state){
        this.props.updateState(state);
    }

    play() {
        var self = this;

        var interval = setInterval(function () {
            if (self.state.yearIndex < self.props.data.length) {
                if(self.props.paused){
                    let dataToSend;
                    if(self.state.yearIndex > 0){
                        dataToSend = self.props.data[self.state.yearIndex - 1];
                    }else{
                        dataToSend = self.props.data[self.state.yearIndex];
                    }

                    self.sendDataToParent(dataToSend)
                    clearInterval(interval);
                }else{
                    self.nextYear();
                }
                
            }
            else {
                self.sendStateToParent('Finished')

                clearInterval(interval);
            }

        }, 1300)

    }

    nextYear() {
       
        var newData = this.formatedData(this.state.yearIndex);

        for (let i = 0; i < this.chart.data.length; i++) {
            this.chart.data[i].PPM = newData[i].PPM
            

        }

        this.state.label.text = +Object.keys(this.props.data[0]) + this.state.yearIndex
        this.chart.invalidateRawData();
        this.state.yearIndex++;

    }

    formatedData(year) {

        let chartdata = [];
        let countryNames = [];
        let countryPPMs = [];

        let yearData = this.props.data[year];

        for (var country in yearData) {
            let countryData = yearData[country];
            countryNames = countryData.map(c => c["name"]);
            countryPPMs = countryData.map(c => c['ppm']);

        }

        for (let i = 0; i < countryNames.length || i < countryPPMs.length; i++) {
            chartdata.push({ "country": countryNames[i], "PPM": countryPPMs[i] });
        }
        this.state.maxPPMvalue = Math.max(...countryPPMs);

        return chartdata;

    }

    createBarChart(container) {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create(container, am4charts.XYChart);
        chart.data = this.formatedData(0);

        // X axis - value one
        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.rangeChangeEasing = am4core.ease.linear;
        valueAxis.rangeChangeDuration = 1300;
        valueAxis.extraMax = this.state.maxPPMvalue / 4;

        // Y axis - category one
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.minGridDistance = 2;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;

        //series creation (x,y values)
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = "PPM";
        series.dataFields.categoryY = "country";
        series.tooltipText = "{categoryY.value}"
        series.columns.template.column.cornerRadiusTopRight = 5;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.interpolationDuration = 1300;
        series.interpolationEasing = am4core.ease.linear;

        // chart label bullets after each bar
        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.verticalCenter = "bottom";
        labelBullet.label.dy = 10;
        labelBullet.label.dx = 35;
        labelBullet.label.text = "{values.valueX.workingValue}";

        //chart styling
        chart.zoomOutButton.disabled = true;
        chart.scrollbarX = new am4core.Scrollbar();
        chart.background.fill = "#fff0ff";
        chart.responsive.enabled = true;
        chart.numberFormatter.numberFormat = "###,###.###";
        chart.paddingRight = 50;

        var label = chart.plotContainer.createChild(am4core.Label);
        label.x = am4core.percent(97);
        label.y = am4core.percent(95);
        label.horizontalCenter = "right";
        label.verticalCenter = "middle";
        label.dx = -15;
        label.fontSize = 50;
        label.text = this.state.currentYear;
        this.state.label = label;

        categoryAxis.sortBySeries = series;

        this.chart = chart;
        this.state.value = valueAxis;
        this.state.series = series;
        this.state.category = categoryAxis;

    }

    componentDidMount() {
        var container = document.getElementById("barchartdiv");
        this.createBarChart(container)
    }

    render() {

        //this.createBarChart(this.props.data, container)
        return (
            <>

                <div id="barchartdiv" style={{ height: 800 + 'px' }}></div>
            </>

        );
    }
}
export default BarChart;