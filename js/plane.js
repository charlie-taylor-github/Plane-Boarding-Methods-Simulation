import Vector2 from "./vector-2.js";
import Passenger from "./passenger.js";

class Plane {
    constructor(boardingStrategy, rows=10, columns=6, aisleColumn=4) {
        this.boardingStrategy = boardingStrategy;
        this.rows = rows;
        this.columns = columns;
        this.aisleColumn = aisleColumn;

        this.passengers = boardingStrategy.getPassengers(rows, columns, aisleColumn);
        // this.passengers = [
        //     new Passenger(new Vector2(0, 4), [4, 7], 4, true, 1, 1, 3, true),
        //     new Passenger(new Vector2(-1, 4), [4, 6])
        // ];
    }

    update(interval) {
        for (const p of this.passengers) {
            p.update(interval, this.passengers);
        }
    }
}

export default Plane;
