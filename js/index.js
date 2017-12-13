const appSettings = {
    container: document.getElementById('container'),
    apiUrl: 'https://api.darksky.net/forecast/',
    proxy: 'https://cors-anywhere.herokuapp.com/',
    apiKey: 'c0edd7e111d453106e09ff75c17397b8',
    init: {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
};

const currentUserPosition = new Map();

const DOMManipulation = {
    // Create the type of element you pass in the parameters
    createNode: function (element) {
        return document.createElement(element);
    },
    // Append the second parameter(element) to the first one
    append: function (parent, el) {
        return parent.appendChild(el);
    }
};

getTodayForecast = () => {
    let latitude = currentUserPosition.get('latitude');
    let longitude = currentUserPosition.get('longitude');
    let url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}`;
    fetch(url, appSettings.init)
        .then((response) => response.json())
        .then(data => {
            console.log(data);

            const todayForecastWrapper = document.createElement('div');
            todayForecastWrapper.className = "today-forecast-wrapper";

            const todayForecastHeaderWrapper = document.createElement('div');
            todayForecastHeaderWrapper.className = "today-forecast-header-wrapper";

            let windSpeed = DOMManipulation.createNode('div');
            windSpeed.innerHTML = `Wind: ${data.currently.windSpeed} m/s.`;
            DOMManipulation.append(todayForecastHeaderWrapper, windSpeed);

            let humidity = DOMManipulation.createNode('div');
            humidity.innerHTML = `Humidity: ${data.currently.humidity} %.`;
            DOMManipulation.append(todayForecastHeaderWrapper, humidity);

            let dewPoint = DOMManipulation.createNode('div');
            dewPoint.innerHTML = `Dew Pt: ${data.currently.dewPoint}˚.`;
            DOMManipulation.append(todayForecastHeaderWrapper, dewPoint);

            let uvIndex = DOMManipulation.createNode('div');
            uvIndex.innerHTML = `UV Index: ${data.currently.uvIndex}.`;
            DOMManipulation.append(todayForecastHeaderWrapper, uvIndex);

            let visibility = DOMManipulation.createNode('div');
            visibility.innerHTML = `Visibility: ${data.currently.visibility}+ km.`;
            DOMManipulation.append(todayForecastHeaderWrapper, visibility);

            let pressure = DOMManipulation.createNode('div');
            pressure.innerHTML = `Pressure: ${data.currently.pressure} hPa.`;
            DOMManipulation.append(todayForecastHeaderWrapper, pressure);

            let icon = DOMManipulation.createNode('img');
            icon.src = `img/${data.currently.icon}.svg`;
            DOMManipulation.append(todayForecastWrapper, icon);

            let summary = DOMManipulation.createNode('h1');
            summary.innerHTML = `${data.currently.temperature} F. ${data.currently.summary}`;
            DOMManipulation.append(todayForecastWrapper, summary);

            let hourlySummary = DOMManipulation.createNode('h2');
            hourlySummary.innerHTML = `${data.hourly.summary}`;
            DOMManipulation.append(todayForecastWrapper, hourlySummary);

            DOMManipulation.append(appSettings.container, todayForecastHeaderWrapper);

            DOMManipulation.append(appSettings.container, todayForecastWrapper);

        })
        .catch(function (error) {
            console.log(error);
        });
};

getWeekForecast = () => {
    let latitude = currentUserPosition.get('latitude');
    let longitude = currentUserPosition.get('longitude');
    let url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}`;
    fetch(url, appSettings.init)
        .then((response) => response.json())
        .then(function (data) {
            console.log(data);

            let dailyData = data.daily.data;
            console.log(dailyData);

            const wrapper = document.createElement('div');
            wrapper.className = "wrapper";

            dailyData.forEach(function (element) {

                let dayNumber = new Date(element.time * 1000);
                let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                let day = days[dayNumber.getDay()];

                const headerWrapperMain = document.createElement('div');
                headerWrapperMain.className = "header-wrapper";

                let icon = DOMManipulation.createNode('img');
                icon.src = `img/${element.icon}.svg`;
                DOMManipulation.append(headerWrapperMain, icon);

                let summary = DOMManipulation.createNode('h1');
                summary.innerHTML = `${day} ${element.temperatureMin} &#10141; ${element.temperatureMax} F. ${element.summary}`;
                DOMManipulation.append(headerWrapperMain, summary);

                wrapper.append(headerWrapperMain);

                const innerWrapper = document.createElement('div');
                innerWrapper.className = "";

                const innerWrapperMain = document.createElement('div');
                innerWrapperMain.className = "inner-wrapper";

                let windSpeed = DOMManipulation.createNode('div');
                windSpeed.innerHTML = `Wind: ${element.windSpeed} m/s.`;
                DOMManipulation.append(innerWrapperMain, windSpeed);

                let humidity = DOMManipulation.createNode('div');
                humidity.innerHTML = `Humidity: ${element.humidity} %.`;
                DOMManipulation.append(innerWrapperMain, humidity);

                let dewPoint = DOMManipulation.createNode('div');
                dewPoint.innerHTML = `Dew Pt: ${element.dewPoint}˚.`;
                DOMManipulation.append(innerWrapperMain, dewPoint);

                let uvIndex = DOMManipulation.createNode('div');
                uvIndex.innerHTML = `UV Index: ${element.uvIndex}.`;
                DOMManipulation.append(innerWrapperMain, uvIndex);

                let pressure = DOMManipulation.createNode('div');
                pressure.innerHTML = `Pressure: ${element.pressure} hPa.`;
                DOMManipulation.append(innerWrapperMain, pressure);
                innerWrapper.append(innerWrapperMain);
                wrapper.append(innerWrapper);
            });
            appSettings.container.append(wrapper);
        })
        .catch(function (error) {
            console.log(error);
        });
};

let promise = new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(pos => {
            let crd = pos.coords;
            currentUserPosition.set('latitude', crd.latitude);
            currentUserPosition.set('longitude', crd.longitude);
            resolve("result");
        }, err => console.warn(`ERROR(${err.code}): ${err.message}`),
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
});

reject = () => console.log('Error');

promise
    .then(
        result => {
            // первая функция-обработчик - запустится при вызове resolve
            getTodayForecast(); // result - аргумент resolve
        },
        error => {
            // вторая функция - запустится при вызове reject
            error(); // error - аргумент reject
        }
    ).then(
    result => {
        getWeekForecast();
    },
    error => {
        error();
    }
);