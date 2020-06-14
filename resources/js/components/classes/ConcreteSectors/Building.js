import Sector from '../Sector'

class Building extends Sector{

    sectorChange(inputBuilding){
        this.value += ((this.percentage + inputBuilding) / 100) * this.value;
        if (this.value < 0) {
            this.value = 0;
        }
    }

    cloneObject(){
        const { name, value, percentage } = this;
        var sector = new Building(name, value, percentage);
        return sector;
    }

}

export default Building;