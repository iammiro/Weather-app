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

getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
            let crd = pos.coords;
            currentUserPosition.set('latitude', crd.latitude);
            currentUserPosition.set('longitude', crd.longitude);
        }, err => console.warn(`ERROR(${err.code}): ${err.message}`),
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
};

getCurrentlyApiData = () => {
    let latitude = currentUserPosition.get('latitude');
    let longitude = currentUserPosition.get('longitude');
    let url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}`;
    fetch(url, appSettings.init)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            let summary = DOMManipulation.createNode('h1');
            summary.innerHTML = `${data.currently.temperature} F. ${data.currently.summary}.`;
            DOMManipulation.append(appSettings.container, summary);

            let windSpeed = DOMManipulation.createNode('div');
            windSpeed.innerHTML = `Wind: ${data.currently.windSpeed} m/s.`;
            DOMManipulation.append(appSettings.container, windSpeed);

            let humidity = DOMManipulation.createNode('div');
            humidity.innerHTML = `Humidity: ${data.currently.humidity} %.`;
            DOMManipulation.append(appSettings.container, humidity);

            let dewPoint = DOMManipulation.createNode('div');
            dewPoint.innerHTML = `Dew Pt: ${data.currently.dewPoint}˚.`;
            DOMManipulation.append(appSettings.container, dewPoint);

            let uvIndex = DOMManipulation.createNode('div');
            uvIndex.innerHTML = `UV Index: ${data.currently.uvIndex}.`;
            DOMManipulation.append(appSettings.container, uvIndex);

            let visibility = DOMManipulation.createNode('div');
            visibility.innerHTML = `Visibility: ${data.currently.visibility}+ km.`;
            DOMManipulation.append(appSettings.container, visibility);

            let pressure = DOMManipulation.createNode('div');
            pressure.innerHTML = `Pressure: ${data.currently.pressure} hPa.`;
            DOMManipulation.append(appSettings.container, pressure);

        })
        .catch(function (error) {
            console.log(error);
        });
};

getDailyApiData = () => {
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

                let summary = DOMManipulation.createNode('h1');
                summary.innerHTML = `${element.time} ${element.temperatureMin} F - ${element.temperatureMax} F. ${element.summary}.`;
                DOMManipulation.append(wrapper, summary);

                let windSpeed = DOMManipulation.createNode('div');
                windSpeed.innerHTML = `Wind: ${element.windSpeed} m/s.`;
                DOMManipulation.append(wrapper, windSpeed);

                let humidity = DOMManipulation.createNode('div');
                humidity.innerHTML = `Humidity: ${element.humidity} %.`;
                DOMManipulation.append(wrapper, humidity);

                let dewPoint = DOMManipulation.createNode('div');
                dewPoint.innerHTML = `Dew Pt: ${element.dewPoint}˚.`;
                DOMManipulation.append(wrapper, dewPoint);

                let uvIndex = DOMManipulation.createNode('div');
                uvIndex.innerHTML = `UV Index: ${element.uvIndex}.`;
                DOMManipulation.append(wrapper, uvIndex);

                let visibility = DOMManipulation.createNode('div');
                visibility.innerHTML = `Visibility: ${element.visibility}+ km.`;
                DOMManipulation.append(wrapper, visibility);

                let pressure = DOMManipulation.createNode('div');
                pressure.innerHTML = `Pressure: ${element.pressure} hPa.`;
                DOMManipulation.append(wrapper, pressure);

            });
            appSettings.container.append(wrapper);
        })
        .catch(function (error) {
            console.log(error);
        });
};

getCurrentLocation();