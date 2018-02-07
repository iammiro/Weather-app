import style from '../css/style.css';
import images from '../img';

import {getCurrentUserPosition} from "./geolocation";
import {getForecastFromApi} from "./api";
import {handlingUserInput} from "./userInput";
import {getParamFromUrl} from "./url";
import {currentUserPosition} from "./settings";
import {initApp} from "./init";

// const temp = true;

// const geocoding = new Promise(
//     (resolve, reject) => {
//         getCurrentUserPosition();
//         if (temp) {
//             resolve(temp)
//         } else {
//             let error = new Error('Error.');
//             reject(error)
//         }
//     }
// );

// const getPos = (getTodayForecastFromApi, getWeekForecastFromApi) => {
//     console.log('test');
//     geocoding
//         .then(getTodayForecastFromApi)
//         .then(getWeekForecastFromApi)
//         .catch(error => console.log(error));
// };

// document.getElementById('currentPos').addEventListener("click", getPos(
//     getTodayForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude')),
//     getWeekForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'))
// ));

window.onpopstate = () => {
    getParamFromUrl();
    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
};

document.getElementById('submit').addEventListener('click', handlingUserInput);

initApp();
