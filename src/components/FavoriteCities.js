import {currentUserPosition, favoriteCities} from "../utils/settings";
import {getForecastFromApi} from "../utils/api";
import {HandlingURL} from "../utils/Url";
import {setCoordinatesToMapStorage} from "../utils/setCoordinates";
import {RecentlyCities} from "./RecentlyCities";

class FavoriteCities {
    constructor() {
        this.state = {
            isValid: true
        };
        this.setCityToFavoriteCities = this.setCityToFavoriteCities.bind(this);
        this.host = document.getElementById('favorite-cities-container');
        this.host.addEventListener('click', this.setCityToFavoriteCities);
        this.host.addEventListener('change', this.getFavoriteCityForecastFromApi);


    }

    setCityToFavoriteCities(e) {
        this.select = document.getElementById('favorite-cities');
        if (e.target && e.target.matches("#addToFav")) {
            let address = document.getElementById('address').value;
            favoriteCities.setItem(`${address}`, `${address}`);
            this.select.innerHTML += `<option>${address}</option>`;

        }
    }

    getListOfFavoriteCitiesFromLocalStorage() {
        this.select = document.getElementById('favorite-cities');
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            this.select.innerHTML += `<option class="option">${localStorage.getItem(localStorage.key(i))}</option>`;
        }
    }

    getFavoriteCityForecastFromApi() {
        let selector = document.getElementById('favorite-cities');
        let value = selector[selector.selectedIndex].value;
        console.log(value);
        document.getElementById('address').value = value;
        const city = value;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': city}, function (results, status) {
            this.url = new HandlingURL();
            this.res = new RecentlyCities();
            if (status === 'OK') {
                setCoordinatesToMapStorage(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                this.url.getCoordinatesFromUrl();
                this.res.setCityToRecentlyViewedCities(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
                getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
                this.url.getParamFromUrl();
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });


    }

    render() {
        this.host.innerHTML = `<button id="addToFav" class="btn-small"></button>
                                <label for="favorite-cities"></label>
                                <select id="favorite-cities"></select>`;
        return this.host;
    }
}

export {FavoriteCities};
