import React from 'react';
import { csv } from "d3";
import { Chart } from "react-google-charts";
import Spinner from 'react-bootstrap/Spinner';
// class PPMLineGraph extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {

//         }

//     }

//     render() {
//         return(
//             <div>

//             </div>
//         );
//     }
// }


function PPMLineGraph() {
    var final_data = [];
    var PPMs = [];
    var Years = [];
    var thisData = [["Years", "PPM"]];
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

                //Filter rows only for UK
                data.forEach(row => {
                    let isEUCountry = EU_COUNTRIES.some(eu => eu.toUpperCase() == row.Country);
                    if (row.Year >= "1980" && row.Country == "UNITED KINGDOM") {
                        row.Total = +row.Total;
                        row.Country = row.Country;
                        final_data.push([row.Total, row.Country, row.Year]);
                    }

                });

                //Sort data on year (starting from the smallest)
                final_data.sort(function (a, b) { return a[2] - b[2] });

                PPMs = final_data.map(function (value, i) { return +value[0] });
                Years = final_data.map(function (value, i) { return +value[2] });

                for (let i = 0; i < PPMs.length; i++) {
                    thisData.push([Years[i], PPMs[i]]);
                }

            });

        setTimeout(function () { }, 200)


    });

    return (
        <div>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="LineChart"
                loader={<h4>Loading graph<Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></h4>}
                data={thisData}
                options={{
                    legend: { position: 'bottom' },
                    backgroundColor:'#fff0ff',                  
                    title: 'PPM emission per year',  
                              
                    hAxis: {
                        title: 'Year',
                        format: '####'
                    },
                    vAxis: {
                        title: 'CO2 emissions in cubic tonnes',
                        format: 'short'
                    },

                    
                }
            }
            rootProps={{ 'data-testid': '4' }}
            />
        </div >
    )
}


export default PPMLineGraph;