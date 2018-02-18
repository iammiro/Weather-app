import style from './src/css/style.css';
import images from './src/img/index';

import {getCurrentUserPosition} from "./src/components/currentUserGeolocation";
import {getForecastFromApi} from "./src/components/api";
import {LocationSearch} from "./src/components/LocationSearch";
import {getParamFromUrl} from "./src/components/url";
import {currentUserPosition} from "./src/components/settings";
import {setUnits} from "./src/components/setUnits";
import {createForecastTemplate} from "./src/components/createTemplate";
import {
    setCityToRecentlyFavoriteCities,
    getListOfFavoriteCitiesFromLocalStorage,
    getFavoriteCityForecastFromApi
} from "./src/components/recentlyViewedCities";

// const currentUserPositionButton = document.getElementById('currentPos');
// const addToFavorite = document.getElementById('addToFav');
const favoriteCitiesBlock = document.getElementById('favorite-cities-block');

window.onpopstate = () => {
    getParamFromUrl();
    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
};
// currentUserPositionButton.addEventListener("click", getCurrentUserPosition);
// addToFavorite.addEventListener('click', setCityToRecentlyFavoriteCities);

favoriteCitiesBlock.addEventListener("change", getFavoriteCityForecastFromApi);

const initApp = () => {
    getListOfFavoriteCitiesFromLocalStorage();
    setUnits('si');
    getParamFromUrl();
    createForecastTemplate();
    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    getParamFromUrl();
};

initApp();

class App {
    constructor() {
        this.host = document.getElementById('root');
        this.form = new LocationSearch();
    }

    render() {
        this.host.appendChild(this.form.render());
    }
}

export {App};
