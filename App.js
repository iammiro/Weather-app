import style from './src/css/style.css';
import images from './src/img/index';



import {GetForecastFromApiClass} from "./src/utils/api";
import {LocationSearch} from "./src/components/LocationSearch";
import {getParamFromUrl} from "./src/components/url";
import {currentUserPosition} from "./src/components/settings";
import {setUnits} from "./src/components/setUnits";
import {
    getListOfFavoriteCitiesFromLocalStorage,
    getFavoriteCityForecastFromApi
} from "./src/components/recentlyViewedCities";
import {RecentlyCities} from './src/components/RecentlyCities';
import{CurrentUserLocation} from "./src/components/CurrentUserLocation";
import{FavoriteCities} from "./src/components/FavoriteCities";

// const addToFavorite = document.getElementById('addToFav');
const favoriteCitiesBlock = document.getElementById('favorite-cities-block');

window.onpopstate = () => {
    getParamFromUrl();
    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
};

// addToFavorite.addEventListener('click', setCityToRecentlyFavoriteCities);

favoriteCitiesBlock.addEventListener("change", getFavoriteCityForecastFromApi);

const initApp = () => {
    getListOfFavoriteCitiesFromLocalStorage();
    setUnits('si');
    getParamFromUrl();
    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    getParamFromUrl();
};

initApp();

class App {
    constructor() {
        // this.host = document.getElementById('root');
        this.form = new LocationSearch();
        this.current = new CurrentUserLocation();
        this.fav = new FavoriteCities();
        this.getForecast = new GetForecastFromApiClass();
    }

    render() {
        this.form.render();
        this.current.render();
        this.fav.render();
        this.getForecast.getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
        // this.host.appendChild(this.form.render());
    }
}

export {App};
