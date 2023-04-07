import Window from "./window.js";
import Plane from "./plane.js";
import Visualiser from "./visualiser.js";
import PassengerGenerator from "./passenger-generator.js";
import DataCollector from "./data-collector.js";
import RandomStrategy from "./boarding-strategies/random-strategy.js";
import FrontToBackStrategy from "./boarding-strategies/front-back-strategy.js";
import BackToFrontStrategy from "./boarding-strategies/back-front-strategy.js";
import ReversePyramidStrategy from "./boarding-strategies/reverse-pyramid-strategy.js";
import SteffenPerfectStrategy from "./boarding-strategies/steffen-perfect-strategy.js";


const canvas = $('#main-window')[0];
const window = new Window(canvas);

const rows = 9;
const cols = 6;

const dataCollector = new DataCollector(rows*cols);
const generator = new PassengerGenerator(4, 0.2, 0, 0.5, 0, dataCollector);
const boardingStrategy = new FrontToBackStrategy(generator);
const plane = new Plane(boardingStrategy, rows, cols, 4);
const visualiser = new Visualiser(window, plane);

const update = (ctx, interval) => {
    plane.update(interval);
    dataCollector.update(interval);
    visualiser.update(ctx, interval);
}

const init = () => {
    canvas.width = 10000;
    canvas.height = 8000;
    window.setUpdate(update);
    window.startLoop();
}

onload = init;
