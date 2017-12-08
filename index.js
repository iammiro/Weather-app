const appSettings = {
    container: document.getElementById('container'),
    apiUrl:'https://api.darksky.net/forecast/',
    proxy: 'https://cors-anywhere.herokuapp.com/',
    apiKey: 'c0edd7e111d453106e09ff75c17397b8',
    init: {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
};

let latitude = 37.8267;
let longitude = -122.4233;

const url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}`;

function createNode(element) {
    return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
}

fetch(url, appSettings.init)
    .then((response) => response.json())
    .then(function (data) {
        console.log(data);
        let div = createNode('div');
        div.innerHTML = `${data.currently.temperature}`;
        append(appSettings.container, div);
    })
    .catch(function (error) {
        console.log(error);
    });

const getCurrentLocation = function () {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        let crd = pos.coords;
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
};

getCurrentLocation();