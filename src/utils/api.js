import {appSettings, units} from './settings.js';
import RenderTemplate from "../components/RenderTemplate";

const _renderTemplate = new RenderTemplate();

const getForecastFromApi = (latitude, longitude) => {
    let url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}?units=${units.get('units')}`;
    fetch(url, appSettings.init)
        .then(function (response) {
            return response.json();
        })
        .then(function (myBlob) {
            return myBlob.daily;
        })
        .then(function (res) {
            _renderTemplate.render(res);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export default getForecastFromApi;
