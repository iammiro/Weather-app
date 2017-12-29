const appSettings = {
    container: document.getElementById('container'),
    apiUrl: 'https://api.darksky.net/forecast/',
    // proxy: 'https://cors-anywhere.herokuapp.com/',
    apiKey: 'c0edd7e111d453106e09ff75c17397b8',
    appURL: 'https://iammiro.github.io/Weather-app',
    init: {
        method: 'GET',
        mode: 'no-cors',
        cache: 'default'
    }
};

let currentUserPosition = new Map();
let favoriteCities = new Map();
let units = new Map();

let urlParamHandler = () => {
    let parsedUrl = new URL(window.location.href);
    let lat = (parsedUrl.searchParams.get("lat"));
    let lang = (parsedUrl.searchParams.get("lang"));
    if (lat && lang) {
        console.log(lat + lang);
        setCoordinatesToMapStorage(lat, lang);
    } else {
        // getCurrentUserPosition();
        //set temporary default coordinates - Kiev
        setCoordinatesToMapStorage(50.4501, 30.5241);
        setCoordinatesToUrl(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    }
};

// let getCurrentUserPosition = () => {
//     navigator.geolocation.getCurrentPosition(pos => {
//             let crd = pos.coords;
//             setCoordinatesToMapStorage(crd.latitude, crd.longitude);
//             setCoordinatesToUrl(crd.latitude, crd.longitude);
//         }, err => console.warn(`ERROR(${err.code}): ${err.message}`),
//         {
//             enableHighAccuracy: true,
//             timeout: 5000,
//             maximumAge: 0
//         });
// };

let setUnits = (type) => {
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

let getAndGeocodUserInput = () => {
    const geocoder = new google.maps.Geocoder();
    let address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
            setCoordinatesToMapStorage(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            getCoordinatesFromUrl();
            setCityToFavorite();
            getTodayForecastFromApi();
            getWeekForecastFromApi();
            urlParamHandler();
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
};

let getCoordinatesFromUrl = () => {
    let parsedUrl = new URL(window.location.href);
    let params = new URLSearchParams(parsedUrl.search.slice(1));
    params.set('lat', currentUserPosition.get('latitude'));
    params.set('lang', currentUserPosition.get('longitude'));
    setCoordinatesToUrl(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
};

let setCoordinatesToUrl = (latitude, longitude) => {
    history.pushState(
        'data to be passed',
        'Weather App',
        `${appSettings.appURL}?lat=${latitude}&lang=${longitude}`);
};

let setCoordinatesToMapStorage = (latitude, longitude) => {
    currentUserPosition.set('latitude', latitude);
    currentUserPosition.set('longitude', longitude);
};

let setCityToFavorite = () => {
    let address = document.getElementById('address').value;
    favoriteCities.set(`${address}`, [currentUserPosition.get('latitude'), currentUserPosition.get('longitude')]);
    let coordinates = favoriteCities.get(`${address}`);
    let lat = coordinates[0];
    let lang = coordinates[1];

    renderRecentlyViewedCitiesBlockItem(address);

    document.getElementById(`${address}`).addEventListener('click', () => {
        setCoordinatesToMapStorage(lat, lang);
        setCoordinatesToUrl(lat, lang);
        getTodayForecastFromApi();
        getWeekForecastFromApi();
    });
};

document.getElementById('submit').addEventListener('click', getAndGeocodUserInput);

let createContentWrapper = () => {
    const contentWrapper = document.createElement('div');
    contentWrapper.id = 'content-wrapper';
    appSettings.container.appendChild(contentWrapper);
};

let createForecastItem = (parentElement, createdElement, createdElementId, itemClass) => {
    let item = document.createElement(createdElement);
    item.id = createdElementId;
    item.classList = itemClass;
    parentElement.appendChild(item);
};

let renderForecastItem = (parentElementId, content) => {
    let parentElement = document.getElementById(parentElementId);
    parentElement.innerHTML = content;
};

let renderForecastImgItem = (elementId, src) => {
    let icon = document.getElementById(elementId);
    icon.src = src;
};

let renderTodayForecastTemplate = () => {
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

let renderRecentlyViewedCitiesBlock = (parentElement) => {
    createForecastItem(parentElement, 'div', 'recently-viewed-cities-block');
    createForecastItem(parentElement, 'h3', 'recently-viewed-cities-block-header');
    renderForecastItem('recently-viewed-cities-block-header', 'Recently viewed cities:');
};

let renderRecentlyViewedCitiesBlockItem = (address) => {
    createForecastItem(document.getElementById('recently-viewed-cities-block'), 'div', `${address}`);
    renderForecastItem(`${address}`, `${address}`)
};

let renderWeekForecastTemplate = () => {
    const WeekForecastWrapper = document.createElement('div');
    WeekForecastWrapper.id = "week-forecast-wrapper";

    for (let i = 0; i < 8; i++) {
        const headerWrapperMain = document.createElement('div');
        headerWrapperMain.className = "header-wrapper accordion";

        createForecastItem(headerWrapperMain, 'img', `icon-${i}`);
        createForecastItem(headerWrapperMain, 'h1', `header-${i}`, 'accordion');

        WeekForecastWrapper.appendChild(headerWrapperMain);

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

        WeekForecastWrapper.appendChild(innerWrapper);
    }
    let contentWrapper = document.getElementById('content-wrapper');
    contentWrapper.appendChild(WeekForecastWrapper);

    appSettings.container.appendChild(contentWrapper);

    accordionForWeekForecast();
};
//TODO: fix bug in accordion!
let accordionForWeekForecast = () => {
    const el = document.getElementById('week-forecast-wrapper');
    el.addEventListener("click", function (event) {
        if (event.target.classList.contains('accordion')) {
            event.target.classList.toggle("active");
            // let panel = event.target.nextElementSibling;
            let panel = el.querySelector('.panel');
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    })
};

let getTodayForecastFromApi = () => {
    let latitude = currentUserPosition.get('latitude');
    let longitude = currentUserPosition.get('longitude');
    let url = `${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}?units=${units.get('units')}`;
    fetch(url, appSettings.init)
        .then((response) => response.json())
        .then(data => {
            renderTodayForecast(data);
        })
        .catch(function (error) {
            console.log(error);
        });
};

let renderTodayForecast = (data) => {
    renderForecastItem('windSpeed', `Wind: ${Math.round(data.currently.windSpeed)} ${units.get('speed')}.`)
    renderForecastItem('humidity', `Humidity: ${Math.round(data.currently.humidity)} %.`);
    renderForecastItem('dewPoint', `Dew Pt: ${Math.round(data.currently.dewPoint)}˚.`);
    renderForecastItem('uvIndex', `UV Index: ${Math.round(data.currently.uvIndex)}.`);
    renderForecastItem('visibility', `Visibility: ${Math.round(data.currently.visibility)}+ ${units.get('visibility')}.`);
    renderForecastItem('pressure', `Pressure: ${Math.round(data.currently.pressure)} hPa.`);
    renderForecastImgItem('icon', `${appSettings.appURL}/img/${data.currently.icon}.svg`);
    renderForecastItem('summary', `Today: ${Math.round(data.currently.temperature)} ${units.get('temperature')}. ${data.currently.summary}`);
    renderForecastItem('hourlySummary', `${data.hourly.summary}`);
};

let getWeekForecastFromApi = () => {
    let latitude = currentUserPosition.get('latitude');
    let longitude = currentUserPosition.get('longitude');
    let url = `${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}?units=${units.get('units')}`;
    fetch(url, appSettings.init)
        .then((response) => response.json())
        .then(function (data) {
            renderWeekForecast(data);
        })
        .catch(function (error) {
            console.log(error);
        });
};

let renderWeekForecast = (data) => {
    let dailyData = data.daily.data;

    dailyData.forEach(function (element, i) {
        let dayNumber = new Date(element.time * 1000);
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = days[dayNumber.getDay()];

        renderForecastImgItem(`icon-${i}`, `${appSettings.appURL}/img/${element.icon}.svg`);
        renderForecastItem(`header-${i}`, `${day}`);
        renderForecastItem(`summary-${i}`, `${element.summary}`);
        renderForecastItem(`temperature-${i}`, `${Math.round(element.temperatureMin)} &#10141; ${Math.round(element.temperatureMax)} ${units.get('temperature')}.`);
        renderForecastItem(`windSpeed-${i}`, `Wind: ${Math.round(element.windSpeed)} ${units.get('speed')}.`);
        renderForecastItem(`humidity-${i}`, `Humidity: ${Math.round(element.humidity)} %.`);
        renderForecastItem(`dewPoint-${i}`, `Dew Pt: ${Math.round(element.dewPoint)}˚.`);
        renderForecastItem(`uvIndex-${i}`, `UV Index: ${Math.round(element.uvIndex)}.`);
        renderForecastItem(`pressure-${i}`, `Pressure: ${Math.round(element.pressure)} hPa.`);

    });
};

let initApp = new Promise(function (resolve, reject) {
    setUnits('si');
    urlParamHandler();
    resolve("result");
    reject("error");
});

initApp.then(
    () => {
        createContentWrapper();
        renderTodayForecastTemplate();
        renderWeekForecastTemplate();
        getTodayForecastFromApi();
        urlParamHandler();
    },
    error => {
        console.log(error);
    }
).then(
    () => {
        getWeekForecastFromApi();
    },
    error => {
        console.log(error);
    }
);