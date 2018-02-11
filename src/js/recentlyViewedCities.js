import {currentUserPosition, recentlyViewedCities, favoriteCities} from "./settings";
import {addHistoryState} from "./historyState";
import {getForecastFromApi} from "./api";
import {createRecentlyViewedCitiesBlockItem, createFavoriteCitiesBlockItem} from "./createTemplate";
import {setCoordinatesToMapStorage} from "./setCoordinates";

const setCityToRecentlyViewedCities = (latitude, longitude) => {
    let address = document.getElementById('address').value;
    recentlyViewedCities.set(`${address}`, [latitude, longitude]);
    let coordinates = recentlyViewedCities.get(`${address}`);
    let lat = coordinates[0];
    let lang = coordinates[1];

    createRecentlyViewedCitiesBlockItem(address);

    document.getElementById(`${address}`).addEventListener('click', () => {
        setCoordinatesToMapStorage(lat, lang);
        addHistoryState(lat, lang);
        getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    });
};

const setCityToRecentlyFavoriteCities = () => {
    let address = document.getElementById('address').value;
    console.log(address);
    favoriteCities.setItem(`${address}`, `${address}`);
    console.log(favoriteCities.getItem(`${address}`));

    createFavoriteCitiesBlockItem(address);

    document.getElementById(`${address}-favorite-city`).addEventListener('click', () => {
        // setCoordinatesToMapStorage(lat, lang);
        // addHistoryState(lat, lang);
        // getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    });
};

export {setCityToRecentlyViewedCities, setCityToRecentlyFavoriteCities};
