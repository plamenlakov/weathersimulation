import Sector from '../Sector'

class Industry extends Sector{

    sectorChange(manufacturing, [inputIndustry, inputManufacturing]){
        let industry_manufacturing_pct = (manufacturing.percentage + inputManufacturing) * 0.2;
        this.value += ((this.percentage + inputIndustry + industry_manufacturing_pct) / 100) * this.value;
        if (this.value < 0) {
            this.value = 0;
        }
    }

    cloneObject(){
        const { name, value, percentage } = this;
        var sector = new Industry(name, value, percentage);
        return sector;
    }

}

export default Industry;