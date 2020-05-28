import Sector from '../Sector'

class Transportation extends Sector{

    sectorChange(inputTransportation){
        this.value += ((this.percentage + inputTransportation) / 100) * this.value;
        if (this.value < 0) {
            this.value = 0;
        }
    }

    cloneObject(){
        const { name, value, percentage } = this;
        var sector = new Transportation(name, value, percentage);
        return sector;
    }
}

export default Transportation;