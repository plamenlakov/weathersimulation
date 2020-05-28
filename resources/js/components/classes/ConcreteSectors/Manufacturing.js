import Sector from '../Sector'

class Manufacturing extends Sector{

    sectorChange([building, transportation], [inputBuilding, inputTransportation, inputManufacturing]){
        let building_manufacturing_pct = (building.percentage + inputBuilding) * 0.15;
        let transportation_manufacturing_pct = (transportation.percentage + inputTransportation) * 0.1;
        this.value += ((this.percentage + inputManufacturing + building_manufacturing_pct + transportation_manufacturing_pct) / 100) * this.value;
        if (this.value < 0) {
            this.value = 0;
        }
    }

    cloneObject(){
        const { name, value, percentage } = this;
        var sector = new Manufacturing(name, value, percentage);
        return sector;
    }

}

export default Manufacturing;