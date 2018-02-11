import style from '../css/style.css';
import images from '../img';

import {getCurrentUserPosition} from "./currentUserGeolocation";
import {getForecastFromApi} from "./api";
import {handlingUserInput} from "./userInput";
import {getParamFromUrl} from "./url";
import {currentUserPosition} from "./settings";
import {setUnits} from "./setUnits";
import {createForecastTemplate} from "./createTemplate";
import {setCityToRecentlyFavoriteCities} from "./recentlyViewedCities";

const currentUserPositionButton = document.getElementById('currentPos');
const submitButton = document.getElementById('submit');
const inputField = document.getElementById('address');
const addToFavorite = document.getElementById('addToFav');

window.onpopstate = () => {
    getParamFromUrl();
    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
};

currentUserPositionButton.addEventListener("click", getCurrentUserPosition);
submitButton.addEventListener('click', handlingUserInput);
addToFavorite.addEventListener('click', setCityToRecentlyFavoriteCities);
inputField.addEventListener('keyup', function (event) {
    if (event.which === 13) {
        handlingUserInput();
    }
});

const initApp = () => {
    setUnits('si');
    getParamFromUrl();
    createForecastTemplate();
    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    getParamFromUrl();
};

initApp();
