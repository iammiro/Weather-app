import {appSettings, defaultCoordinates, currentUserPosition, favoriteCities, units} from './settings.js';
import {renderTodayForecast, renderWeekForecast} from "./render";

const getTodayForecastFromApi = (latitude, longitude) => {
    let url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}?units=${units.get('units')}`;
    fetch(url, appSettings.init)
        .then((response) => response.json())
        .then(renderTodayForecast)
        .catch(function (error) {
            console.log(error);
        });
};

const getWeekForecastFromApi = (latitude, longitude) => {
    let url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}?units=${units.get('units')}`;
    fetch(url, appSettings.init)
        .then((response) => response.json())
        .then(renderWeekForecast)
        .catch(function (error) {
            console.log(error);
        });
};

export {getTodayForecastFromApi, getWeekForecastFromApi};
