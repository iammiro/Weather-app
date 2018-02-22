import {currentUserPosition, recentlyViewedCities} from "../utils/settings";
import {addHistoryState} from "../utils/historyState";
import {getForecastFromApi} from "../utils/api";
import {createRecentlyViewedCitiesBlockItem} from "./createTemplate";
import {setCoordinatesToMapStorage} from "../utils/setCoordinates";

class RecentlyCities {
    constructor() {
        this.state = {
            isValid: true
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.host = document.getElementById('recently-viewed-cities-block');
    }

    setCityToRecentlyViewedCities(latitude, longitude) {
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
    }

    render() {
        const {isValid} = this.state;
        this.host.innerHTML = `<li id="kiev" class="${isValid ? 'recently' : 'recently-invalid'}">${address}</li>`;
        return this.host;
    }

}

export {RecentlyCities};
