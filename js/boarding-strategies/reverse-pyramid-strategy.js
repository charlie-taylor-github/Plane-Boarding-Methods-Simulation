import Vector2 from "../vector-2.js";
import BoardingStrategy from "./boarding-strategy.js";


class ReversePyramidStrategy extends BoardingStrategy {
    constructor(generator) {
        super(generator);
    }

    #addSeatsAtCol(rows, col, seats) {
        for (let row=rows; row>0; row--) {
            seats.push([row, col]);
        }
    }

    getSeats(rows, columns, aisleColumn) {
        const seats = [];
        for (let col=1; col<= columns; col++) {
            let seatCol = Math.round(col/2);
            if (col % 2 == 0) seatCol = columns-seatCol+2;
            this.#addSeatsAtCol(rows, seatCol, seats);
        }
        return seats;
    }
}

export default ReversePyramidStrategy;
