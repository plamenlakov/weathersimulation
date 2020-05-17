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
            currentYear: 2020
        }
    }
    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data != this.props.data) {

            let self = this;
            this.setState({
                chartData: this.getData(this.props.data.length - 1)
            }, () => { this.chart.data = this.state.chartData })
            // let i = 0;
            // function Animate() {
            //     setTimeout(function () {
            //         self.setState({
            //             chartData: self.getData(i)
            //         }, () => { self.chart.clearCache(); self.chart.data = self.state.chartData; });
                    
            //         i++;
            //         if (i < self.props.data.length) {
            //             Animate();
            //         }
            //     }, 2000)
            // }
            // Animate();

        }

    }


    getData(year) {

        let chartdata = [];
        let countryNames = [];
        let countryPPMs = [];
        

        this.state.currentYear = Object.keys(this.props.data[year]);
        let yearData = this.props.data[year];
        for (var country in yearData) {
            let countryData = yearData[country];
            countryNames = countryData.map(c => c["country"]);
            countryPPMs = countryData.map(c => c['PPM']);
            this.state.maxPPMvalue = Math.max(...countryPPMs);
        }

        for (let i = 0; i < countryNames.length || i < countryPPMs.length; i++) {
            chartdata.push({ "country": countryNames[i], "PPM": countryPPMs[i] });
        }
        
        return chartdata;

    }

    componentDidMount() {
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("chartdiv", am4charts.XYChart);
        this.setState({
            chartData: this.getData(0)
        }, () => { chart.data = this.state.chartData })

        // X axis - value one
        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        //let maxPPMvalue = Math.max(...this.getData().map(d => d['PPM']));
        valueAxis.extraMax = this.state.maxPPMvalue / 4;

        // Y axis - category one
        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.minGridDistance = 2;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;

        //series creation (x,y values)
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = "PPM";
        series.dataFields.categoryY = "country";
        series.tooltipText = "{categoryY.value}"
        series.columns.template.column.cornerRadiusTopRight = 5;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        // series.interpolationDuration = 2000;
        // series.interpolationEasing = am4core.ease.linear;

        // chart label bullets after each bar
        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.verticalCenter = "bottom";
        labelBullet.label.dy = 10;
        labelBullet.label.dx = 35;
        labelBullet.label.text = "{values.valueX.workingValue}";

        //chart styling
        chart.zoomOutButton.disabled = true;
        chart.scrollbarX = new am4core.Scrollbar();
        chart.background.fill = "#fff0ff";
        chart.responsive.enabled = true;
        chart.numberFormatter.numberFormat = "#####.###";
        chart.paddingRight = 50; 
        chart.title = this.state.currentYear;

        var label = chart.plotContainer.createChild(am4core.Label);
        label.x = am4core.percent(97);
        label.y = am4core.percent(95);
        label.horizontalCenter = "right";
        label.verticalCenter = "middle";
        label.dx = -15;
        label.fontSize = 50;
        label.text = this.state.currentYear;

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });

        categoryAxis.sortBySeries = series;
        this.chart = chart;
    }


    render() {
        return (
            <div id="chartdiv" style={{ height: 800 + 'px' }}></div>
        );
    }
}
export default BarChart;