const appSettings = {
    container: document.getElementById('container'),
    apiUrl: 'https://api.darksky.net/forecast/',
    proxy: 'https://cors-anywhere.herokuapp.com/',
    apiKey: 'c0edd7e111d453106e09ff75c17397b8',
    // appURL: 'https://iammiro.github.io/Weather-app/dist/',
    appURL: 'http://localhost:8080/',
    init: {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
};
let forecast = new Map();
let currentUserPosition = new Map();
let recentlyViewedCities = new Map();
let favoriteCities = window.localStorage;
let units = new Map();
const defaultCoordinates = [50.4501, 30.5241];

export {appSettings, defaultCoordinates, currentUserPosition, recentlyViewedCities, units, favoriteCities, forecast};
