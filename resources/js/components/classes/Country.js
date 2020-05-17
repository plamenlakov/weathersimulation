class Country {
    constructor(name, area, ppm, population, populationGrowth, forests, forestsGrowth,
                electricity_value, electricityGrowth, transport_value, transportGrowth, building_value,
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
        this.transportation = transport_value;
        this.manufacturing = manufacturing_value;
        this.industry = industry_value;
        this.agriculture = agriculture_value;
        this.building_value = building_value;
        // this.electricity = (electricity_pct/100) * this.CO2ProductionPopulation();
        // console.log("electricity")
        // console.log(this.electricity)
         this.electricityGrowth = electricityGrowth;
        // this.transportation = (transport_pct/100) * this.CO2ProductionPopulation();
        //
         this.transportationGrowth = transportGrowth;
        // this.building_value = (building_pct/100) * this.CO2ProductionPopulation();
         this.buildingGrowth = buildingGrowth;
        //
        // this.manufacturing = (manufacturing_pct/100) * this.CO2ProductionPopulation();
         this.manufacturingGrowth = manufacturingGrowth;
        // this.industry = (industry_pct/100) * this.CO2ProductionPopulation();
         this.industryGrowth = industryGrowth;
        //
        // this.agriculture = (agriculture_pct/100) * this.CO2ProductionPopulation();
         this.agricultureGrowth = agricultureGrowth;
        // console.log("co2 production pop")
        // console.log(this.CO2ProductionPopulation())


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

    get electricity_pct() {
        return this._electricity_pct;
    }
    set electricity_pct(v) {
        this._electricity_pct = v;
    }
    get transportation_pct() {
        return this._transportation_pct;
    }
    set transportation_pct(v) {
        this._transportation_pct = v;
    }
    get building_pct() {
        return this._building_pct;
    }
    set building_pct(v) {
        this._building_pct = v;
    }
    get manufacturing_pct() {
        return this._manufacturing_pct;
    }
    set manufacturing_pct(v) {
        this._manufacturing_pct = v;
    }
    get industry_pct() {
        return this._industry_pct;
    }
    set industry_pct(v) {
        this._industry_pct = v;
    }
    get agriculture_pct() {
        return this._agriculture_pct;
    }
    set agriculture_pct(v) {
        this._agriculture_pct = v;
    }
    getForestArea() {
        var result = (this.forests / 100) * this.area;
        return result;
    }

    getProductionCO2(){
        // this.electricity = (this.electricity_pct / 100) * this.CO2ProductionPopulation();
        // this.building_value = (this.building_pct / 100) * this.CO2ProductionPopulation();
        // this.transportation = (this.transportation_pct / 100) * this.CO2ProductionPopulation();
        // this.manufacturing = (this.manufacturing_pct / 100) * this.CO2ProductionPopulation();
        // this.industry = (this.industry_pct / 100) * this.CO2ProductionPopulation();
        // this.agriculture = (this.agriculture_pct / 100) * this.CO2ProductionPopulation();
        return this.electricity + this.building_value + this.transportation + this.manufacturing + this.industry + this.agriculture;
    }
    //
    // getBuildingProductionCO2(){
    //
    //     return this.building_value;
    // }
    //
    // getTransportationCO2(){
    //
    //     return this.transportation;
    // }
    //
    // getManufacturingCO2(){
    //
    //     return this.manufacturing;
    // }
    //
    // getIndustryCO2(){
    //
    //     return this.industry;
    // }
    //
    // getAgricultureCO2(){
    //
    //     return this.agriculture;
    // }

    // electricityChange(inputElectricity, inputManufacturing) {
    //     let electricity_manufacturing_pct = (this.manufacturingGrowth + inputManufacturing) * 0.3;
    //     this.electricity += ((this.electricityGrowth + inputElectricity + electricity_manufacturing_pct)/100) * this.electricity;
    // }
    electricityChange(inputElectricity){
        this.electricity += ((this.electricityGrowth+inputElectricity)/100) * this.electricity;
    }
    // industryChange(inputIndustry, inputManufacturing) {
    //     let industry_manufacturing_pct = (this.manufacturingGrowth + inputManufacturing) * 0.2;
    //     this.industry += ((this.industryGrowth + inputIndustry + industry_manufacturing_pct)/100) * this.industry;
    // }
    industryChange(inputIndustry){
        this.industry += ((this.industryGrowth+inputIndustry)/100) * this.industry;
    }
    transportationChange(inputTransportation) {
        this.transportation += ((this.transportationGrowth+inputTransportation)/100) * this.transportation;
    }
    buildingChange(inputBuilding) {
        this.building_value += ((this.buildingGrowth+inputBuilding)/100) * this.building_value;
    }
    // manufacturingChange(inputManufacturing, inputBuilding, inputTransportation) {
    //     let building_manufacturing_pct = (this.buildingGrowth + inputBuilding) * 0.15;
    //     let transportation_manufacturing_pct = (this.transportationGrowth + inputTransportation) * 0.1;
    //     this.manufacturing += ((this.manufacturingGrowth + inputManufacturing + building_manufacturing_pct + transportation_manufacturing_pct)/100) * this.manufacturing;
    // }
    manufacturingChange(inputManufacturing){
        this.manufacturing += ((this.manufacturingGrowth+inputManufacturing)/100) * this.manufacturing;
    }
    agricultureChange(inputAgriculture) {
        this.agriculture += ((this.agricultureGrowth + inputAgriculture)/100) * this.agriculture;

    }

    cloneObject() {
        const { name, area, ppm, population, populationGrowth, forests, forestsGrowth,
            electricity_value, electricityGrowth, transport_value, transportGrowth, building_value,
            buildingGrowth, manufacturing_value, manufacturingGrowth, industry_value, industryGrowth,
            agriculture_value, agricultureGrowth} = this;
        return new Country(name, area, ppm, population, populationGrowth, forests, forestsGrowth,
            electricity_value, electricityGrowth, transport_value, transportGrowth, building_value,
            buildingGrowth, manufacturing_value, manufacturingGrowth, industry_value, industryGrowth,
            agriculture_value, agricultureGrowth);
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
            if(this.forests < 0){
                this.forests = 0;
            }
            if(this.forests > 100){
                this.forests = 100;
            }
        } else {
            forestsKm2 = this.getForestArea() + this.getForestArea() * ((this.forestsGrowth - inputDeforestation) / 100);
            this.forests = Math.round(((forestsKm2 / this.area) * 100) * 1000)/ 1000;
            if(this.forests < 0){
                this.forests = 0;
            }
            if(this.forests > 100){
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
    // CO2ProductionSectors(){
    //     debugger;
    //     this.getProductionCO2();
    //     return this.agriculture + this.building_value + this.electricity + this.industry + this.manufacturing + this.transportation;
    // }

    //Calculate the difference between the produced and the cleaned CO2 and see how the overall ppm changes
    PPMChange() {
        //debugger;
        var ppmChange = (this.getProductionCO2() - this.cleanedCO2()) / 7500000000;
        this.ppm = Math.round((this.ppm + ppmChange) * 10000) / 10000;
        
    }

    updateCurrentData(inputPopulation, inputDeforestation, inputElectricity, inputTransportation, inputBuilding, inputManufacturing,
                      inputIndustry, inputAgriculture) {
        this.forestAreaChange(inputPopulation, inputDeforestation);
        this.populationChange(inputPopulation);
        this.electricityChange(inputElectricity,inputManufacturing);
        this.transportationChange(inputTransportation);
        this.buildingChange(inputBuilding);
        this.manufacturingChange(inputManufacturing, inputBuilding, inputTransportation);
        this.industryChange(inputIndustry, inputManufacturing);
        this.agricultureChange(inputAgriculture);
        this.PPMChange();
        console.log("ppm:")
        console.log(this.ppm);
        //console.log("CO2Sectors:")
        //console.log(this.CO2ProductionSectors());
        console.log("CO2Pop:")
        console.log(this.CO2ProductionPopulation())
    }
}

export default Country;