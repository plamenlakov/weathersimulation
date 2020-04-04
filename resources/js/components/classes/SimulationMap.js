import Country from './Country';
import * as d3 from 'd3';

class Simulation {

    constructor(){
        this.countries = [];
    }

    set countries(v) {
        this._countries = v;
    }
    get countries(){
        return this._countries;
    }
    loadCountries(path){
        var self = this;
        var readCsv = d3.csv(path, function(data){
            var country = new Country(data.name, Number(data.area), Number(data.ppm),Number(data.population), Number(data.population_growth), Number(data.forests_percentage),Number(data.forests_growth));
            self.countries.push(country);
        })
        return readCsv;
    }

    makeSimulation(inputPopulation, inputDeforestation){
        console.log(this.countries[0]);
        this.countries.forEach(c => {
            c.forestAreaChange(inputPopulation, inputDeforestation);
        });
        console.log(this.countries[0]);
    }


}

export default Simulation;
