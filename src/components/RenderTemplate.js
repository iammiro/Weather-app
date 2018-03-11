import {appSettings, units} from "../utils/settings";

class RenderTemplate {
    constructor() {
        this.state = {
            isValid: true
        };
        this.host = document.getElementById('container');
    }

    render(temp) {
        this.host.innerHTML = '';
        const {isValid} = this.state;
        let dailyData = temp.data;
        dailyData.forEach(function (element, i) {

            let dayNumber = new Date(element.time * 1000);
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let day = days[dayNumber.getDay()];

            document.getElementById('container').innerHTML += `<section class="${isValid ? 'individual-day-forecast-wrapper' : 'individual-day-forecast-wrapper-invalid'}">
                <div id="header-${i}" class="forecast-header">${day}</div>
                <img id="icon-${i}" class="forecast-icon" src="${appSettings.appURL}/img/${element.icon}.svg">
                <div id="under-header-${i}" class="forecast-day-temperature">&#9790; ${Math.round(element.temperatureMin)}˚ &#8594; &#9788; ${Math.round(element.temperatureMax)}˚ ${units.get('temperature')}.</div>
                <div id="summary-${i}" class="forecast-summary">Mostly cloudy throughout the day.</div>
                    <section class="individual-day-forecast-footer-wrapper">
                    <div id="windSpeed-${i}" class="forecast-wind-speed forecast-item">Wind:<br><br> ${Math.round(element.windSpeed)} ${units.get('speed')}</div>
                    <div id="humidity-${i}" class="forecast-humidity forecast-item">Humidity:<br><br> ${Math.round(element.humidity)} %</div>
                    <div id="dewPoint-${i}" class="forecast-dew-point forecast-item">Dew Pt:<br><br> ${Math.round(element.dewPoint)}˚</div>
                    <div id="uvIndex-${i}" class="forecast-uv-index forecast-item">UV Index:<br><br> ${Math.round(element.uvIndex)}</div>
                    <div id="pressure-${i}" class="forecast-pressure forecast-item">Pressure:<br><br> ${Math.round(element.pressure)} hPa</div>
                    </section>
                </section>`;

            return document.getElementById('container');
        });
    }
}

export {RenderTemplate};
