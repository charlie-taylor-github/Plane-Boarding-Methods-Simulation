import Window from "./window.js";
import Plane from "./plane.js";
import Visualiser from "./visualiser.js";
import RandomStrategy from "./boarding-strategies/random-strategy.js";

const canvas = $('#main-window')[0];
const window = new Window(canvas, 60);

const boardingStrategy = new RandomStrategy();
const plane = new Plane(boardingStrategy, 10, 6, 4);
const visualiser = new Visualiser(window, plane);

const update = (ctx, interval) => {
    plane.update(interval);
    visualiser.update(ctx, interval);
}

const init = () => {
    canvas.width = 10000;
    canvas.height = 8000;
    window.setUpdate(update);
    window.startLoop();
}

onload = init;
