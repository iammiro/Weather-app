import {currentUserPosition, favoriteCities} from "./settings";
import {addHistoryState} from "./historyState";
import {getForecastFromApi} from "./api";
import {createRecentlyViewedCitiesBlockItem} from "./createTemplate";
import {setCoordinatesToMapStorage} from "./setCoordinates";

const setCityToRecentlyViewedCities = (latitude, longitude) => {
    let address = document.getElementById('address').value;
    favoriteCities.set(`${address}`, [latitude, longitude]);
    let coordinates = favoriteCities.get(`${address}`);
    let lat = coordinates[0];
    let lang = coordinates[1];

    createRecentlyViewedCitiesBlockItem(address);

    document.getElementById('current-city').innerText = address;

    document.getElementById(`${address}`).addEventListener('click', () => {
        setCoordinatesToMapStorage(lat, lang);
        addHistoryState(lat, lang);
        getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    });
};

export {setCityToRecentlyViewedCities};
