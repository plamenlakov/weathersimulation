class MapData {
    constructor(countries) {
        this.countries = countries;
    }

    set countries(v) {
        this._countries = v;
    }

    get countries() {
        return this._countries;
    }

    changedCountries(year, inputPopulation, inputDeforestation) {
        let result = [];

        console.log("before loop " + this.countries[1].population);
        for (let index = 2020; index <= year; index++) {
            if (index === year) {
                this.countries.forEach(c => {
                    result.push(c);
                    
                })
            }
            this.updateCountry(inputPopulation, inputDeforestation);


        }
        return result;

    }


    updateCountry(inputPopulation, inputDeforestation) {
        this.countries.forEach(c => {
            c.updateCurrentData(inputPopulation, inputDeforestation);
        })
    }
}

export default MapData;