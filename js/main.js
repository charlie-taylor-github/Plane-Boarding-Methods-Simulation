import Window from "./window.js";
import Simulation from "./simulation.js";

const startBtn = $('#start-txt')[0];
const backBtn = $('#back-btn')[0];

const canvas = $('#main-window')[0];
const window = new Window(canvas);

let simulation = null;
let currentWindow = 'config';

const widthHeightRatio = 85 / 35
const width = 2000;

canvas.width = width;
canvas.height = width / widthHeightRatio;

const startSimulation = () => {
    setSimulation();
    swapWindows();
}


const setSimulation = () => {
    const rows = Number($('#plane-rows')[0].value);
    const cols = Number($('#plane-cols')[0].value);
    const aisleCol = Number($('#aisle-col')[0].value);
    const moveSpeed = Number($('#move-speed')[0].value);
    const meanStoreTime = Number($('#store-mean')[0].value);
    const storeTimeDeviation = Number($('#store-dev')[0].value);
    const meanShuffleTime = Number($('#shuffle-mean')[0].value);
    const shuffleTimeDeviation = Number($('#shuffle-dev')[0].value);
    const strategyName = $('#strategy')[0].value;
    const animationSpeed = Number($('#animation-speed')[0].value);

    simulation = new Simulation(
        rows, cols, aisleCol, moveSpeed,
        meanStoreTime, storeTimeDeviation,
        meanShuffleTime, shuffleTimeDeviation,
        strategyName, animationSpeed, window
    );
}


const swapWindows = () => {
    const configSection = $('#config-menu')[0];
    const simSection = $('#simulation-section')[0];

    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (currentWindow == 'config') {
        currentWindow = 'simulation';
        gsap.to(configSection, { x: '-100vw', duration: 1, ease: 'power2' });
        gsap.to(simSection, { x: '0vw', duration: 1, ease: 'power2' });
        return;
    }
    currentWindow = 'config';
    gsap.to(configSection, { x: '0vw', duration: 1, ease: 'power2' });
    gsap.to(simSection, { x: '100vw', duration: 1, ease: 'power2' })
        .then(() => { simulation = null });
}


const updateDataText = () => {
    const dc = simulation.dataCollector;
    const data = {
        'total-passengers': dc.totalPassengers,
        'seated-passengers': dc.boardedPassengers,
        'percentage-seated': dc.percentageBoarded,
        'passengers-waiting': dc.currentPassengersWaiting,
        'time-elapsed': dc.totalBoardingTime,
        'avg-boarding-time': dc.averageBoardingTime,
        'total-time-waiting': dc.totalWaitingTime,
        'avg-time-waiting': dc.averageWaitingTime,
        'seat-shuffles': dc.totalSeatShuffles,
        'avg-seat-shuffles': dc.averageSeatShuffles,
        'storage-stops': dc.totalStorageStops,
        'avg-storage-stops': dc.averageStorageStops
    };

    for (const [id, value] of Object.entries(data)) {
        let fValue = value;
        if (Number.isNaN(fValue) || !Number.isFinite(fValue)) fValue = 0;
        if (!Number.isInteger(fValue)) fValue = fValue.toFixed(2);
        $(`#${id}`)[0].value = fValue;
    }
}


const update = (ctx, interval) => {
    if (simulation) {
        simulation.update(ctx, interval);
        updateDataText();
    }
}


const init = () => {
    window.setUpdate(update);
    window.startLoop();
}


startBtn.onclick = startSimulation;
backBtn.onclick = swapWindows;
onload = init;
