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
        for (let index = 2021; index <= year; index++) {
            if (index === year) {
                this.countries.forEach(c => {
                    result.push(c)
                })
            }
            setTimeout(function() {
                this.updateCountry(inputPopulation, inputDeforestation)
            }, 200);

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