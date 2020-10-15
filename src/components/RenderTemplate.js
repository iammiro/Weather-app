import { appSettings, units } from '../utils/settings';

class RenderTemplate {
  constructor() {
    this.state = {
      isValid: true,
    };
    this.host = document.getElementById('container');
  }

  render(res) {
    this.host.innerHTML = '';
    const { isValid } = this.state;
    const dailyData = res.data;
    dailyData.forEach((element, i) => {
      const dayNumber = new Date(element.time * 1000);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day = days[dayNumber.getDay()];

      document.getElementById('container').innerHTML += `
        <div class="${isValid ? 'individual-day-forecast-wrapper' : 'individual-day-forecast-wrapper-invalid'}">
          <div id="header-${i}" class="forecast-header">
            ${day}
          </div>
          <img id="icon-${i}" class="forecast-icon" src="${appSettings.appURL}/img/${element.icon}.svg" alt="forecast-icon">
          <div id="under-header-${i}" class="forecast-day-temperature">
              &#9790; ${Math.round(element.temperatureMin)}˚ &#8594; &#9788; ${Math.round(element.temperatureMax)}˚ ${units.get('temperature')}.
          </div>
          <div id="summary-${i}" class="forecast-summary">
            ${element.summary}.
          </div>
        </div>`;

      return document.getElementById('container');
    });
  }
}

export default RenderTemplate;
