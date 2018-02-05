import {currentUserPosition, favoriteCities} from "./settings";
import {addHistoryState} from "./historyState";
import {getTodayForecastFromApi, getWeekForecastFromApi} from "./api";
import {renderRecentlyViewedCitiesBlockItem} from "./renderTemplate";
import {setCoordinatesToMapStorage} from "./setCoordinates";

const setCityToFavorite = () => {
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

export {setCityToFavorite};
