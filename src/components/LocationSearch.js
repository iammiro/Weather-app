import {getForecastFromApi} from "../utils/api";
import {setCoordinatesToMapStorage} from "../utils/setCoordinates";
import {HandlingURL} from "../utils/Url";
import {currentUserPosition} from "../utils/settings";
import {RecentlyCities} from "./RecentlyCities";

class LocationSearch {
    constructor(props) {
        this.state = {
            isValid: true
        };
        this.props = props;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.host = document.getElementById('input-search-container');
        this.host.addEventListener('submit', this.handleSubmit);
    }

    updateState(nextState) {
        this.state = nextState;
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const city = ev.target.elements.search.value.trim();
        if (!city.length) {
            this.updateState({isValid: false});
        } else {
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
    }

    render() {
        const {isValid} = this.state;
        const {city} = this.props;
        this.host.innerHTML = `<form class="option ${isValid ? 'address' : 'address-invalid'}">
                                    <label for="address" id="">
                                        <input id="address" type="text" name="search" required class="address-input" placeholder="TYPE CITY NAME" value="${city}">
                                    </label>
                                    <button id="submit" class="btn-small"></button>
                                </form>`;
        return this.host;
    }
}

export {LocationSearch};
