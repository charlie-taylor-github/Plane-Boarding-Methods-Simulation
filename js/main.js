import Window from "./window.js";
import Plane from "./plane.js";
import Visualiser from "./visualiser.js";
import PassengerGenerator from "./passenger-generator.js";
import RandomStrategy from "./boarding-strategies/random-strategy.js";
import FrontToBackStrategy from "./boarding-strategies/front-back-strategy.js";
import BackToFrontStrategy from "./boarding-strategies/back-front-strategy.js";

const canvas = $('#main-window')[0];
const window = new Window(canvas, 60);

const generator = new PassengerGenerator(10, 0.2, 0.2, 0.2, 0.2);
const boardingStrategy = new BackToFrontStrategy(generator);
const plane = new Plane(boardingStrategy, 20, 15, 10);
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
