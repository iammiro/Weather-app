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

        const dayForecastFooterWrapper = document.createElement('section');
        dayForecastFooterWrapper.className = "individual-day-forecast-footer-wrapper";

        createForecastItem(dayForecastWrapper, 'div', `header-${i}`, 'forecast-header');
        createForecastItem(dayForecastWrapper, 'img', `icon-${i}`, 'forecast-icon');
        createForecastItem(dayForecastWrapper, 'div', `under-header-${i}`, 'forecast-day-temperature');
        createForecastItem(dayForecastWrapper, 'div', `summary-${i}`, 'forecast-summary');
        createForecastItem(dayForecastWrapper, 'div', `temperature-${i}`, 'forecast-temperature');

            createForecastItem(dayForecastFooterWrapper, 'div', `windSpeed-${i}`, 'forecast-wind-speed forecast-item');
            createForecastItem(dayForecastFooterWrapper, 'div', `humidity-${i}`, 'forecast-humidity forecast-item');
            createForecastItem(dayForecastFooterWrapper, 'div', `dewPoint-${i}`, 'forecast-dew-point forecast-item');
            createForecastItem(dayForecastFooterWrapper, 'div', `uvIndex-${i}`, 'forecast-uv-index forecast-item');
            createForecastItem(dayForecastFooterWrapper, 'div', `pressure-${i}`, 'forecast-pressure forecast-item');

            dayForecastWrapper.appendChild(dayForecastFooterWrapper);

        forecastWrapper.appendChild(dayForecastWrapper);
    }

    appSettings.container.appendChild(forecastWrapper);
};

export {
    createRecentlyViewedCitiesBlockItem,
    createForecastTemplate,
};
