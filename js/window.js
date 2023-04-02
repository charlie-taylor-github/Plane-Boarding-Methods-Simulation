import Vector2 from "./vector-2.js";

class Window {
    #updateCallback;

    constructor(canvas, fps=60) {
        this.canvas = canvas;
        this.fps = fps;
        this.size = new Vector2(canvas.width, canvas.height);
        this.ctx = canvas.getContext('2d');
        this.#updateCallback = ()=>{};
    }

    setUpdate(update) {
        this.#updateCallback = update;
    }

    #update(interval) {
        this.size = new Vector2(this.canvas.width, this.canvas.height);
        this.#updateCallback(this.ctx, interval);
    }

    startLoop() {
        let now;
        let then = Date.now();
        let interval = 1000 / this.fps;
        let delta;
        const animate = () => {
            requestAnimationFrame(animate);
            now = Date.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);
                this.ctx.clearRect(0, 0, this.size.x, this.size.y);
                this.#update(interval / 1000);
            }
        }
        animate();
    }
}

export default Window;
