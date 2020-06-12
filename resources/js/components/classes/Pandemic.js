class Pandemic{

    constructor(originCountry, rateOfInfection, startYear, endYear){

        this.originCountry = originCountry;
        this.rateOfInfection = rateOfInfection;
        this.startYear = startYear;
        this.endYear = endYear;
        this.countriesInfected = [];
    }

    //The country the pandemic starts from
    set originCountry(v) {
        this._originCountry = v;
    }

    get originCountry() {
        return this._originCountry;
    }

    set countriesInfected(v) {
        this._countriesInfected = v;
    }

    get countriesInfected() {
        return this._countriesInfected;
    }

    //The rate of which the infection spreads to the population within a country
    set rateOfInfection(v) {
        this._rateOfInfection = v;
    }

    get rateOfInfection() {
        return this._rateOfInfection;
    }

    //The year this pandemic starts
    set startYear(v) {
        this._startYear = v;
    }

    get startYear() {
        return this._startYear;
    }

    // //The year this pandemic ends
    // set endYear(v) {
    //     this._startYear = v;
    // }

    // get endYear() {
    //     return this._startYear;
    // }
}

export default Pandemic;
