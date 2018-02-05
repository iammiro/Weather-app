import {appSettings} from "./settings";

const addHistoryState = (latitude, longitude) => {
    history.pushState(
        'data to be passed',
        'Weather App',
        `${appSettings.appURL}?lat=${latitude}&lang=${longitude}`);
};

export {addHistoryState};
