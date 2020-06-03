import Country from "./Country";
import * as d3 from 'd3';
import Electricity from './ConcreteSectors/Electricity';
import Building from './ConcreteSectors/Building';
import Transportation from './ConcreteSectors/Transportation';
import Agriculture from './ConcreteSectors/Agriculture';
import Manufacturing from './ConcreteSectors/Manufacturing';
import Industry from './ConcreteSectors/Industry';
import React from 'react';

class Simulation extends React.Component {


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

    set hasPandemic(v) {
        this._hasPandemic = v;
    }

    get hasPandemic() {
        return this._hasPandemic;
    }

    loadCountries(path) {
        this.initialCountries = [];
        var self = this;
        this.hasPandemic = false;
        var readCSV = d3.csv(path, function (data) {
        
            var sectors = [];
            sectors.push(
                new Electricity('Electricity', +data.electricity_value, +data.electricity_change),
                new Transportation('Transportation', +data.transportation_value, +data.transportation_change),
                new Building('Building', +data.building_value, +data.building_change),
                new Manufacturing('Manufacturing', +data.manufacturing_value, +data.manufacturing_change),
                new Industry('Industry', +data.industry_value, +data.industry_change),
                new Agriculture('Agriculture', +data.agriculture_value, +data.agriculture_change)
            );

            var country = new Country(data.name, Number(data.area), Number(data.ppm), Number(data.population),
                Number(data.population_change), Number(data.forestry_percentage), Number(data.forestry_change), sectors);

            self.initialCountries.push(country);
        });

        return readCSV;
    }

    resumeFromCurrentState(data, year, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
        inputIndustry, inputAgriculture) {
        this.temperatureIncrease = [];
        var result = [];
        var yearStopped = +Object.keys(data);
        var copyArray = data[yearStopped].map((obj) => obj.cloneObject());


        for (let index = yearStopped; index <= year; index++) {
            var countriesInThisYear = copyArray.map((obj) => obj.cloneObject());
            this.temperatureIncrease.push(Math.round(this.getTemperatureIncrease(countriesInThisYear) * 1000) / 1000);
            result.push({ [index]: countriesInThisYear })
            if (index !== year) {
                if (this.hasPandemic) {
                    this.updateCountries(copyArray, inputPopulation + 0.1, inputDeforestation - 0.1, inputElectricity + 0.6, inputTransportation - 5, inputBuilding, inputManufacturing - 2.5, inputIndustry - 2, inputAgriculture + 0.5)
                } else {
                    this.updateCountries(copyArray, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                        inputIndustry, inputAgriculture)
                }
            }

        }

        return result;
    }

    getPPMOverall(year, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
        inputIndustry, inputAgriculture) {
        this.temperatureIncrease = [];
        let result = [];
        let copyArray = this.initialCountries.map((obj) => obj.cloneObject());

        for (let index = 2020; index <= year; index++) {
            var countriesInThisYear = copyArray.map((obj) => obj.cloneObject())
            this.temperatureIncrease.push(Math.round(this.getTemperatureIncrease(countriesInThisYear) * 1000) / 1000);
            result.push({ [index]: countriesInThisYear })
            if (index !== year) {
                if (this.hasPandemic) {
                    this.updateCountries(copyArray, inputPopulation + 0.1, inputDeforestation - 0.1, inputElectricity + 0.6, inputTransportation - 12, inputBuilding, inputManufacturing - 2.5, inputIndustry - 10, inputAgriculture + 0.5)
                } else {
                    this.updateCountries(copyArray, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                        inputIndustry, inputAgriculture)
                }
            }

        }

        return result;

    }

    playExistingSimulation(replayValues){
        this.temperatureIncrease = [];
        let result = [];
        //console.log(replayValues)
        var startCountries = replayValues[0][2020][1];
        var usableCountries = [];
        var usableSectors = [];
        
        for(let c in startCountries){

            usableSectors.push(new Electricity(startCountries[c]._sectors[0]._name,startCountries[c]._sectors[0]._value, startCountries[c]._sectors[0].forestry_percentage));
            usableSectors.push(new Transportation(startCountries[c]._sectors[1]._name,startCountries[c]._sectors[1]._value, startCountries[c]._sectors[1].forestry_percentage));
            usableSectors.push(new Building(startCountries[c]._sectors[2]._name,startCountries[c]._sectors[2]._value, startCountries[c]._sectors[2].forestry_percentage));
            usableSectors.push(new Manufacturing(startCountries[c]._sectors[3]._name,startCountries[c]._sectors[3]._value, startCountries[c]._sectors[3].forestry_percentage));
            usableSectors.push(new Industry(startCountries[c]._sectors[4]._name,startCountries[c]._sectors[4]._value, startCountries[c]._sectors[4].forestry_percentage));
            usableSectors.push(new Agriculture(startCountries[c]._sectors[5]._name,startCountries[c]._sectors[5]._value, startCountries[c]._sectors[5].forestry_percentage));

            usableCountries.push(new Country(startCountries[c]._name, +startCountries[c]._size, +startCountries[c]._ppm, +startCountries[c]._population, +startCountries[c]._populationGrowth, +startCountries[c]._forests, +startCountries[c]._forestsGrowth, usableSectors));
            usableSectors = [];

        }

        var startMainInputs = replayValues[0][2020][0];
        var lastInputYear = replayValues[replayValues.length - 1][+Object.keys(replayValues[replayValues.length - 1])][2];
        //console.log(usableCountries[0].getProductionCO2())
        for(let i = 2020; i <= lastInputYear; i++){
            var countriesInThisYear = usableCountries.map((obj) => obj.cloneObject());
            this.temperatureIncrease.push(Math.round(this.getTemperatureIncrease(countriesInThisYear) * 1000) / 1000);
            result.push({ [i]: countriesInThisYear })

            if(i != lastInputYear){
 
                this.updateCountries(usableCountries, 0, +startMainInputs[0], +startMainInputs[1], +startMainInputs[2], +startMainInputs[3], +startMainInputs[4], +startMainInputs[5], +startMainInputs[6])
            }
        }
        console.log(result)
      return result

    }

    getWaterLevels(tempArray) {
        var waterLevels = [];

        tempArray.forEach(t => {
            waterLevels.push(Math.round((t * 0.5) * 1000) / 1000)
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
