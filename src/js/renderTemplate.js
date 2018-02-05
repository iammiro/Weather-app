import {appSettings} from "./settings";
import {accordionForWeekForecast} from "./accordion";

const renderRecentlyViewedCitiesBlock = (parentElement) => {
    createForecastItem(parentElement, 'div', 'recently-viewed-cities-block');
    createForecastItem(parentElement, 'h3', 'recently-viewed-cities-block-header');
    renderForecastItem('recently-viewed-cities-block-header', 'Recently viewed cities:');
};

const renderRecentlyViewedCitiesBlockItem = (address) => {
    createForecastItem(document.getElementById('recently-viewed-cities-block'), 'div', `${address}`);
    renderForecastItem(`${address}`, `${address}`)
};

const renderForecastItem = (parentElementId, content) => {
    let parentElement = document.getElementById(parentElementId);
    parentElement.innerHTML = content;
};

const renderForecastImgItem = (elementId, src) => {
    let icon = document.getElementById(elementId);
    icon.src = src;
};

const createForecastItem = (parentElement, createdElement, createdElementId, itemClass) => {
    let item = document.createElement(createdElement);
    item.id = createdElementId;
    item.classList = itemClass;
    parentElement.appendChild(item);
};

const createContentWrapper = () => {
    const contentWrapper = document.createElement('div');
    contentWrapper.id = 'content-wrapper';
    appSettings.container.appendChild(contentWrapper);
};

const renderTodayForecastTemplate = () => {
    const contentWrapper = document.getElementById('content-wrapper');

    const todayForecastWrapper = document.createElement('div');
    todayForecastWrapper.id = "today-forecast-wrapper";

    const todayForecastHeaderWrapper = document.createElement('div');
    todayForecastHeaderWrapper.className = "today-forecast-header-wrapper";

    const todayForecastBodyWrapper = document.createElement('div');
    todayForecastBodyWrapper.className = "today-forecast-body-wrapper";

    createForecastItem(todayForecastHeaderWrapper, 'div', 'windSpeed');
    createForecastItem(todayForecastHeaderWrapper, 'div', 'humidity');
    createForecastItem(todayForecastHeaderWrapper, 'div', 'dewPoint');
    createForecastItem(todayForecastHeaderWrapper, 'div', 'uvIndex');
    createForecastItem(todayForecastHeaderWrapper, 'div', 'visibility');
    createForecastItem(todayForecastHeaderWrapper, 'div', 'pressure');
    createForecastItem(todayForecastBodyWrapper, 'img', 'icon');
    createForecastItem(todayForecastBodyWrapper, 'h1', 'summary');
    createForecastItem(todayForecastBodyWrapper, 'h2', 'hourlySummary');

    todayForecastWrapper.appendChild(todayForecastHeaderWrapper);

    todayForecastWrapper.appendChild(todayForecastBodyWrapper);

    contentWrapper.appendChild(todayForecastWrapper);
    renderRecentlyViewedCitiesBlock(contentWrapper);
};

const renderWeekForecastTemplate = () => {
    const weekForecastWrapper = document.createElement('div');
    weekForecastWrapper.id = "week-forecast-wrapper";

    for (let i = 0; i < 8; i++) {
        const headerWrapperMain = document.createElement('div');
        headerWrapperMain.className = "header-wrapper accordion";

        createForecastItem(headerWrapperMain, 'img', `icon-${i}`);
        createForecastItem(headerWrapperMain, 'h1', `header-${i}`, 'week-forecast-header');
        createForecastItem(headerWrapperMain, 'h3', `under-header-${i}`, 'week-forecast-day-temperature');

        weekForecastWrapper.appendChild(headerWrapperMain);

        const innerWrapper = document.createElement('div');
        innerWrapper.className = "panel";

        createForecastItem(innerWrapper, 'h2', `summary-${i}`);
        createForecastItem(innerWrapper, 'h1', `temperature-${i}`);

        const innerWrapperMain = document.createElement('div');
        innerWrapperMain.className = "inner-wrapper";

        createForecastItem(innerWrapperMain, 'div', `windSpeed-${i}`);
        createForecastItem(innerWrapperMain, 'div', `humidity-${i}`);
        createForecastItem(innerWrapperMain, 'div', `dewPoint-${i}`);
        createForecastItem(innerWrapperMain, 'div', `uvIndex-${i}`);
        createForecastItem(innerWrapperMain, 'div', `pressure-${i}`);

        innerWrapper.appendChild(innerWrapperMain);

        weekForecastWrapper.appendChild(innerWrapper);
    }
    let contentWrapper = document.getElementById('content-wrapper');
    contentWrapper.appendChild(weekForecastWrapper);

    appSettings.container.appendChild(contentWrapper);

    accordionForWeekForecast();
};

export {
    renderForecastItem,
    renderForecastImgItem,
    renderRecentlyViewedCitiesBlock,
    renderRecentlyViewedCitiesBlockItem,
    renderTodayForecastTemplate,
    renderWeekForecastTemplate,
    createContentWrapper
};
