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
        this.sf = 2;
    }

    update(ctx, interval) {
        this.#drawSeats(ctx);
        this.#drawPassengers(ctx);
    }

    #drawPassengers(ctx) {
        for (const p of this.#plane.passengers) {
            this.#drawPassenger(ctx, p);
        }
    }

    #drawPassenger(ctx, p) {
        const x = (p.position.x - 1) * this.#seatSize.x + this.#seatSize.x / 2;
        const y = (p.position.y - 1) * this.#seatSize.y + this.#seatSize.y / 2;
        const color = this.#getPassengerColor(p);
        this.#drawCircle(ctx, x, y, this.#passengerRadius, 'black');
        this.#drawCircle(ctx, x, y, this.#passengerRadius * 0.8, color);
    }

    #drawSeats(ctx) {
        for (let rowI = 1; rowI <= this.#plane.rows; rowI++) {
            for (let seatI = 1; seatI <= this.#plane.columns; seatI++) {
                const pastAisle = seatI >= this.#plane.aisleColumn;
                const x = (rowI - 1) * this.#seatSize.x;
                let y = (seatI - 1) * this.#seatSize.y;
                if (pastAisle) y += this.#seatSize.y;
                this.#drawSeat(ctx, x, y);
            }
        }
    }

    #drawSeat(ctx, x, y) {
        this.#drawSquare(ctx, x, y, this.#seatSize.x, 5, "black");
        this.#drawSquare(ctx, x, y + this.#seatSize.y - 5, this.#seatSize.x, 5, "black");
        this.#drawSquare(ctx, x, y, 5, this.#seatSize.y, "black");
        this.#drawSquare(ctx, x + this.#seatSize.x - 5, y, 5, this.#seatSize.y, "black");
    }

    #getPassengerColor(p) {
        if (p.seated) return "#7ACE5D";
        if (p.storing) return "#00A3FF";
        if (p.shuffling) return "#DB00FF";
        if (p.behaviour.waiting) return "#FF5C00";
        return "#DEDEDE";
    }

    #drawSquare(ctx, x, y, w, h, color) {
        ctx.fillStyle = color;
        ctx.fill

        ctx.fillRect(x * this.sf, y * this.sf, w * this.sf, h * this.sf);
    }

    #drawCircle(ctx, x, y, r, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x * this.sf, y * this.sf, r * this.sf, 0, 2 * Math.PI);
        ctx.fill();
    }
}

export default Visualiser;
