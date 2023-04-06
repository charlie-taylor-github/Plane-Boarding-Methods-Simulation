import Vector2 from "../vector-2.js";
import BoardingStrategy from "./boarding-strategy.js";


class SteffenPerfectStrategy extends BoardingStrategy {
    constructor(generator) {
        super(generator);
    }

    #addSeatsAtCol(rows, columns, col, seats) {
        for (const bottom of [false, true]) {
            for (let row=rows; row>0; row--) {
                let seatCol = col;
                if (bottom) seatCol = columns-seatCol+2;
                if (row % 2 == 1) seats.push([row, seatCol])
            }
        }

        for (const bottom of [false, true]) {
            for (let row=rows; row>0; row--) {
                let seatCol = col;
                if (bottom) seatCol = columns-seatCol+2;
                if (row % 2 == 0) seats.push([row, seatCol])
            }
        }
    }

    getSeats(rows, columns, aisleColumn) {
        const seats = [];
        for (let col=1; col<aisleColumn; col++) {
            this.#addSeatsAtCol(rows, columns, col, seats);
        }
        
        return seats;
    }
}

export default SteffenPerfectStrategy;
