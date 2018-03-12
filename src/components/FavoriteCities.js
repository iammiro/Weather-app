import {favoriteCities} from "../utils/settings";
import {geocodCityName} from "../utils/geocoding";

class FavoriteCities {
    constructor() {
        this.state = {};
        this.setCityToFavoriteCities = this.setCityToFavoriteCities.bind(this);
        this.host = document.getElementById('favorite-cities-container');
        // this.host = document.createElement('div');
        // this.host.id = 'favorite-cities-container';
        this.host.addEventListener('click', this.setCityToFavoriteCities);
        this.host.addEventListener('change', this.getFavoriteCityForecastFromApi);


    }

    setCityToFavoriteCities(e) {
        this.select = document.getElementById('favorite-cities');
        if (e.target && e.target.matches("#addToFav")) {
            let address = e.target.value;
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
        let selector = document.getElementById('favorite-cities');
        let value = selector[selector.selectedIndex].value;
        document.getElementById('address').value = value;
        geocodCityName(value);
    }

    render() {
        this.host.innerHTML = `<button id="addToFav" class="btn-small"></button>
                                <label for="favorite-cities"></label>
                                <select id="favorite-cities"></select>`;
        return this.host;
    }
}

export {FavoriteCities};
