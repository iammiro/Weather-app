import {geocodCityName} from "../utils/geocoding";

class LocationSearch {
    constructor(props) {
        this.state = {
            isValid: true
        };
        this.props = props;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.host = document.getElementById('input-search-container');
        this.host.addEventListener('submit', this.handleSubmit);
    }

    updateState(nextState) {
        this.state = nextState;
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
                                </form>`;
        return this.host;
    }
}

export {LocationSearch};
