import { currentUserPosition, recentlyViewedCities } from '../utils/settings';
import HandlingURL from '../utils/Url';
import { bindAll } from '../utils';
import getForecastFromApi from '../utils/api';
import setCoordinatesToMapStorage from '../utils/setCoordinates';
import Component from '../framework/Component';

class RecentlyCities extends Component {
  constructor() {
    super();
    this.state = {
      isValid: true,
    };
    bindAll(this, 'showRecentCityForecast');
    this.host = document.createElement('div');
    this.host.id = 'recently-viewed-cities-block';
    this.host.addEventListener('click', this.showRecentCityForecast);
    this.url = new HandlingURL();
  }

  setCityToRecentlyViewedCities(latitude, longitude) {
    const address = document.getElementById('address').value;
    recentlyViewedCities.set(`${address}`, [latitude, longitude]);
    const coordinates = recentlyViewedCities.get(`${address}`);
    const lat = coordinates[0];
    const lang = coordinates[1];

    this.render(address);

    document.getElementById(`${address}`).addEventListener('click', () => {
      setCoordinatesToMapStorage(lat, lang);
      this.url.addHistoryState(lat, lang);
      getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
    });
  }

  showRecentCityForecast(e) {
    console.log(e.target.id);
    for (let i = 0; i++; i > recentlyViewedCities.length) {
      if (e.target && e.target.matches(`#${address}`)) {
        setCoordinatesToMapStorage(lat, lang);
        this.url.addHistoryState(lat, lang);
        getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
        console.log('test');
      }
    }
  }

  render(address) {
    const { isValid } = this.state;
    return `<li id="${address}" class="${isValid ? 'recently' : 'recently-invalid'}">${address}</li>`;
  }
}

export default RecentlyCities;
