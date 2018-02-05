import style from '../css/style.css';
import images from '../img';

import {getTodayForecastFromApi, getWeekForecastFromApi} from "./api";
import {renderTodayForecastTemplate, renderWeekForecastTemplate} from "./renderTemplate";
import {getCurrentUserPosition} from "./geolocation";
import {setUnits} from "./setUnits";
import {handlingUserInput} from "./userInput";
import {getParamFromUrl} from "./url";
import {createContentWrapper} from "./renderTemplate";
import {appSettings, defaultCoordinates, currentUserPosition, favoriteCities, units} from "./settings";

const handlingUserPosition = () => {
    getCurrentUserPosition();
    setTimeout(() => {
        getTodayForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
        getWeekForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    }, 1000);
};

document.getElementById('currentPos').addEventListener("click", handlingUserPosition);

window.onpopstate = () => {
    getParamFromUrl();
    getTodayForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    getWeekForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
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
        getTodayForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
        getParamFromUrl();
    },
    error => {
        console.log(error);
    }
).then(
    () => {
        getWeekForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    },
    error => {
        console.log(error);
    }
);
