import Country from "./Country";
import * as d3 from 'd3';

class Simulation {


    set initialCountries(v) {
        this._initialCountries = v;
    }

    get initialCountries() {
        return this._initialCountries;
    }

    loadCountries(path) {
        this.initialCountries = [];
        var self = this;
        var readCSV = d3.csv(path, function (data) {
            var country = new Country(data.name, Number(data.area), Number(data.ppm), Number(data.population), Number(data.population_growth), Number(data.forests_percentage), Number(data.forests_growth));
            self.initialCountries.push(country);
        });
        return readCSV;
    }

    getPPMByYearByCountry(year, in1, in2) {
        let copyArray = this.initialCountries.map((obj) => obj.cloneObject());
        
        var result = [];
        for (let index = 2020; index <= year; index++) {
            let yearData = [];
            copyArray.forEach(c => {
                yearData.push({"country": c.name, "PPM": c.ppm});
            })
            result.push({ [index]: yearData })
            if (index !== year) {
                this.updateCountries(copyArray, in1, in2)
            }
        }
        
        return result;
    }
    
    getPPMMap(year, inputPopulation, inputDeforestation) {
        let result = [];
        let copyArray = this.initialCountries.map((obj) => obj.cloneObject());

        for (let index = 2020; index <= year; index++) {           
            
            if (index === year) {
                copyArray.forEach(c => {
                    result.push(c);                   
                })
            }else{
                this.updateCountries(copyArray, inputPopulation, inputDeforestation);
            }


        }
        return result;

    }


    getTotalPPMByYear(year, in1, in2){
        var result = [];
        let copyArray = this.initialCountries.map((obj) => obj.cloneObject());

        for(let index = 2020; index <= year; index++){

            result.push({"Year": index, "sumPPM": this.sumPPM(copyArray)})
            if(index !== year){
                this.updateCountries(copyArray, in1, in2);

            }
        }

        return result;
    }

    sumPPM(copyArray) {
        var result = 0;
        copyArray.forEach(c => {
            result += c.ppm;
        });
        return result;
    }

    updateCountries(copyArray, in1, in2) {
        copyArray.forEach(c => {
            c.updateCurrentData(in1, in2);
        })
    }


}

export default Simulation;
