import style from './src/css/style.css';
import images from './src/img/index';
import {getForecastFromApi} from "./src/utils/api";
import LocationSearch from "./src/components/LocationSearch";
import {HandlingURL} from "./src/utils/Url";
import {currentUserPosition} from "./src/utils/settings";
import {SetUnits} from "./src/components/SetUnits";
import {RecentlyCities} from './src/components/RecentlyCities';
import {FavoriteCities} from "./src/components/FavoriteCities";
import Component from "./src/framework/Component"

class App extends Component {
    constructor() {
        super();
        this.host = document.createElement('div');
        this.host.classList.add('application-container');

        this.state = {
            city: `Kiev`
        };
        this.form = new LocationSearch({
            city: this.state.city
        });
        this.fav = new FavoriteCities();
        this.recent = new RecentlyCities();
        this.url = new HandlingURL();
        this.units = new SetUnits();
    }

    render() {
        this.form.update(this.state.city);
        this.fav.render();
        this.units.render();
        this.url.getParamFromUrl();
        getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
        this.fav.getListOfFavoriteCitiesFromLocalStorage();
    }
}

export default App;
