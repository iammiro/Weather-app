const init = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};

const apiUrl = 'https://api.darksky.net/forecast/';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const apiKey = 'c0edd7e111d453106e09ff75c17397b8';

let latitude = 37.8267;
let longitude = -122.4233;

const url = `${proxy}${apiUrl}${apiKey}/${latitude},${longitude}`;

fetch(url, init)
    .then((response) => response.json())
    .then(function(data) {
        console.log(data);
        console.log(data.timezone);
        console.log(data.currently.temperature);
    })
    .catch(function(error) {
        console.log(error);
    });

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    let crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);