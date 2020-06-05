import Electricity from './ConcreteSectors/Electricity';
import Building from './ConcreteSectors/Building';
import Transportation from './ConcreteSectors/Transportation';
import Agriculture from './ConcreteSectors/Agriculture';
import Manufacturing from './ConcreteSectors/Manufacturing';
import Industry from './ConcreteSectors/Industry';

class Country {
    constructor(name, area, ppm, population, populationGrowth, forests, forestsGrowth, sectors) {

        this.name = name;
        this.area = area;
        this.ppm = ppm;
        this.population = population;
        this.populationGrowth = populationGrowth;
        this.forests = forests;
        this.forestsGrowth = forestsGrowth;
        this.sectors = sectors;
    }

    //NAME
    set name(v) {
        this._name = v;
    }

    get name() {
        return this._name;
    }

    //AREA
    set area(v) {
        this._size = v;
    }

    get area() {
        return this._size;
    }

    //PPM
    set ppm(v) {
        this._ppm = v;
    }

    get ppm() {
        return this._ppm;
    }

    //POPULATION
    set population(v) {
        this._population = v;
    }

    get population() {
        return this._population;
    }

    //POPULATION GROWTH
    set populationGrowth(v) {
        this._populationGrowth = v;
    }

    get populationGrowth() {
        return this._populationGrowth;
    }

    //FORESTRY
    set forests(v) {
        this._forests = v;
    }

    get forests() {
        return this._forests;
    }

    //FORESTRY GROWTH
    set forestsGrowth(v) {
        this._forestsGrowth = v;
    }

    get forestsGrowth() {
        return this._forestsGrowth;
    }

    set sectors(v) {
        this._sectors = v;
    }

    get sectors() {
        return this._sectors;
    }

    getForestArea() {
        var result = (this.forests / 100) * this.area;
        return result;
    }

    getProductionCO2() {
        var result = 0;
        for(let i in this.sectors){
            result += this.sectors[i].value
        }
        return result;
    }


    cloneObject() {
        const { name, area, ppm, population, populationGrowth, forests, forestsGrowth, sectors } = this;
        var country = new Country(name, area, ppm, population, populationGrowth, forests, forestsGrowth, sectors.map((obj) => obj.cloneObject()));
        return country;
    }

    //Calculate how much the forest has changed for this country and returns forest area in km2
    forestAreaChange(inputPopulation, inputDeforestation) {
        var forestsKm2;
        var deforestationByPopulation_pct = (this.populationGrowth + inputPopulation) * 2.7;
        if (deforestationByPopulation_pct >= 0) {
            forestsKm2 = this.getForestArea() + this.getForestArea() * ((this.forestsGrowth -
                deforestationByPopulation_pct - inputDeforestation) / 100);
            this.forests = Math.round(((forestsKm2 / this.area) * 100) * 1000) / 1000;
            //this.getForestArea();
            if (this.forests < 0) {
                this.forests = 0;
            }
            if (this.forests > 100) {
                this.forests = 100;
            }
        } else {
            forestsKm2 = this.getForestArea() + this.getForestArea() * ((this.forestsGrowth - inputDeforestation) / 100);
            this.forests = Math.round(((forestsKm2 / this.area) * 100) * 1000) / 1000;
            if (this.forests < 0) {
                this.forests = 0;
            }
            if (this.forests > 100) {
                this.forests = 100;
            }
        }

    }

    //Calculate how much CO2 emissions were cleaned by this country
    cleanedCO2() {
        var cleanedCO2Tonnes = ((this.getForestArea() * 65000) * 22) / 1000;
        return cleanedCO2Tonnes;
    }

    //Calculate the population per Country
    populationChange(inputPopulation) {
        var populationChanged = this.population + (this.population * ((this.populationGrowth + inputPopulation) / 100));
        this.population = Math.round(populationChanged);
    }

    //Calculate the produced CO2 emissions by the population per country
    CO2ProductionPopulation() {
        var producedCO2 = this.population * 0.39;
        return producedCO2;
    }

    //Calculate the difference between the produced and the cleaned CO2 and see how the overall ppm changes
    PPMChange() {
        var ppmChange = ((this.getProductionCO2() + this.CO2ProductionPopulation()) - this.cleanedCO2()) / (7500000000 * 2);
        this.ppm = Math.round((this.ppm + ppmChange) * 10000) / 10000;
        if(this.ppm > 10000){
            this.ppm = 10000;
        }
        // if (this.ppm < 0) {
        //     this.ppm = (this.CO2ProductionPopulation() - this.cleanedCO2()) / (7500000000 * 2);
        // }

    }

   updateCurrentData(inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
        inputIndustry, inputAgriculture) {

        var electricity = this.sectors.find(el => el instanceof Electricity);
        var transportation = this.sectors.find(el => el instanceof Transportation);
        var building = this.sectors.find(el => el instanceof Building);
        var manufacturing = this.sectors.find(el => el instanceof Manufacturing);
        var industry = this.sectors.find(el => el instanceof Industry);
        var agriculture = this.sectors.find(el => el instanceof Agriculture);

        electricity.sectorChange(manufacturing, [inputElectricity, inputManufacturing]);
        transportation.sectorChange(inputTransportation);
        building.sectorChange(inputBuilding);
        manufacturing.sectorChange([building, transportation], [inputBuilding, inputTransportation, inputManufacturing]);
        industry.sectorChange(manufacturing, [inputIndustry, inputManufacturing]);
        agriculture.sectorChange(inputAgriculture);

        this.PPMChange();
    }
}

export default Country;