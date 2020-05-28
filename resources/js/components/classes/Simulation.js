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

        console.log(this.initialCountries[0].sectors[0].name)
        console.log(this.initialCountries[0].sectors[0].value)

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
