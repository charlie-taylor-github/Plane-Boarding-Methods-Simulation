import PassengerBehaviour from "./passenger-behaviour.js";
import Vector2 from "../vector-2.js";

class BoardingBehaviour extends PassengerBehaviour {
    constructor(passenger, aisleColumn) {
        super(passenger, aisleColumn);
        this.shuffledPastRows = [];
        this.waiting = false;
    }
    
    update(interval, passengers) {
        this.#updateIsSeated();
        this.#updateIsShuffling(passengers);
        this.#tryMoveDownAisle(interval, passengers);
        this.#tryMoveVerticallyToSeat(interval, passengers);

        
    }

    #updateIsSeated() {
        const seatIsAbove = this.p.seat[1] < this.aisleColumn;
        const aboveAndSeated = seatIsAbove && this.p.position.y < this.p.seat[1];
        const belowAndSeated = !seatIsAbove && this.p.position.y > this.p.seat[1]
        if (aboveAndSeated || belowAndSeated) {
            this.p.position.y = this.p.seat[1];
            this.p.seated = true;
            this.p.dataCollector.addSeatedPassenger();
        }
    }

    #updateIsShuffling(passengers) {
        const reachedSeat = this.p.position.x == this.p.seat[0];
        if (!reachedSeat) return;
        if (this.p.storing) return;
        let clearPath = true;
        let dir = 1;
        if (!this.p.seatIsAbove) dir = -1;
        clearPath = this.getIsClearPath(passengers, new Vector2(0, dir))
        if (clearPath) return;
        const seatRow = Math.floor(this.p.position.y);
        if (this.shuffledPastRows.includes(seatRow)) return;
        this.shuffledPastRows.push(seatRow);
        this.p.startShuffling();
        this.p.dataCollector.addSeatShuffle();
    }

    #tryMoveDownAisle(interval, passengers) {
        const waiting = !this.getCanMoveInDirection(passengers, new Vector2(1, 0));
        
        if (this.waiting && !waiting) {
            this.p.dataCollector.removeWaitingPassenger();
        }

        if (this.p.seated) return;
        if (this.p.storing) return;
        if (this.#getReachedSeatRow()) {
            this.#ensureIsStoringIfNeeded();
            return this.p.position.x = this.p.seat[0];
        }
        this.tryMoveInDirection(interval, passengers, new Vector2(1, 0));

        if (waiting && !this.waiting) {
            this.p.dataCollector.addWaitingPassenger();
        }
        this.waiting = waiting;
    }

    #tryMoveVerticallyToSeat(interval, passengers) {
        if (this.p.seated) return;
        if (this.p.storing) return;
        if (this.p.shuffling) return;
        if (this.p.position.x != this.p.seat[0]) return;
        this.#moveVerticallyToSeat(interval, passengers);
    }

    #getReachedSeatRow() {
        return this.p.position.x >= this.p.seat[0];
    }

    #ensureIsStoringIfNeeded() {
        if (this.p.needsToStore && !this.p.storing) {
            this.p.startStoringLuggage();
        }
    }

    #moveVerticallyToSeat(interval, passengers) {
        if (this.p.seatIsAbove) this.tryMoveInDirection(interval, passengers, new Vector2(0, 1));
        if (!this.p.seatIsAbove) this.tryMoveInDirection(interval, passengers, new Vector2(0, -1));
    }
}

export default BoardingBehaviour;
