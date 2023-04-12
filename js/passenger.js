import Vector2 from "./vector-2.js";
import BoardingBehaviour from "./passenger-behaviours/boarding-behaviour.js";

class Passenger {
    constructor(
        position, seat, aisleColumn, needsToStore = true,
        storeTime = 0.2, shuffleTime = 0.2, moveSpeed = 10,
        selected = false, dataCollector, animationSpeed
    ) {
        this.position = position;
        this.seat = seat;
        this.needsToStore = needsToStore;
        this.storeTime = storeTime;
        this.shuffleTime = shuffleTime;
        this.moveSpeed = moveSpeed;
        this.selected = selected;
        this.dataCollector = dataCollector;
        this.animationSpeed = animationSpeed;

        this.seated = false;
        this.storing = false;
        this.shuffling = false;
        this.seatIsAbove = this.seat[1] < aisleColumn;
        this.behaviour = new BoardingBehaviour(this, aisleColumn);
    }

    update(interval, passengers) {
        this.behaviour.update(interval, passengers);
    }

    moveInDirection(interval, dir) {
        const delta = this.#getDeltaPositionInDirection(interval, dir);
        this.position.x += delta.x;
        this.position.y += delta.y;
    }

    #getDeltaPositionInDirection(interval, dir) {
        const x = this.moveSpeed * interval * dir.x;
        const y = this.moveSpeed * interval * -dir.y;
        return new Vector2(x, y);
    }

    getIsInColumn(col) {
        return this.position.y > col - 1 && this.position.y < col + 1
    }

    getIsInRow(row) {
        return this.position.x > row - 1 && this.position.x < row + 1
    }

    startStoringLuggage() {
        this.storing = true;
        this.needsToStore = false;
        setTimeout(() => this.storing = false, this.storeTime * 1000 / this.animationSpeed);
    }

    startShuffling() {
        this.shuffling = true;
        setTimeout(() => this.shuffling = false, this.shuffleTime * 1000 / this.animationSpeed);
    }
}

export default Passenger;
