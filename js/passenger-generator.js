import Passenger from "./passenger.js";

class PassengerGenerator {
    #moveSpeed;
    #meanStoreTime;
    #storeTimeDeviation;
    #meanShuffleTime;
    #shuffleTimeDeviation;

    constructor(
        moveSpeed=1,
        meanStoreTime=1, storeTimeDeviation=0, 
        meanShuffleTime=1, shuffleTimeDeviation=0,
        dataCollector
    ) {
        this.dataCollector = dataCollector;
        
        this.#moveSpeed = moveSpeed;
        this.#meanStoreTime = meanStoreTime;
        this.#storeTimeDeviation = storeTimeDeviation;
        this.#meanShuffleTime = meanShuffleTime;
        this.#shuffleTimeDeviation = shuffleTimeDeviation;
    }

    getNewPassenger(pos, seat, aisleColumn) {
        const storeT = this.#getNewStoreTime();
        const shuffleT = this.#getNewShuffleTime();
        return new Passenger(
            pos, seat, aisleColumn, 
            true, storeT, shuffleT, 
            this.#moveSpeed, false, this.dataCollector);
    }

    #getNewStoreTime() {
        return this.#getNewValue(this.#meanStoreTime, this.#storeTimeDeviation);
    }

    #getNewShuffleTime() {
        return this.#getNewValue(this.#meanShuffleTime, this.#shuffleTimeDeviation);
    }

    #getNewValue(mean, deviation) {
        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2*Math.log(u1)) * Math.cos(2*Math.PI * u2);
        return (z * deviation) + mean;
    }
}

export default PassengerGenerator;
