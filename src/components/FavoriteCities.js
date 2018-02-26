import {currentUserPosition, favoriteCities} from "../utils/settings";

class FavoriteCities {
    constructor() {
        this.state = {
            isValid: true
        };
        this.setCityToFavoriteCities = this.setCityToFavoriteCities.bind(this);
        this.host = document.getElementById('favorite-cities-container');
        this.addToFav = document.getElementById('addToFav');
        // this.addToFav.addEventListener('click', this.setCityToFavoriteCities);
        this.favoriteCitiesSelect = document.getElementById('favorite-cities');
    }

    setCityToFavoriteCities() {
        console.log('sdsa');
        let address = document.getElementById('address').value;
        favoriteCities.setItem(`${address}`, `${address};${currentUserPosition.get('latitude')};${currentUserPosition.get('longitude')}`);
        // console.log(favoriteCities.getItem(`${address}`));
        // createFavoriteCitiesBlockItem(address);
        const favoriteCitiesBlockItem = `<option>${address}</option>`;
        this.favoriteCitiesSelect.append(favoriteCitiesBlockItem);
    }

    getListOfFavoriteCitiesFromLocalStorage() {
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const favoriteCitiesBlockItem = `<option>${localStorage.getItem(localStorage.key(i))}</option>`;
            this.favoriteCitiesSelect.append(favoriteCitiesBlockItem);
        }
    }

    getFavoriteCityForecastFromApi() {
        let selector = document.getElementById('favorite-cities-block');
        let value = selector[selector.selectedIndex].value;
        console.log(value);
    }

    render() {
        this.host.innerHTML = `<button id="addToFav" class="btn-small"><img src="img/add.svg"></button>
                                <select id="favorite-cities"></select>`;
        return this.host;
    }
}

export {FavoriteCities};
