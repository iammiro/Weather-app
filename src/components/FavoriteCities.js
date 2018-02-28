import {currentUserPosition, favoriteCities} from "../utils/settings";

class FavoriteCities {
    constructor() {
        this.state = {
            isValid: true
        };
        this.setCityToFavoriteCities = this.setCityToFavoriteCities.bind(this);
        this.host = document.getElementById('favorite-cities-container');
        this.host.addEventListener('click', this.setCityToFavoriteCities);
        this.host.addEventListener('click', this.getFavoriteCityForecastFromApi);
    }

    setCityToFavoriteCities(e) {
        this.select = document.getElementById('favorite-cities');
        if (e.target && e.target.matches("#addToFav")) {

            let address = document.getElementById('address').value;

            favoriteCities.setItem(`${address}`, `${address}`);
            this.select.innerHTML += `<option>${address}</option>`;

        }
    }

    getListOfFavoriteCitiesFromLocalStorage() {
        this.select = document.getElementById('favorite-cities');
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            this.select.innerHTML += `<option>${localStorage.getItem(localStorage.key(i))}</option>`;
        }
    }

    getFavoriteCityForecastFromApi(e) {
        if (e.target && e.target.matches("#favorite-cities")) {
            let selector = document.getElementById('favorite-cities');
            let value = selector[selector.selectedIndex].value;
            console.log(value);
        }
    }

    render() {
        this.host.innerHTML = `<button id="addToFav" class="btn-small"></button>
                                <label for="favorite-cities"></label>
                                <select id="favorite-cities"></select>`;
        return this.host;
    }
}

export {FavoriteCities};
