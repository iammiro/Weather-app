import style from '../css/style.css';
import images from '../img';

import {getTodayForecastFromApi, getWeekForecastFromApi} from "./api";
import {renderTodayForecastTemplate, renderWeekForecastTemplate} from "./renderTemplate";
import {getCurrentUserPosition} from "./geolocation";
import {setUnits} from "./setUnits";
import {handlingUserInput} from "./userInput";
import {getParamFromUrl} from "./url";
import {createContentWrapper} from "./renderTemplate";

document.getElementById('currentPos').addEventListener("click", () => {
    getCurrentUserPosition();
    setTimeout(() => {
        getTodayForecastFromApi();
        getWeekForecastFromApi();
    }, 1000);
});

window.onpopstate = () => {
    getParamFromUrl();
    getTodayForecastFromApi();
    getWeekForecastFromApi();
};

document.getElementById('submit').addEventListener('click', handlingUserInput);

const initApp = new Promise(function (resolve, reject) {
    setUnits('si');
    getParamFromUrl();
    resolve("result");
    reject("error");
});

initApp.then(
    () => {
        createContentWrapper();
        renderTodayForecastTemplate();
        renderWeekForecastTemplate();
        getTodayForecastFromApi();
        getParamFromUrl();
    },
    error => {
        console.log(error);
    }
).then(
    () => {
        getWeekForecastFromApi();
    },
    error => {
        console.log(error);
    }
);
