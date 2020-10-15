import geocodCityName from '../utils/geocoding';
import Component from '../framework/Component';
import { bindAll, clearChildren } from '../utils';
import getCurrentUserPosition from '../utils/currentUserPosition';

class LocationSearch extends Component {
  constructor(props) {
    super();
    this.state = {
      isValid: true,
      city: 'Kiev',
    };
    this.props = props;
    bindAll(this, 'handleSubmit');
    this.host = document.createElement('div');
    this.host.className = 'toolbar-row';
    this.host.addEventListener('submit', this.handleSubmit);
    this.host.addEventListener('click', getCurrentUserPosition);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const city = ev.target.elements.search.value.trim();
    if (!city.length) {
      this.updateState({ isValid: false });
    } else {
      geocodCityName(city);
    }
  }

  render() {
    // const { isValid } = this.state;
    const { city } = this.state.city;
    return `<form class="option">
              <div class="form-row">
                <div class="form-item">
                  <button id="currentPos" class="control control--size--small control--theme--gray"></button>
              </div>
              <div class="form-item">
                <label for="address" id="">
                    <input id="address" type="text" name="search" required class="input-field" placeholder="TYPE CITY NAME" value="${city}">
                </label>
              </div>
              <div class="form-item">
                <button id="submit" class="control control--size--small control--theme--gray"></button>
              </div>
              </div>
            </form>`;
  }
}

export default LocationSearch;
