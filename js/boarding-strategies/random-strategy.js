import BoardingStrategy from "./boarding-strategy.js";


class RandomStrategy extends BoardingStrategy {
    constructor(generator) {
        super(generator);
    }

    getSeats(rows, columns, aisleColumn) {
        const seats = this.#getAllSeats(rows, columns, aisleColumn);
        this.#shuffle(seats);
        return seats;
    }

    #shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    #getAllSeats(rows, columns, aisleColumn) {
        const seats = [];
        let startColumn = 1;
        if (aisleColumn < 1) startColumn++;
        let finalColumn = columns + 1;
        if (aisleColumn > columns) finalColumn--;
        for (let row = 1; row <= rows; row++) {
            for (let col = startColumn; col <= finalColumn; col++) {
                if (col != aisleColumn) seats.push([row, col]);
            }
        }
        return seats;
    }
}


export default RandomStrategy;
