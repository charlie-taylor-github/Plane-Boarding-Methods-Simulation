class DataCollector {
    #currentPassengersWaiting;

    constructor(totalPassengers) {
        this.totalPassengers = totalPassengers;
        this.boardedPassengers = 0;

        this.totalBoardingTime = 0;
        this.averageBoardingTime = 0;

        this.totalSeatShuffles = 0;
        this.averageSeatShuffles = 0;

        this.totalStorageStops = 0;
        this.averageStorageStops = 0;

        this.totalWaitingTime = 0;
        this.averageWaitingTime = 0;

        this.#currentPassengersWaiting = 0;
    }

    update(interval) {
        this.totalBoardingTime += interval;
        this.averageBoardingTime = this.totalBoardingTime / this.boardedPassengers;
        this.averageSeatShuffles = this.totalSeatShuffles / this.totalPassengers;
        this.averageStorageStops = this.totalStorageStops / this.boardedPassengers;
        this.totalWaitingTime += interval * this.#currentPassengersWaiting;
        this.averageWaitingTime = this.totalWaitingTime / this.boardedPassengers;
    }

    addSeatedPassenger() {
        this.boardedPassengers++;
    }

    addSeatShuffle() {
        this.totalSeatShuffles++;
    }

    addWaitingPassenger() {
        this.#currentPassengersWaiting++;
    }

    removeWaitingPassenger() {
        this.#currentPassengersWaiting--;
    }

    addStorageStop() {
        this.totalStorageStops++;
    }
}

export default DataCollector;
