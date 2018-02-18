import {getForecastFromApi} from "../utils/api";
import {setCityToRecentlyViewedCities} from "./recentlyViewedCities";
import {setCoordinatesToMapStorage} from "./setCoordinates";
import {getParamFromUrl, getCoordinatesFromUrl} from "./url";
import {currentUserPosition} from "./settings";

class LocationSearch {
    constructor() {
        this.state = {
            isValid: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.host = document.getElementById('input-search-container');
        this.host.addEventListener('submit', this.handleSubmit);
    }

    updateState(nextState) {
        this.state = nextState;
        this.render();
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const city = ev.target.elements.search.value.trim();
        if (!city.length) {
            this.updateState({isValid: false});
        } else {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': city}, function (results, status) {
                if (status === 'OK') {
                    setCoordinatesToMapStorage(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    getCoordinatesFromUrl();
                    setCityToRecentlyViewedCities(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
                    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
                    getParamFromUrl();
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
    }

    render() {
        const {isValid} = this.state;
        this.host.innerHTML = `<form class="option ${isValid ? 'address' : 'address-invalid'}">
                                    <button id="currentPos" class="btn-small"><img src="img/target.svg"></button>
                                    <label for="address" id="input-search-container">
                                        <input id="address" type="text" name="search" class="address-input" placeholder="TYPE CITY NAME">
                                    </label>
                                    <button id="submit" class="btn-small"><img src="img/search.svg"></button>
                                    <button id="addToFav" class="btn-small"><img src="img/add.svg"></button>
                                </form>`;
        return this.host;
    }
}

export {LocationSearch};
