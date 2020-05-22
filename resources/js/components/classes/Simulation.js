import Country from "./Country";
import * as d3 from 'd3';

class Simulation {


    set initialCountries(v) {
        this._initialCountries = v;
    }

    get initialCountries() {
        return this._initialCountries;
    }

    set temperatureIncrease(v) {
        this._temperatureIncrease = v;
    }

    get temperatureIncrease() {
        return this._temperatureIncrease;
    }

    loadCountries(path) {
        this.initialCountries = [];
        var self = this;
        var readCSV = d3.csv(path, function (data) {
            var country = new Country(data.name, Number(data.area), Number(data.ppm), Number(data.population),
                Number(data.population_change), Number(data.forestry_percentage), Number(data.forestry_change),
                Number(data.electricity_value), Number(data.electricity_change), Number(data.transportation_value), Number(data.transportation_change),
                Number(data.building_value), Number(data.building_change), Number(data.manufacturing_value), Number(data.manufacturing_change),
                Number(data.industry_value), Number(data.industry_change), Number(data.agriculture_value), Number(data.agriculture_change));
            self.initialCountries.push(country);
        });
        this.temperatureIncrease = [];
        return readCSV;
    }

    resumeFromCurrentState(data, year, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
        inputIndustry, inputAgriculture) {

        var result = [];
        var yearStopped =  +Object.keys(data)
        var copyArray = data[yearStopped].map((obj) => obj.cloneObject())
        
        for (let index = yearStopped; index <= year; index++) {
           
            result.push({ [index]: copyArray.map((obj) => obj.cloneObject()) })
            if (index !== year) {
                this.updateCountries(copyArray, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                    inputIndustry, inputAgriculture)
            }  
           
        }

        return result;
    }

    getPPMOverall(year, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
        inputIndustry, inputAgriculture) {
        let result = [];
        let copyArray = this.initialCountries.map((obj) => obj.cloneObject());

        for (let index = 2020; index <= year; index++) {
            var countriesInThisYear = copyArray.map((obj) => obj.cloneObject())
            this.temperatureIncrease.push(Math.round(this.getTemperatureIncrease(countriesInThisYear) * 1000) / 1000);
            result.push({ [index]: countriesInThisYear})
            if (index !== year) {
                this.updateCountries(copyArray, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                    inputIndustry, inputAgriculture)
            }  
           
        }
        //this.getWaterLevels(this.temperatureIncrease)
        return result;

    }

    getWaterLevels(tempArray){
        var waterLevels = [];

        tempArray.forEach(t => {
            waterLevels.push(Math.round((t * 0.1) * 1000) / 1000)
        })
        return waterLevels;
    }

    getTemperatureIncrease(copyArray) {
        var temperatureIncrease = 0;

        copyArray.forEach(c => {
            temperatureIncrease += c.ppm;
        });

        return temperatureIncrease * 0.01;
    }

  async updateCountries(copyArray, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
        inputIndustry, inputAgriculture) {
        copyArray.forEach(c => {
            c.updateCurrentData(inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                inputIndustry, inputAgriculture);
        })
    }


}

export default Simulation;
