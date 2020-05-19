class Country {
    constructor(name, area, ppm, population, populationGrowth, forests, forestsGrowth,
        electricity_value, electricityGrowth, transportation_value, transportGrowth, building_value,
        buildingGrowth, manufacturing_value, manufacturingGrowth, industry_value, industryGrowth,
        agriculture_value, agricultureGrowth) {

        this.name = name;
        this.area = area;
        this.ppm = ppm;
        this.population = population;
        this.populationGrowth = populationGrowth;
        this.forests = forests;
        this.forestsGrowth = forestsGrowth;
        this.electricity = electricity_value;
        this.transportation = transportation_value;
        this.manufacturing = manufacturing_value;
        this.industry = industry_value;
        this.agriculture = agriculture_value;
        this.building_value = building_value;
        this.electricityGrowth = electricityGrowth;
        this.transportationGrowth = transportGrowth;
        this.buildingGrowth = buildingGrowth;
        this.manufacturingGrowth = manufacturingGrowth;
        this.industryGrowth = industryGrowth;
        this.agricultureGrowth = agricultureGrowth;

        
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

    //ELECTRICITY
    set electricity(v) {
        this._electricity = v;
    }

    get electricity() {
        return this._electricity;
    }

    //ELECTRICITY_GROWTH
    set electricityGrowth(v) {
        this._electricityGrowth = v;
    }

    get electricityGrowth() {
        return this._electricityGrowth;
    }

    //TRANSPORTATION
    set transportation(v) {
        this._transportation = v;
    }

    get transportation() {
        return this._transportation;
    }

    //TRANSPORTATION_GROWTH
    set transportationGrowth(v) {
        this._transportationGrowth = v;
    }

    get transportationGrowth() {
        return this._transportationGrowth;
    }

    //BUILDING
    set building_value(v) {
        this._building = v;
    }

    get building_value() {
        return this._building;
    }

    //BUILDING_GROWTH
    set buildingGrowth(v) {
        this._buildingGrowth = v;
    }

    get buildingGrowth() {
        return this._buildingGrowth;
    }

    //MANUFACTURING
    set manufacturing(v) {
        this._manufactoring = v;
    }

    get manufacturing() {
        return this._manufactoring;
    }

    //MANUFACTURING_GROWTH
    set manufacturingGrowth(v) {
        this._manufactoringGrowth = v;
    }

    get manufacturingGrowth() {
        return this._manufactoringGrowth;
    }

    //INDUSTRY
    set industry(v) {
        this._industry = v;
    }

    get industry() {
        return this._industry;
    }

    //INDUSTRY_GROWTH
    set industryGrowth(v) {
        this._industryGrowth = v;
    }

    get industryGrowth() {
        return this._industryGrowth;
    }

    //AGRICULTURE
    set agriculture(v) {
        this._agriculture = v;
    }

    get agriculture() {
        return this._agriculture;
    }

    //AGRICULTURE_GROWTH
    set agricultureGrowth(v) {
        this._agricultureGrowth = v;
    }

    get agricultureGrowth() {
        return this._agricultureGrowth;
    }

    getForestArea() {
        var result = (this.forests / 100) * this.area;
        return result;
    }

    getProductionCO2() {
        return this.electricity + this.building_value + this.transportation + this.manufacturing + this.industry + this.agriculture;
    }

    electricityChange(inputElectricity, inputManufacturing) {
        let electricity_manufacturing_pct = (this.manufacturingGrowth + inputManufacturing) * 0.3;
        this.electricity += ((this.electricityGrowth + inputElectricity + electricity_manufacturing_pct) / 100) * this.electricity;
    }

    industryChange(inputIndustry, inputManufacturing) {
        let industry_manufacturing_pct = (this.manufacturingGrowth + inputManufacturing) * 0.2;
        this.industry += ((this.industryGrowth + inputIndustry + industry_manufacturing_pct) / 100) * this.industry;
    }

    transportationChange(inputTransportation) {
        this.transportation += ((this.transportationGrowth + inputTransportation) / 100) * this.transportation;
    }
    buildingChange(inputBuilding) {
        this.building_value += ((this.buildingGrowth + inputBuilding) / 100) * this.building_value;
    }
    manufacturingChange(inputManufacturing, inputBuilding, inputTransportation) {
        let building_manufacturing_pct = (this.buildingGrowth + inputBuilding) * 0.15;
        let transportation_manufacturing_pct = (this.transportationGrowth + inputTransportation) * 0.1;
        this.manufacturing += ((this.manufacturingGrowth + inputManufacturing + building_manufacturing_pct + transportation_manufacturing_pct) / 100) * this.manufacturing;
    }

    agricultureChange(inputAgriculture) {
        this.agriculture += ((this.agricultureGrowth + inputAgriculture) / 100) * this.agriculture;

    }

    cloneObject() {
        const { name, area, ppm, population, populationGrowth, forests, forestsGrowth,
            electricity, electricityGrowth, transportation, transportationGrowth, building_value,
            buildingGrowth, manufacturing, manufacturingGrowth, industry, industryGrowth,
            agriculture, agricultureGrowth } = this;
        var country = new Country(name, area, ppm, population, populationGrowth, forests, forestsGrowth,
            electricity, electricityGrowth, transportation, transportationGrowth, building_value,
            buildingGrowth, manufacturing, manufacturingGrowth, industry, industryGrowth,
            agriculture, agricultureGrowth);
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
            //this.getForestArea();
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
        var producedCO2 = this.population * 26.25;
        return producedCO2;
    }

    //Calculate the difference between the produced and the cleaned CO2 and see how the overall ppm changes
    PPMChange() {
        var ppmChange = (this.getProductionCO2() - this.cleanedCO2()) / (7500000000 * 2);
        this.ppm = Math.round((this.ppm + ppmChange) * 10000) / 10000;
        if(this.ppm < 0){
            this.ppm = 0;
        }

    }

    updateCurrentData(inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
        inputIndustry, inputAgriculture) {
        this.forestAreaChange(inputPopulation, inputDeforestation);
        this.populationChange(inputPopulation);
        this.electricityChange(inputElectricity, inputManufacturing);
        this.transportationChange(inputTransportation);
        this.buildingChange(inputBuilding);
        this.manufacturingChange(inputManufacturing, inputBuilding, inputTransportation);
        this.industryChange(inputIndustry, inputManufacturing);
        this.agricultureChange(inputAgriculture);
        this.PPMChange();
    }
}

export default Country;