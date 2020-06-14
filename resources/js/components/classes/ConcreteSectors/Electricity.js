import Sector from '../Sector'

class Electricity extends Sector{

    sectorChange(manufacturing, [elInput, manInput]){
        let electricity_manufacturing_pct = (manufacturing.percentage + manInput) * 0.3;
        this.value += ((this.percentage + elInput + electricity_manufacturing_pct) / 100) * this.value;
        if (this.value < 0) {
            this.value = 0;
        }
    }

    cloneObject(){
        const { name, value, percentage } = this;
        var sector = new Electricity(name, value, percentage);
        return sector;
    }

}

export default Electricity;