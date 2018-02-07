import {appSettings} from "./settings";
import {renderForecastItem} from "./renderTemplate";

const createRecentlyViewedCitiesBlockItem = (address) => {
    createForecastItem(document.getElementById('recently-viewed-cities-block'), 'div', `${address}`);
    renderForecastItem(`${address}`, `${address}`)
};

const createForecastItem = (parentElement, createdElement, createdElementId, itemClass) => {
    let item = document.createElement(createdElement);
    item.id = createdElementId;
    item.classList = itemClass;
    parentElement.appendChild(item);
};

const createForecastTemplate = () => {
    const forecastWrapper = document.createElement('div');
    forecastWrapper.id = "forecast-wrapper";

    for (let i = 0; i < 8; i++) {
        const dayForecastWrapper = document.createElement('section');
        dayForecastWrapper.className = "individual-day-forecast-wrapper";

        createForecastItem(dayForecastWrapper, 'img', `icon-${i}`);
        createForecastItem(dayForecastWrapper, 'div', `header-${i}`, 'week-forecast-header');
        createForecastItem(dayForecastWrapper, 'div', `under-header-${i}`, 'week-forecast-day-temperature');
        createForecastItem(dayForecastWrapper, 'div', `summary-${i}`);
        createForecastItem(dayForecastWrapper, 'div', `temperature-${i}`);
        createForecastItem(dayForecastWrapper, 'div', `windSpeed-${i}`);
        createForecastItem(dayForecastWrapper, 'div', `humidity-${i}`);
        createForecastItem(dayForecastWrapper, 'div', `dewPoint-${i}`);
        createForecastItem(dayForecastWrapper, 'div', `uvIndex-${i}`);
        createForecastItem(dayForecastWrapper, 'div', `pressure-${i}`);

        forecastWrapper.appendChild(dayForecastWrapper);
    }

    appSettings.container.appendChild(forecastWrapper);
};

export {
    createRecentlyViewedCitiesBlockItem,
    createForecastTemplate,
};
