class Plane {
    constructor(boardingStrategy, rows = 10, columns = 6, aisleColumn = 4) {
        this.boardingStrategy = boardingStrategy;
        this.rows = rows;
        this.columns = columns;
        this.aisleColumn = aisleColumn;
        this.passengers = boardingStrategy.getPassengers(rows, columns, aisleColumn);
    }

    update(interval) {
        for (const p of this.passengers) {
            p.update(interval, this.passengers);
        }
    }
}


export default Plane;
