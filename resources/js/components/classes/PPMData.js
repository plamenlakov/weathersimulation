class PPMData {
    constructor(countries) {
        this.countries = countries;
    }

    set countries(v) {
        this._countries = v;
    }

    get countries() {
        return this._countries;
    }

    evaluatePPM(year, inputPopulation, inputDeforestation) {
        var result = [["Year", "PPM"],];
        console.log(year);
        for (let index = 2020; index <= year; index++) {
            var year_result = [];
            year_result.push(index);
            year_result.push(this.sumPPM());
            result.push(year_result);
            this.updateCountries(inputPopulation, inputDeforestation);
        }
        return result;
    }

    evaluatePPMPie(year, inputPopulation, inputDeforestation){
        var result = [["Country", "PPM in " + year],];
        for (let index = 2020; index <= year; index++) {
            if(index === year){
                this.countries.forEach(c => {
                    if(c.ppm > 0){
                        result.push([c.name, c.ppm]);
                    }
                    
                })
            }
            this.updateCountries(inputPopulation, inputDeforestation);
        }
        return result;
    }

    sumPPM() {
        var result = 0;
        this.countries.forEach(c => {
            result += c.ppm;
        });
        return result;
    }

    updateCountries(inputPopulation, inputDeforestation) {
        this.countries.forEach(c => {
            c.updateCurrentData(inputPopulation, inputDeforestation);
        })
    }
}

export default PPMData;