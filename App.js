import style from './src/css/style.css';
import images from './src/img/index';
import {getForecastFromApi} from "./src/utils/api";
import {LocationSearch} from "./src/components/LocationSearch";
import {HandlingURL} from "./src/utils/Url";
import {currentUserPosition} from "./src/utils/settings";
import {SetUnits} from "./src/components/SetUnits";
import {RecentlyCities} from './src/components/RecentlyCities';
import {CurrentUserLocation} from "./src/components/CurrentUserLocation";
import {FavoriteCities} from "./src/components/FavoriteCities";

class App {
    constructor() {
        this.state = {
            city: `Kiev`,
            onSubmit: this.onSearchSubmit()
        };
        this.form = new LocationSearch({
            city: this.state.city,
            onSubmit: this.onSearchSubmit()
        });
        this.current = new CurrentUserLocation();
        this.fav = new FavoriteCities();
        this.recent = new RecentlyCities();
        this.url = new HandlingURL();
        this.units = new SetUnits();
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    onSearchSubmit(city) {
        this.updateState({city});
        console.log(this.state);
    }

    updateState(nextState) {
        this.state = Object.assign({}, this.state, nextState);
    }

    render() {
        this.form.render();
        this.current.render();
        this.fav.render();
        this.units.render();
        this.url.getParamFromUrl();
        getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
        this.fav.getListOfFavoriteCitiesFromLocalStorage();
    }
}

export {App};
