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

    set pandemic(v) {
        this._pandemic = v;
    }

    get pandemic() {
        return this._pandemic;
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

        //this.temperatureIncrease = [];
        var result = [];
        var yearStopped = +Object.keys(data);
        var copyArray = data[yearStopped].map((obj) => obj.cloneObject());


        for (let index = yearStopped; index <= year; index++) {
            var countriesInThisYear = copyArray.map((obj) => obj.cloneObject());
            this.temperatureIncrease.push(Math.round(this.getTemperatureIncrease(countriesInThisYear) * 1000) / 1000);
            result.push({ [index]: countriesInThisYear })
            if (index !== year) {

                this.updateCountries(copyArray, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                    inputIndustry, inputAgriculture);
                    this.updateCountriesWithPandemic(copyArray);

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

                this.updateCountries(copyArray, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                    inputIndustry, inputAgriculture);

                this.updateCountriesWithPandemic(copyArray);



            }

        }

        return result;

    }

    playExistingSimulation(replayValues) {
        this.temperatureIncrease = [];
        let result = [];
        var change = 0;
        var usableCountries = this.formatReplayCountries(replayValues, change);
        var lastInputYear = replayValues[replayValues.length - 1][+Object.keys(replayValues[replayValues.length - 1])][2];

        for (let i = 2020; i <= lastInputYear; i++) {

            if (replayValues[change + 1] != null) {
                if (i == +Object.keys(replayValues[change + 1])) {
                    change++;
                    usableCountries = this.formatReplayCountries(replayValues, change);
                }
            }

            var countriesInThisYear = usableCountries.map((obj) => obj.cloneObject());
            this.temperatureIncrease.push(Math.round(this.getTemperatureIncrease(countriesInThisYear) * 1000) / 1000);
            result.push({ [i]: countriesInThisYear });

            if (i != lastInputYear) {

                this.updateCountries(usableCountries, 0, +this.formatMainInputs(replayValues, change)[0], +this.formatMainInputs(replayValues, change)[1], +this.formatMainInputs(replayValues, change)[2], +this.formatMainInputs(replayValues, change)[3], +this.formatMainInputs(replayValues, change)[4], +this.formatMainInputs(replayValues, change)[5], +this.formatMainInputs(replayValues, change)[6])
            }
        }

        return result;

    }

    formatMainInputs(replayValues, change) {
        return replayValues[change][+Object.keys(replayValues[change])][0];
    }

    formatReplayCountries(replayValues, change) {
        var startCountries = replayValues[change][+Object.keys(replayValues[change])][1];
        var usableCountries = [];
        var usableSectors = [];

        for (let c in startCountries) {

            usableSectors.push(new Electricity(startCountries[c]._sectors[0]._name, startCountries[c]._sectors[0]._value, startCountries[c]._sectors[0]._percentage));
            usableSectors.push(new Transportation(startCountries[c]._sectors[1]._name, startCountries[c]._sectors[1]._value, startCountries[c]._sectors[1]._percentage));
            usableSectors.push(new Building(startCountries[c]._sectors[2]._name, startCountries[c]._sectors[2]._value, startCountries[c]._sectors[2]._percentage));
            usableSectors.push(new Manufacturing(startCountries[c]._sectors[3]._name, startCountries[c]._sectors[3]._value, startCountries[c]._sectors[3]._percentage));
            usableSectors.push(new Industry(startCountries[c]._sectors[4]._name, startCountries[c]._sectors[4]._value, startCountries[c]._sectors[4]._percentage));
            usableSectors.push(new Agriculture(startCountries[c]._sectors[5]._name, startCountries[c]._sectors[5]._value, startCountries[c]._sectors[5]._percentage));

            usableCountries.push(new Country(startCountries[c]._name, +startCountries[c]._size, +startCountries[c]._ppm, +startCountries[c]._population, +startCountries[c]._populationGrowth, +startCountries[c]._forests, +startCountries[c]._forestsGrowth, usableSectors));
            usableSectors = [];

        }
        return usableCountries;
        //var startMainInputs = replayValues[change][2020][0];
    }

    getWaterLevels(tempArray) {
        var waterLevels = [];
        var level;

        tempArray.forEach(t => {
            if (t <= 0.5) {
                level = Math.round((t * 0.5) * 1000) / 1000
            }
            else if (t > 0.5 && t <= 1.8) {
                level = Math.round((t * 0.6) * 1000) / 1000
            }
            else if (t > 1.8 && t < 3) {
                level = Math.round((t * 1.3) * 1000) / 1000
            }
            else {
                level = Math.round((t * 5) * 1000) / 1000
            }

            if (level > 60) {
                level = 60 + level / (t * 10);
            }
            waterLevels.push(level)
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

    updateCountriesWithPandemic(copyArray) {
        var self = this;
        function isPandemicPassedInCountry(country) {
            for (let i = 0; i < self.pandemic.countriesInfected; i++) {
                if (self.pandemic.countriesInfected[i] == country.name) {
                    return true;
                }
            }
            return false;
        }

        if (this.hasPandemic) {
            for (let i = 0; i < copyArray.length; i++) {
                if (copyArray[i].name == this.pandemic.originCountry) {
                    if (!isPandemicPassedInCountry(copyArray[i])) {
                        copyArray[i].isInfected = true;
                        this.pandemic.countriesInfected.push(copyArray[i].name);
                        this.pandemic.originCountry = copyArray[Math.round(Math.random() * 27)].name;
                    }

                }
            }
        }
    }

    updateCountries(copyArray, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
        inputIndustry, inputAgriculture) {
        copyArray.forEach(c => {
            c.updateCurrentData(inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                inputIndustry, inputAgriculture);
        })
    }


}

export default Simulation;
