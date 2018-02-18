import {appSettings, units} from '../components/settings.js';
import {renderForecast} from "../components/renderTemplate";

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
