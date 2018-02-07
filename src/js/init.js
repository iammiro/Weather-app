import {setUnits} from "./setUnits";
import {createForecastTemplate} from "./createTemplate";
import {getParamFromUrl} from "./url";
import {getForecastFromApi} from "./api";
import {currentUserPosition} from "./settings";

const initApp = () => {
    setUnits('si');
    getParamFromUrl();
    createForecastTemplate();
    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    getParamFromUrl();
};

export {initApp};
