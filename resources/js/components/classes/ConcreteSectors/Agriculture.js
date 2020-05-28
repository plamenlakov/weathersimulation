import Sector from '../Sector'

class Agriculture extends Sector{

    sectorChange(inputAgriculture){
        this.value += ((this.percentage + inputAgriculture) / 100) * this.value;
        if (this.value < 0) {
            this.value = 0;
        }
    }

    cloneObject(){
        const { name, value, percentage } = this;
        var sector = new Agriculture(name, value, percentage);
        return sector;
    }

}

export default Agriculture;