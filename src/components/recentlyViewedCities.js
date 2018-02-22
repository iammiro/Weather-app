import {currentUserPosition, recentlyViewedCities, favoriteCities} from "./settings";
import {addHistoryState} from "./historyState";
import {getForecastFromApi} from "../utils/api";
import {createRecentlyViewedCitiesBlockItem, createFavoriteCitiesBlockItem} from "./createTemplate";
import {setCoordinatesToMapStorage} from "./setCoordinates";

// const setCityToRecentlyViewedCities = (latitude, longitude) => {
//     let address = document.getElementById('address').value;
//     recentlyViewedCities.set(`${address}`, [latitude, longitude]);
//     let coordinates = recentlyViewedCities.get(`${address}`);
//     let lat = coordinates[0];
//     let lang = coordinates[1];
//
//     createRecentlyViewedCitiesBlockItem(address);
//
//     document.getElementById(`${address}`).addEventListener('click', () => {
//         setCoordinatesToMapStorage(lat, lang);
//         addHistoryState(lat, lang);
//         getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
//     });
// };

const setCityToRecentlyFavoriteCities = () => {
    let address = document.getElementById('address').value;
    favoriteCities.setItem(`${address}`, `${address};${currentUserPosition.get('latitude')};${currentUserPosition.get('longitude')}`);
    console.log(favoriteCities.getItem(`${address}`));
    createFavoriteCitiesBlockItem(address);
};

const getListOfFavoriteCitiesFromLocalStorage = () => {
    for (let i = 0, len = localStorage.length; i < len; ++i) {
        createFavoriteCitiesBlockItem(localStorage.getItem(localStorage.key(i)));
    }
};

const getFavoriteCityForecastFromApi = () => {
    let selector = document.getElementById('favorite-cities-block');
    let value = selector[selector.selectedIndex].value;
    console.log(value);
};

export {
    // setCityToRecentlyViewedCities,
    setCityToRecentlyFavoriteCities,
    getListOfFavoriteCitiesFromLocalStorage,
    getFavoriteCityForecastFromApi
};
