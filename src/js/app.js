import style from '../css/style.css';
import img0 from '../img/animated/cloudy.svg';
import img2 from '../img/animated/cloudy-day-1.svg';
import img3 from '../img/animated/cloudy-day-2.svg';
import img4 from '../img/animated/cloudy-day-3.svg';
import img5 from '../img/animated/cloudy-night-1.svg';
import img6 from '../img/animated/cloudy-night-2.svg';
import img7 from '../img/animated/cloudy-night-3.svg';
import img8 from '../img/animated/day.svg';
import img9 from '../img/animated/night.svg';
import img10 from '../img/animated/rainy-1.svg';
import img11 from '../img/animated/rainy-2.svg';
import img13 from '../img/animated/rainy-3.svg';
import img14 from '../img/animated/rainy-4.svg';
import img15 from '../img/animated/rainy-5.svg';
import img16 from '../img/animated/rainy-6.svg';
import img17 from '../img/animated/rainy-7.svg';
import img18 from '../img/animated/snowy-1.svg';
import img19 from '../img/animated/snowy-2.svg';
import img20 from '../img/animated/snowy-3.svg';
import img21 from '../img/animated/snowy-4.svg';
import img22 from '../img/animated/snowy-5.svg';
import img23 from '../img/animated/snowy-6.svg';
import img24 from '../img/animated/thunder.svg';
import img25 from '../img/animated/weather.svg';
import img26 from '../img/animated/weather-sprite.svg';
import img27 from '../img/animated/weather_sagittarius.svg';
import img28 from '../img/animated/weather_sunset.svg';
import img29 from '../img/clear-day.svg';
import img30 from '../img/clear-night.svg';
import img31 from '../img/cloudy.svg';
import img32 from '../img/cross-shaped-target.svg';
import img33 from '../img/fog.svg';
import img34 from '../img/magnifier.svg';
import img35 from '../img/partly-cloudy-day.svg';
import img36 from '../img/partly-cloudy-night.svg';
import img37 from '../img/rain.svg';
import img38 from '../img/sleet.svg';
import img39 from '../img/snow.svg';
import img40 from '../img/wind.svg';

import { appSettings, defaultCoordinates, currentUserPosition, favoriteCities, units } from './settings.js';
import { getTodayForecastFromApi, getWeekForecastFromApi } from "./api";
import { renderTodayForecast, renderWeekForecast } from "./render";
import { renderForecastItem, renderForecastImgItem } from "./renderTemplate";
import { getCurrentUserPosition } from "./geolocation";
import { setUnits } from "./setUnits";

