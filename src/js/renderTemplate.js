import {appSettings, units} from "./settings";

const renderForecastImgItem = (elementId, src) => {
    let icon = document.getElementById(elementId);
    icon.src = src;
};

const renderForecastItem = (parentElementId, content) => {
    let parentElement = document.getElementById(parentElementId);
    parentElement.innerHTML = content;
};

const renderForecast = (data) => {
    let dailyData = data.daily.data;

    dailyData.forEach(function (element, i) {

        let dayNumber = new Date(element.time * 1000);
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = days[dayNumber.getDay()];

        renderForecastImgItem(`icon-${i}`, `${appSettings.appURL}/img/${element.icon}.svg`);
        renderForecastItem(`header-${i}`, `${day}`);
        renderForecastItem(`under-header-${i}`, `&#9790; ${Math.round(element.temperatureMin)}˚ &#8594; &#9788; ${Math.round(element.temperatureMax)}˚ ${units.get('temperature')}.`);
        renderForecastItem(`summary-${i}`, `${element.summary}`);
        renderForecastItem(`temperature-${i}`, `${Math.round(element.temperatureMin)}˚ &#10141; ${Math.round(element.temperatureMax)}˚ ${units.get('temperature')}.`);
        renderForecastItem(`windSpeed-${i}`, `Wind: ${Math.round(element.windSpeed)} ${units.get('speed')}.`);
        renderForecastItem(`humidity-${i}`, `Humidity: ${Math.round(element.humidity)} %.`);
        renderForecastItem(`dewPoint-${i}`, `Dew Pt: ${Math.round(element.dewPoint)}˚.`);
        renderForecastItem(`uvIndex-${i}`, `UV Index: ${Math.round(element.uvIndex)}.`);
        renderForecastItem(`pressure-${i}`, `Pressure: ${Math.round(element.pressure)} hPa.`);

    });
};

export {renderForecastImgItem, renderForecastItem, renderForecast};
