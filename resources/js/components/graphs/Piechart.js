/* eslint-disable no-undef */

import React from 'react';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { csv } from "d3";
import { Chart } from "react-google-charts";
import Spinner from 'react-bootstrap/Spinner';

function Piechart() {
    var final_data = [["Country", "Total emissions"]]
    document.addEventListener('DOMContentLoaded', function (e) {
        
        const EU_COUNTRIES = [
            'Austria',
            'Belgium',
            'Bulgaria',
            'Croatia',
            'Cyprus',
            'CZECHOSLOVAKIA',
            'Denmark',
            'Estonia',
            'Finland',
            'France',
            'Germany',
            'Greece',
            'Hungary',
            'Ireland',
            'Italy',
            'Latvia',
            'Lithuania',
            'Luxembourg',
            'Malta',
            'Netherlands',
            'Poland',
            'Portugal',
            'Romania',
            'Slovenia',
            'Spain',
            'Sweden',
            'United Kingdom',]


        csv("https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_csv/data/0f04181960a0a896ebaf6d8afb0b71a6/fossil-fuel-co2-emissions-by-nation_csv.csv")
            .then(function (data) {
                data.forEach(row => {
                    let isEUCountry = EU_COUNTRIES.some(eu => eu.toUpperCase() == row.Country);
                    if (row.Year == "2014" && isEUCountry) {
                        row.Total = +row.Total;
                        row.Country = row.Country;
                        final_data.push([row.Country, row.Total]);

                    }
                })

                final_data.sort(function(a, b){return b[0] - a[0]});

                console.log(final_data);

            });
    });

    return (
        <div>

            <Chart
                width={'100%'}
                height={'500px'}
                chartType="PieChart"
                loader={<h4>Loading graph<Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></h4>}
                data={final_data}
                options={{
                    title: 'CO2 emissions per country',
                    backgroundColor:'#fff0ff',
                    pieHole: 0.4,
                    sliceVisibilityThreshold: 0.02,
                    pieSliceText: 'label',
                    legend: { position: 'bottom' },
                    animation: {
                        duration: 1200,
                        easing: 'out',
                        startup: true
                    }
                }}
                rootProps={{ 'data-testid': '3' }}
            />
        </div>
    );
}
export default Piechart;