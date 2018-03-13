import {geocodCityName} from "../utils/geocoding";
import Component from '../framework/Component';
import {bindAll} from "../utils";
import getCurrentUserPosition from '../utils/currentUserPosition';

class LocationSearch extends Component {
    constructor(props) {
        super();
        this.state = {
            isValid: true
        };
        this.props = props;
        bindAll(this, 'handleSubmit');
        this.host = document.getElementById('input-search-container');
        this.host.addEventListener('submit', this.handleSubmit);
        this.host.addEventListener('click', getCurrentUserPosition);
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const city = ev.target.elements.search.value.trim();
        if (!city.length) {
            this.updateState({isValid: false});
        } else {
            geocodCityName(city);
        }
    }

    render() {
        const {isValid} = this.state;
        const {city} = this.props;
        this.host.innerHTML = `<form class="option ${isValid ? 'address' : 'address-invalid'}">
                                    <label for="address" id="">
                                        <input id="address" type="text" name="search" required class="address-input" placeholder="TYPE CITY NAME" value="${city}">
                                    </label>
                                    <button id="submit" class="btn-small"></button>
                                    <button id="currentPos" class="btn-small"></button>
                                </form>`;
        return this.host;
    }
}

export default LocationSearch;
