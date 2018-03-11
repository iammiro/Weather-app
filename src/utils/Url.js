import {appSettings, currentUserPosition, defaultCoordinates} from "./settings";
import {setCoordinatesToMapStorage} from "./setCoordinates";

class HandlingURL {
    constructor() {
        this.parsedUrl = new URL(window.location.href);
    }

    getCoordinatesFromUrl() {
        let params = new URLSearchParams(this.parsedUrl.search.slice(1));
        params.set('lat', currentUserPosition.get('latitude'));
        params.set('lang', currentUserPosition.get('longitude'));
        this.addHistoryState(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
        return params;
    }

    getParamFromUrl() {
        let lat = (this.parsedUrl.searchParams.get("lat"));
        let lang = (this.parsedUrl.searchParams.get("lang"));
        if (lat && lang) {
            setCoordinatesToMapStorage(lat, lang);
        } else {
            setCoordinatesToMapStorage(defaultCoordinates[0], defaultCoordinates[1]);
            this.addHistoryState(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
        }

    }

    addHistoryState(latitude, longitude) {
        history.pushState(
            '',
            'Weather App',
            `${appSettings.appURL}?lat=${latitude}&lang=${longitude}`);
    };

}

export {HandlingURL};
