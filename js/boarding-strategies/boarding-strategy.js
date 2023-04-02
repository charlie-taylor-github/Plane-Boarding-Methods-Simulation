class BoardingStrategy {
    constructor() {

    }

    getAllSeats(rows, columns, aisleColumn) {
        const seats = [];
        let startColumn = 1;
        if (aisleColumn < 1) startColumn++;
        let finalColumn = columns+1;
        if (aisleColumn > columns) finalColumn--;
        for (let row=1; row <= rows; row++) {
            for (let col=startColumn; col <= finalColumn; col++) {
                if (col != aisleColumn) seats.push([row, col]);
            }
        }
        return seats;
    }

    getPassengers(rows, columns, aisleColumn) {
        throw new Error("Undefined method: BoardingStrategy child class must contain getPassengers() method");
    }
}


export default BoardingStrategy;
