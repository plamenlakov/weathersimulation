class Country {
    constructor(name, area, ppm, population, populationGrowth, forests, forestsGrowth){
        this.name = name;
        this.area = area;
        this.ppm = ppm;
        this.population = population;
        this.populationGrowth = populationGrowth;
        this.forests = forests;
        this.forestsGrowth = forestsGrowth;
    }

    //NAME
    set name(v){
        this._name = v;
    }
    get name(){
        return this._name;
    }

    //AREA
    set area(v){
        this._size = v;
    }
    get area(){
        return this._size;
    }

    //PPM
    set ppm(v){
        this._ppm = v;
    }
    get ppm(){
        return this._ppm;
    }

    //POPULATION
    set population(v){
        this._population = v;
    }
    get population(){
        return this._population;
    }

    //POPULATION GROWTH
    set populationGrowth(v){
        this._populationGrowth = v;
    }
    get populationGrowth(){
        return this._populationGrowth;
    }

    //FORESTRY
    set forests(v){
        this._forests = v;
    }
    get forests(){
        return this._forests;
    }

    //FORESTRY GROWTH
    set forestsGrowth(v){
        this._forestsGrowth = v;
    }
    get forestsGrowth(){
        return this._forestsGrowth;
    }
    //Calculate how much the forest has changed for this country and returns forest area in km2
    forestAreaChange(inputPopulation, inputDeforestation){
        var forestsKm2;
        var deforestationByPopulation_pct = (this.populationGrowth + inputPopulation)* 2.7
        if (deforestationByPopulation_pct >= 0){
            forestsKm2 = this.getForestArea() + this.getForestArea()*((this.forestsGrowth -
                deforestationByPopulation_pct - inputDeforestation)/100);
            this.forests = (forestsKm2 / this.area) / 100;

        }
        else{
            forestsKm2 = this.getForestArea() + this.getForestArea()*((this.forestsGrowth - inputDeforestation)/100)
            this.forests = (forestsKm2 / this.area) / 100;

        }

    }
    //Calculate how much CO2 emissions were cleaned by this country
    cleanedCO2(){
        var cleanedCO2Tonnes = ((this.getForestArea() * 65000)* 22) / 1000;
        return cleanedCO2Tonnes;
    }

    //Calculate the population per Country
    populationChange(inputPopulation){
        var populationChanged = this.population + this.population*((this.populationGrowth + inputPopulation)/100);
        this.population = populationChanged;
    }

    //Calculate the produced CO2 emissions by the population per country
    CO2Production(){
        var producedCO2 = this.population * 26.25;
        return producedCO2;
    }

    //Calculate the difference between the produced and the cleaned CO2 and see how the overall ppm changes
    PPMChange(){
        var ppmChange = (this.CO2Production() - this.cleanedCO2())/7500000000;
        this.ppm = this.ppm + ppmChange;
    }
}

export default Country;