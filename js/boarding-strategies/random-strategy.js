import Passenger from "../passenger.js";
import Vector2 from "../vector-2.js";
import BoardingStrategy from "./boarding-strategy.js";


class RandomStrategy extends BoardingStrategy {
    constructor() {
        super();
    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    getPassengers(rows, columns, aisleColumn) {
        const seats = this.getAllSeats(rows, columns, aisleColumn);
        this.shuffle(seats);
        const passengers = [];
        for (let i=0; i<seats.length; i++) {
            const seat = seats[i];
            passengers.push(new Passenger(new Vector2(-i, aisleColumn), seat, aisleColumn));
        }
        return passengers;
    }
}

export default RandomStrategy;
