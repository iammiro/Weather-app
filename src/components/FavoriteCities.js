import {currentUserPosition, favoriteCities} from "./settings";
import {createFavoriteCitiesBlockItem} from "./createTemplate";

class FavoriteCities {
    constructor() {
        this.state = {
            isValid: true
        };
        this.setCityToFavoriteCities = this.setCityToFavoriteCities.bind(this);
        this.host = document.getElementById('input-search-container');
        this.addToFav = document.getElementById('addToFav');
        // this.currentUserPositionButton.addEventListener("click", this.getCurrentUserPosition);
    }

    setCityToFavoriteCities() {
        let address = document.getElementById('address').value;
        favoriteCities.setItem(`${address}`, `${address};${currentUserPosition.get('latitude')};${currentUserPosition.get('longitude')}`);
        console.log(favoriteCities.getItem(`${address}`));
        createFavoriteCitiesBlockItem(address);
    }

    getListOfFavoriteCitiesFromLocalStorage() {
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            createFavoriteCitiesBlockItem(localStorage.getItem(localStorage.key(i)));
        }
    }

    getFavoriteCityForecastFromApi() {
        let selector = document.getElementById('favorite-cities-block');
        let value = selector[selector.selectedIndex].value;
        console.log(value);
    }

    render() {
        this.host.innerHTML += `<button id="addToFav" class="btn-small"><img src="img/add.svg"></button>`;
        return this.host;
    }
}

export {FavoriteCities};
