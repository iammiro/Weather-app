import {appSettings, units} from './settings.js';
import {RenderTemplate} from "../components/RenderTemplate";

const data = new RenderTemplate();

const getForecastFromApi = (latitude, longitude) => {
    let url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}?units=${units.get('units')}`;
    fetch(url, appSettings.init)
        .then(function (response) {
            return response.json();
        })
        .then(function (myBlob) {
            return myBlob.daily;
        })
        .then(function (temp) {
            data.render(temp);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export {getForecastFromApi};