let getParamFromUrl = () => {
    let parsedUrl = new URL(window.location.href);
    let lat = (parsedUrl.searchParams.get("lat"));
    let lang = (parsedUrl.searchParams.get("lang"));
    if (lat && lang) {
        setCoordinatesToMapStorage(lat, lang);
    } else {
        setCoordinatesToMapStorage(defaultCoordinates[0], defaultCoordinates[1]);
        addHistoryState(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    }
};

document.getElementById('currentPos').addEventListener("click", () => {
    getCurrentUserPosition();
    setTimeout(() => {
        getTodayForecastFromApi();
        getWeekForecastFromApi();
    }, 1000);
});

let getAndGeocodingUserInput = () => {
    const geocoder = new google.maps.Geocoder();
    let address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
            setCoordinatesToMapStorage(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            getCoordinatesFromUrl();
            setCityToFavorite();
            getTodayForecastFromApi();
            getWeekForecastFromApi();
            getParamFromUrl();
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
};

let getCoordinatesFromUrl = () => {
    let parsedUrl = new URL(window.location.href);
    let params = new URLSearchParams(parsedUrl.search.slice(1));
    params.set('lat', currentUserPosition.get('latitude'));
    params.set('lang', currentUserPosition.get('longitude'));
    addHistoryState(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
};

let addHistoryState = (latitude, longitude) => {
    history.pushState(
        'data to be passed',
        'Weather App',
        `${appSettings.appURL}?lat=${latitude}&lang=${longitude}`);
};

window.onpopstate = () => {
    getParamFromUrl();
    getTodayForecastFromApi();
    getWeekForecastFromApi();
};

let setCoordinatesToMapStorage = (latitude, longitude) => {
    currentUserPosition.set('latitude', latitude);
    currentUserPosition.set('longitude', longitude);
};

let setCityToFavorite = () => {
    let address = document.getElementById('address').value;
    favoriteCities.set(`${address}`, [currentUserPosition.get('latitude'), currentUserPosition.get('longitude')]);
    let coordinates = favoriteCities.get(`${address}`);
    let lat = coordinates[0];
    let lang = coordinates[1];

    renderRecentlyViewedCitiesBlockItem(address);

    document.getElementById(`${address}`).addEventListener('click', () => {
        setCoordinatesToMapStorage(lat, lang);
        addHistoryState(lat, lang);
        getTodayForecastFromApi();
        getWeekForecastFromApi();
    });
};

document.getElementById('submit').addEventListener('click', getAndGeocodingUserInput);

let createContentWrapper = () => {
    const contentWrapper = document.createElement('div');
    contentWrapper.id = 'content-wrapper';
    appSettings.container.appendChild(contentWrapper);
};

let createForecastItem = (parentElement, createdElement, createdElementId, itemClass) => {
    let item = document.createElement(createdElement);
    item.id = createdElementId;
    item.classList = itemClass;
    parentElement.appendChild(item);
};

let renderTodayForecastTemplate = () => {
    const contentWrapper = document.getElementById('content-wrapper');

    const todayForecastWrapper = document.createElement('div');
    todayForecastWrapper.id = "today-forecast-wrapper";

    const todayForecastHeaderWrapper = document.createElement('div');
    todayForecastHeaderWrapper.className = "today-forecast-header-wrapper";

    const todayForecastBodyWrapper = document.createElement('div');
    todayForecastBodyWrapper.className = "today-forecast-body-wrapper";

    createForecastItem(todayForecastHeaderWrapper, 'div', 'windSpeed');
    createForecastItem(todayForecastHeaderWrapper, 'div', 'humidity');
    createForecastItem(todayForecastHeaderWrapper, 'div', 'dewPoint');
    createForecastItem(todayForecastHeaderWrapper, 'div', 'uvIndex');
    createForecastItem(todayForecastHeaderWrapper, 'div', 'visibility');
    createForecastItem(todayForecastHeaderWrapper, 'div', 'pressure');
    createForecastItem(todayForecastBodyWrapper, 'img', 'icon');
    createForecastItem(todayForecastBodyWrapper, 'h1', 'summary');
    createForecastItem(todayForecastBodyWrapper, 'h2', 'hourlySummary');

    todayForecastWrapper.appendChild(todayForecastHeaderWrapper);

    todayForecastWrapper.appendChild(todayForecastBodyWrapper);

    contentWrapper.appendChild(todayForecastWrapper);
    renderRecentlyViewedCitiesBlock(contentWrapper);
};

let renderRecentlyViewedCitiesBlock = (parentElement) => {
    createForecastItem(parentElement, 'div', 'recently-viewed-cities-block');
    createForecastItem(parentElement, 'h3', 'recently-viewed-cities-block-header');
    renderForecastItem('recently-viewed-cities-block-header', 'Recently viewed cities:');
};

let renderRecentlyViewedCitiesBlockItem = (address) => {
    createForecastItem(document.getElementById('recently-viewed-cities-block'), 'div', `${address}`);
    renderForecastItem(`${address}`, `${address}`)
};

let renderWeekForecastTemplate = () => {
    const weekForecastWrapper = document.createElement('div');
    weekForecastWrapper.id = "week-forecast-wrapper";

    for (let i = 0; i < 8; i++) {
        const headerWrapperMain = document.createElement('div');
        headerWrapperMain.className = "header-wrapper accordion";

        createForecastItem(headerWrapperMain, 'img', `icon-${i}`);
        createForecastItem(headerWrapperMain, 'h1', `header-${i}`, 'week-forecast-header');
        createForecastItem(headerWrapperMain, 'h3', `under-header-${i}`, 'week-forecast-day-temperature');

        weekForecastWrapper.appendChild(headerWrapperMain);

        const innerWrapper = document.createElement('div');
        innerWrapper.className = "panel";

        createForecastItem(innerWrapper, 'h2', `summary-${i}`);
        createForecastItem(innerWrapper, 'h1', `temperature-${i}`);

        const innerWrapperMain = document.createElement('div');
        innerWrapperMain.className = "inner-wrapper";

        createForecastItem(innerWrapperMain, 'div', `windSpeed-${i}`);
        createForecastItem(innerWrapperMain, 'div', `humidity-${i}`);
        createForecastItem(innerWrapperMain, 'div', `dewPoint-${i}`);
        createForecastItem(innerWrapperMain, 'div', `uvIndex-${i}`);
        createForecastItem(innerWrapperMain, 'div', `pressure-${i}`);

        innerWrapper.appendChild(innerWrapperMain);

        weekForecastWrapper.appendChild(innerWrapper);
    }
    let contentWrapper = document.getElementById('content-wrapper');
    contentWrapper.appendChild(weekForecastWrapper);

    appSettings.container.appendChild(contentWrapper);

    accordionForWeekForecast();
};

let accordionForWeekForecast = () => {
    const el = document.getElementById('week-forecast-wrapper');
    el.addEventListener("click", function (event) {
        if (event.target.classList.contains('accordion')) {
            event.target.classList.toggle("active");
            let panel = event.target.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    })
};

let initApp = new Promise(function (resolve, reject) {
    setUnits('si');
    getParamFromUrl();
    resolve("result");
    reject("error");
});

initApp.then(
    () => {
        createContentWrapper();
        renderTodayForecastTemplate();
        renderWeekForecastTemplate();
        getTodayForecastFromApi();
        getParamFromUrl();
    },
    error => {
        console.log(error);
    }
).then(
    () => {
        getWeekForecastFromApi();
    },
    error => {
        console.log(error);
    }
);