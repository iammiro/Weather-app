import {appSettings, defaultCoordinates, currentUserPosition, favoriteCities, units} from './settings.js';
import {renderTodayForecast, renderWeekForecast} from "./render";

const getTodayForecastFromApi = () => {
    let latitude = currentUserPosition.get('latitude');
    let longitude = currentUserPosition.get('longitude');
    let url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}?units=${units.get('units')}`;
    fetch(url, appSettings.init)
        .then((response) => response.json())
        .then(data => {
            renderTodayForecast(data);
        })
        .catch(function (error) {
            console.log(error);
        });
};

const getWeekForecastFromApi = () => {
    let latitude = currentUserPosition.get('latitude');
    let longitude = currentUserPosition.get('longitude');
    let url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}?units=${units.get('units')}`;
    fetch(url, appSettings.init)
        .then((response) => response.json())
        .then(function (data) {
            renderWeekForecast(data);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export {getTodayForecastFromApi, getWeekForecastFromApi};
