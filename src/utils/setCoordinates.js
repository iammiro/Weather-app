import {currentUserPosition} from "./settings";

const setCoordinatesToMapStorage = (latitude, longitude) => {
    currentUserPosition.set('latitude', latitude);
    currentUserPosition.set('longitude', longitude);
};

export {setCoordinatesToMapStorage};
