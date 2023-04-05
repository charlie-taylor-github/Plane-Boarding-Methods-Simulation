import Vector2 from "../vector-2.js";

class BoardingStrategy {
    constructor(generator) {
        this.generator = generator;
    }

    getPassengers(rows, columns, aisleColumn) {
        const seats = this.getSeats(rows, columns, aisleColumn);
        const passengers = [];
        for (let i=0; i<seats.length; i++) {
            const seat = seats[i];
            const p = this.generator.getNewPassenger(new Vector2(-i, aisleColumn), seat, aisleColumn);
            passengers.push(p);
        }
        return passengers;
    }

    getSeats(rows, columns, aisleColumn) {
        throw new Error("Undefined method: BoardingStrategy child class must contain getSeats() method");
    }
}


export default BoardingStrategy;
