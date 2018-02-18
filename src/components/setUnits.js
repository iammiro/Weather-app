import {getForecastFromApi} from "./api";
import {currentUserPosition, units} from "./settings";

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
    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
});

document.getElementById('si-unit').addEventListener("click", () => {
    setUnits('si');
    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
});

export {setUnits};
