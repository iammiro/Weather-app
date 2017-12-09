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

let latitude = 37.8267;
let longitude = -122.4233;

const url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}`;

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

const getApiData = () => {
    fetch(url, appSettings.init)
        .then((response) => response.json())
        .then(function (data) {
            console.log(data);
            let div = DOMManipulation.createNode('div');
            div.innerHTML = `${data.currently.temperature}`;
            DOMManipulation.append(appSettings.container, div);
        })
        .catch(function (error) {
            console.log(error);
        });
};

const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
            let crd = pos.coords;
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
        }, err => console.warn(`ERROR(${err.code}): ${err.message}`),
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
};

getApiData();
getCurrentLocation();