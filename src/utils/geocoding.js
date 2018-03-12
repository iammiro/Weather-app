import {currentUserPosition} from "./settings";
import {setCoordinatesToMapStorage} from "./setCoordinates";
import {RecentlyCities} from "../components/RecentlyCities";
import {getForecastFromApi} from "./api";
import {HandlingURL} from "./Url";

const geocodCityName = (city) => {
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
};

export {geocodCityName};