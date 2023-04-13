import DataCollector from "./data-collector.js";
import PassengerGenerator from "./passenger-generator.js";
import Plane from "./plane.js";
import Visualiser from "./visualiser.js";

import RandomStrategy from "./boarding-strategies/random-strategy.js";
import FrontToBackStrategy from "./boarding-strategies/front-back-strategy.js";
import BackToFrontStrategy from "./boarding-strategies/back-front-strategy.js";
import ReversePyramidStrategy from "./boarding-strategies/reverse-pyramid-strategy.js";
import SteffenPerfectStrategy from "./boarding-strategies/steffen-perfect-strategy.js";

class Simulation {
    #dataCollector;
    #generator;
    #boardingStrategy;
    #plane;
    #visualiser;
    #animationSpeed;

    constructor(
        rows, cols, aisleCol, moveSpeed,
        meanStoreTime, storeTimeDeviation,
        meanShuffleTime, shuffleTimeDeviation,
        strategyName, animationSpeed, window
    ) {
        this.#animationSpeed = animationSpeed;
        this.dataCollector = new DataCollector(rows * cols);
        this.#generator = new PassengerGenerator(
            moveSpeed, meanStoreTime, storeTimeDeviation,
            meanShuffleTime, shuffleTimeDeviation,
            this.dataCollector, animationSpeed);
        const Strategy = this.#getStrategy(strategyName);
        this.#boardingStrategy = new Strategy(this.#generator);
        this.#plane = new Plane(this.#boardingStrategy, rows, cols, aisleCol);
        this.#visualiser = new Visualiser(window, this.#plane);
    }

    update(ctx, interval) {
        this.#plane.update(interval * this.#animationSpeed);
        this.dataCollector.update(interval * this.#animationSpeed);
        this.#visualiser.update(ctx, interval * this.#animationSpeed);
    }

    #getStrategy(strategyName) {
        switch (strategyName) {
            case 'random':
                return RandomStrategy;
            case 'fronttoback':
                return FrontToBackStrategy;
            case 'backtofront':
                return BackToFrontStrategy;
            case 'reversepyramid':
                return ReversePyramidStrategy;
            case 'steffenperfect':
                return SteffenPerfectStrategy;
        }
    }
}

export default Simulation;
