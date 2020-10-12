import { appSettings, units } from './settings';
import RenderTemplate from '../components/RenderTemplate';

const renderTemplate = new RenderTemplate();

const getForecastFromApi = (latitude, longitude) => {
  const url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}?units=${units.get('units')}`;
  fetch(url, appSettings.init)
    .then((response) => response.json())
    .then((myBlob) => myBlob.daily)
    .then((res) => {
      renderTemplate.render(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getForecastFromApi;
