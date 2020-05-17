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
            var country = new Country(data.name, Number(data.area), Number(data.ppm), Number(data.population),
                Number(data.population_change), Number(data.forestry_percentage), Number(data.forestry_change),
                Number(data.electricity_value), Number(data.electricity_change), Number(data.transportation_value), Number(data.transportation_change),
                Number(data.building_value), Number(data.building_change), Number(data.manufacturing_value), Number(data.manufacturing_change),
                Number(data.industry_value), Number(data.industry_change), Number(data.agriculture_value), Number(data.agriculture_change));
            self.initialCountries.push(country);
        });
        console.log(this.initialCountries)
        return readCSV;
    }

    getPPMByYearByCountry(year, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                          inputIndustry, inputAgriculture) {
        let copyArray = this.initialCountries.map((obj) => obj.cloneObject());
        
        var result = [];
        for (let index = 2020; index <= year; index++) {
            let yearData = [];
            copyArray.forEach(c => {
                yearData.push({"country": c.name, "PPM": c.ppm});
            })
            result.push({ [index]: yearData })
            if (index !== year) {
                this.updateCountries(copyArray, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                    inputIndustry, inputAgriculture)
            }
        }
        return result;
    }
    
    getPPMMap(year, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
              inputIndustry, inputAgriculture) {
        let result = [];
        let copyArray = this.initialCountries.map((obj) => obj.cloneObject());

        for (let index = 2020; index <= year; index++) {           
            
            if (index === year) {
                copyArray.forEach(c => {
                    result.push(c);                   
                })
            }else{
                this.updateCountries(copyArray, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                    inputIndustry, inputAgriculture);
            }


        }
        return result;

    }


    getTotalPPMByYear(year, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                      inputIndustry, inputAgriculture){
        var result = [];
        let copyArray = this.initialCountries.map((obj) => obj.cloneObject());

        for(let index = 2020; index <= year; index++){

            result.push({"Year": index, "sumPPM": this.sumPPM(copyArray)})
            if(index !== year){
                this.updateCountries(copyArray, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                    inputIndustry, inputAgriculture);

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

    updateCountries(copyArray, inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                    inputIndustry, inputAgriculture) {
        copyArray.forEach(c => {
            c.updateCurrentData(inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                inputIndustry, inputAgriculture);
        })
    }


}

export default Simulation;
