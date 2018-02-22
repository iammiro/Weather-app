import {appSettings, units} from './settings.js';
import {RenderTemplateClass} from "../components/RenderTemplateClass";

let data = new RenderTemplateClass();

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

// class GetForecastFromApiClass {
//     constructor() {
//         this.data = new RenderTemplateClass();
//     }
//
//     getForecastFromApi(latitude, longitude) {
//         let url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}?units=${units.get('units')}`;
//         fetch(url, appSettings.init)
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (myBlob) {
//                 return myBlob.daily;
//             })
//             .then(function (temp) {
//                 this.data.render(temp);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }
// }

export {getForecastFromApi};
