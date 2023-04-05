import Vector2 from "../vector-2.js";
import BoardingStrategy from "./boarding-strategy.js";


class BackToFrontStrategy extends BoardingStrategy {
    constructor(generator) {
        super(generator);
    }

    getSeats(rows, columns, aisleColumn) {
        const seats = []
        for (let row=rows; row>0; row--) {
            for (let col=1; col<=columns; col++) {
                if (col < aisleColumn) seats.push([row, col]);
                else seats.push([row, columns+aisleColumn-col+1]);
            }
        }

        return seats;
    }
}

export default BackToFrontStrategy;
