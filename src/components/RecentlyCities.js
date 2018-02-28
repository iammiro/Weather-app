import {currentUserPosition, recentlyViewedCities} from "../utils/settings";
import {HandlingURL} from "../utils/Url";
import {getForecastFromApi} from "../utils/api";
import {setCoordinatesToMapStorage} from "../utils/setCoordinates";

class RecentlyCities {
    constructor() {
        this.state = {
            isValid: true
        };
        this.showRecentCityForecast = this.showRecentCityForecast.bind(this);
        this.host = document.getElementById('recently-viewed-cities-block');
        this.host.addEventListener('click', this.showRecentCityForecast);
        this.url = new HandlingURL();
    }

    setCityToRecentlyViewedCities(latitude, longitude) {
        let address = document.getElementById('address').value;
        recentlyViewedCities.set(`${address}`, [latitude, longitude]);
        let coordinates = recentlyViewedCities.get(`${address}`);
        let lat = coordinates[0];
        let lang = coordinates[1];

        this.render(address);

        document.getElementById(`${address}`).addEventListener('click', () => {
            setCoordinatesToMapStorage(lat, lang);
            this.url.addHistoryState(lat, lang);
            getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
        });
    }

    showRecentCityForecast(e) {
        console.log(e.target.id);
        for (let i = 0; i++; i > recentlyViewedCities.length) {
            if (e.target && e.target.matches(`#${address}`)) {
                setCoordinatesToMapStorage(lat, lang);
                this.url.addHistoryState(lat, lang);
                getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
                console.log('test');
            }
        }
    }

    render(address) {
        const {isValid} = this.state;
        this.host.innerHTML += `<li id="${address}" class="${isValid ? 'recently' : 'recently-invalid'}">${address}</li>`;
        return this.host;
    }

}

export {RecentlyCities};
