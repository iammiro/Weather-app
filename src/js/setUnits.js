import {getTodayForecastFromApi, getWeekForecastFromApi} from "./api";
import {units} from "./settings";

const setUnits = (type) => {
    if (type === 'si') {
        units.set('units', 'si');
        units.set('temperature', 'C');
        units.set('speed', 'm/s');
        units.set('visibility', 'km');
    } else if (type === 'us') {
        units.set('units', 'us');
        units.set('temperature', 'F');
        units.set('speed', 'mph');
        units.set('visibility', 'mi');
    }
};

document.getElementById('us-unit').addEventListener("click", () => {
    setUnits('us');
    getTodayForecastFromApi();
    getWeekForecastFromApi();
});

document.getElementById('si-unit').addEventListener("click", () => {
    setUnits('si');
    getTodayForecastFromApi();
    getWeekForecastFromApi();
});

export { setUnits };