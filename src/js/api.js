import {appSettings, units} from './settings.js';
import {renderForecast} from "./renderTemplate";

const getForecastFromApi = (latitude, longitude) => {
    let url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}?units=${units.get('units')}`;
    fetch(url, appSettings.init)
        .then((response) => response.json())
        .then(renderForecast)
        .catch(function (error) {
            console.log(error);
        });
};

export {getForecastFromApi};
