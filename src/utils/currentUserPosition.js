import {setCoordinatesToMapStorage} from "./setCoordinates";
import getForecastFromApi from "./api";
import HandlingURL from "./Url";

const url = new HandlingURL();

const getCurrentUserPosition = (e) => {
    if (e.target && e.target.matches("#currentPos")) {
        navigator.geolocation.getCurrentPosition(pos => {
                let crd = pos.coords;
                setCoordinatesToMapStorage(crd.latitude, crd.longitude);
                url.addHistoryState(crd.latitude, crd.longitude);
                getForecastFromApi(crd.latitude, crd.longitude);
                document.getElementById('address').value = `${crd.latitude.toFixed(3)}, ${crd.longitude.toFixed(3)}`;
            }, err => console.warn(`ERROR(${err.code}): ${err.message}`),
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
    }
};

export default getCurrentUserPosition;
