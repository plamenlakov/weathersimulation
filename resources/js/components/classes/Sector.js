class Sector{

    get name() {
        return this._name;
    }
    set name(v) {
        this._name = v;
    }

    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v;
    }

    get percentage() {
        return this._percentage;
    }
    set percentage(v) {
        this._percentage = v;
    }

    constructor(name, value, percentage){  
        if (this.constructor == Sector) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        else{
            this.name = name;
            this.value = value;
            this.percentage = percentage;
        }
    }   

    sectorChange(otherSectors, inputs){
        throw new Error("Method 'sectorChange()' must be implemented.");
    }

    cloneObject() {
        throw new Error("Method 'cloneObject()' must be implemented.");
    }

}

export default Sector;