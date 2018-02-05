import {setCoordinatesToMapStorage} from "./setCoordinates";
import {addHistoryState} from "./historyState";

const getCurrentUserPosition = () => {
    navigator.geolocation.getCurrentPosition(pos => {
            let crd = pos.coords;
            setCoordinatesToMapStorage(crd.latitude, crd.longitude);

            addHistoryState(crd.latitude, crd.longitude);
        }, err => console.warn(`ERROR(${err.code}): ${err.message}`),
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
};

export {getCurrentUserPosition};
