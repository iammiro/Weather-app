import {getForecastFromApi} from "./api";
import {setCityToRecentlyViewedCities} from "./recentlyViewedCities";
import {setCoordinatesToMapStorage} from "./setCoordinates";
import {getParamFromUrl, getCoordinatesFromUrl} from "./url";
import {currentUserPosition} from "./settings";

const handlingUserInput = () => {
    const geocoder = new google.maps.Geocoder();
    let address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function (results, status) {
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
};

export {handlingUserInput};
