import {getTodayForecastFromApi, getWeekForecastFromApi} from "./api";
import {setCityToFavorite} from "./favoriteCity";
import {setCoordinatesToMapStorage} from "./setCoordinates";
import {getParamFromUrl, getCoordinatesFromUrl} from "./url";

const handlingUserInput = () => {
    const geocoder = new google.maps.Geocoder();
    let address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
            setCoordinatesToMapStorage(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            getCoordinatesFromUrl();
            setCityToFavorite();
            getTodayForecastFromApi();
            getWeekForecastFromApi();
            getParamFromUrl();
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
};

export {handlingUserInput};
