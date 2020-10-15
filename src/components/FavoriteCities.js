import { favoriteCities } from '../utils/settings';
import geocodCityName from '../utils/geocoding';
import Component from '../framework/Component';

class FavoriteCities extends Component {
  constructor() {
    super();
    this.setCityToFavoriteCities = this.setCityToFavoriteCities.bind(this);
    this.host = document.createElement('div');
    this.host.className = 'toolbar-row';
    this.host.addEventListener('click', this.setCityToFavoriteCities);
    this.host.addEventListener('change', this.getFavoriteCityForecastFromApi);
  }

  setCityToFavoriteCities(e) {
    this.select = document.getElementById('favorite-cities');
    if (e.target && e.target.matches('#addToFav')) {
      const address = e.target.value;
      favoriteCities.setItem(`${address}`, `${address}`);
      this.select.innerHTML += `<option>${address}</option>`;
    }
  }

  getListOfFavoriteCitiesFromLocalStorage() {
    this.select = document.getElementById('favorite-cities');
    for (let i = 0, len = localStorage.length; i < len; ++i) {
      this.select.innerHTML += `<option class="option">${localStorage.getItem(localStorage.key(i))}</option>`;
    }
  }

  getFavoriteCityForecastFromApi() {
    const selector = document.getElementById('favorite-cities');
    const { value } = selector[selector.selectedIndex];
    document.getElementById('address').value = value;
    geocodCityName(value);
  }

  render() {
    return `<div class="form-item">
                <button id="addToFav" class="control control--size--small control--theme--gray"></button>
            </div>
            <div class="form-item">
              <label for="favorite-cities">
                  <select id="favorite-cities" class="select"/>
              </label>
            </div>`;
  }
}

export default FavoriteCities;
