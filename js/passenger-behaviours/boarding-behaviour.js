import PassengerBehaviour from "./passenger-behaviour.js";
import Vector2 from "../vector-2.js";

class BoardingBehaviour extends PassengerBehaviour {
    constructor(passenger, aisleColumn) {
        super(passenger, aisleColumn);
        this.shuffledPastRows = [];
    }
    
    update(interval, passengers) {
        this.#updateIsSeated();
        this.#updateIsShuffling(interval, passengers);
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
        }
    }

    #updateIsShuffling(interval, passengers) {

    
        const reachedSeat = this.p.position.x == this.p.seat[0];

        if (!reachedSeat) return;
        if (this.p.storing) return;
        

        let clearPath = true;
        if (this.p.seatIsAbove) {
            clearPath = this.getIsClearPath(passengers, new Vector2(0, 1))
        } else {
            clearPath = this.getIsClearPath(passengers, new Vector2(0, -1))
        }
        if (clearPath) return;

        for (const row of this.shuffledPastRows) {
            const atRow =  (Math.round(this.p.position.y) == row);
            const closeToRow = (Math.abs(row - Math.round(this.p.position.y)) > 0.4); 
            if (atRow) return;
            if (closeToRow) return;
        }

        

        this.shuffledPastRows.push(Math.round(this.p.position.y));
        this.p.startShuffling();
        console.log(this.shuffledPastRows);

    }

    #tryMoveDownAisle(interval, passengers) {
        if (this.p.seated) return;
        if (this.p.storing) return;
        if (this.#getReachedSeatRow()) {
            this.#ensureIsStoringIfNeeded();
            return this.p.position.x = this.p.seat[0];
        }
        this.tryMoveInDirection(interval, passengers, new Vector2(1, 0));
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
