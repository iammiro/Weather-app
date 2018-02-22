import {getForecastFromApi} from "../utils/api";
import {setCoordinatesToMapStorage} from "../utils/setCoordinates";
import {addHistoryState} from "../utils/historyState";


class CurrentUserLocation {
    constructor() {
        this.state = {
            isValid: true
        };
        this.getCurrentUserPosition = this.getCurrentUserPosition.bind(this);
        this.host = document.getElementById('input-search-container');
        this.currentUserPositionButton = document.getElementById('currentPos');
        // this.currentUserPositionButton.addEventListener("click", this.getCurrentUserPosition);
    }

    getCurrentUserPosition() {
        navigator.geolocation.getCurrentPosition(pos => {
                let crd = pos.coords;
                setCoordinatesToMapStorage(crd.latitude, crd.longitude);
                addHistoryState(crd.latitude, crd.longitude);
                getForecastFromApi(crd.latitude, crd.longitude);
            }, err => console.warn(`ERROR(${err.code}): ${err.message}`),
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
    }

    render() {
        const {isValid} = this.state;
        this.host.innerHTML += `<button id="currentPos" class="${isValid ? 'btn-small' : 'btn-small-invalid'}"><img src="img/target.svg"></button>`;
        return this.host;
    }
}

export {CurrentUserLocation};
