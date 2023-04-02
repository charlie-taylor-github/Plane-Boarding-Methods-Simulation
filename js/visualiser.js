import Vector2 from "./vector-2.js";

class Visualiser {
    #window;
    #plane;
    #seatSize;
    #passengerRadius;

    constructor(window, plane) {
        this.#window = window;
        this.#plane = plane;
        this.#seatSize = new Vector2(50, 50);
        this.#passengerRadius = 15;
    }

    update(ctx, interval) {
        this.#drawSeats(ctx);
        this.#drawPassengers(ctx);
    }

    #drawPassengers(ctx) {
        for (const p of this.#plane.passengers) {
            const x = p.position.x*this.#seatSize.x + this.#seatSize.x/2;
            const y = p.position.y*this.#seatSize.y + this.#seatSize.y/2;
            ctx.fillStyle = this.#getPassengerColor(p);
            ctx.beginPath();
            ctx.arc(x, y, this.#passengerRadius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    #drawSeats(ctx) {
        for (let rowI=1; rowI<=this.#plane.rows; rowI++) {
            for (let seatI=1; seatI<=this.#plane.columns; seatI++) {
                const pastAisle = seatI >= this.#plane.aisleColumn;
                const x = rowI*this.#seatSize.x;
                let y = seatI*this.#seatSize.y;
                if (pastAisle) y += this.#seatSize.y;
                this.#drawSeat(ctx, x, y);
            }
        }
    }

    #drawSeat(ctx, x, y) {
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, this.#seatSize.x, 5);
        ctx.fillRect(x, y+this.#seatSize.y-5, this.#seatSize.x, 5);
        ctx.fillRect(x, y, 5, this.#seatSize.y);
        ctx.fillRect(x+this.#seatSize.x-5, y, 5, this.#seatSize.y);
    }

    #getPassengerColor(p) {
        if (p.seated) return "green";
        if (p.storing) return "red";
        if (p.shuffling) return "purple";
        return "blue";
    }
}

export default Visualiser;
