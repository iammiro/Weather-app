import style from '../css/style.css';
import images from '../img';

import {getCurrentUserPosition} from "./currentUserGeolocation";
import {getForecastFromApi} from "./api";
import {handlingUserInput} from "./userInput";
import {getParamFromUrl} from "./url";
import {currentUserPosition} from "./settings";
import {setUnits} from "./setUnits";
import {createForecastTemplate} from "./createTemplate";

const currentUserPositionButton = document.getElementById('currentPos');
const submitButton = document.getElementById('submit');

window.onpopstate = () => {
    getParamFromUrl();
    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
};

currentUserPositionButton.addEventListener("click", getCurrentUserPosition);
submitButton.addEventListener('click', handlingUserInput);

const initApp = () => {
    setUnits('si');
    getParamFromUrl();
    createForecastTemplate();
    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    getParamFromUrl();
};

initApp();
