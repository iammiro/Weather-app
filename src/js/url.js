import {currentUserPosition, defaultCoordinates} from "./settings";
import {addHistoryState} from "./historyState";
import {setCoordinatesToMapStorage} from "./setCoordinates";

const getCoordinatesFromUrl = () => {
    let parsedUrl = new URL(window.location.href);
    let params = new URLSearchParams(parsedUrl.search.slice(1));
    params.set('lat', currentUserPosition.get('latitude'));
    params.set('lang', currentUserPosition.get('longitude'));
    addHistoryState(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
};

const getParamFromUrl = () => {
    let parsedUrl = new URL(window.location.href);
    let lat = (parsedUrl.searchParams.get("lat"));
    let lang = (parsedUrl.searchParams.get("lang"));
    if (lat && lang) {
        setCoordinatesToMapStorage(lat, lang);
    } else {
        setCoordinatesToMapStorage(defaultCoordinates[0], defaultCoordinates[1]);
        addHistoryState(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    }
};

export {getCoordinatesFromUrl, getParamFromUrl};
