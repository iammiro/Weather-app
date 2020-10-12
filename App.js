import 'reset-css';
import style from './src/css/style.css';
import images from './src/img/index';
import getForecastFromApi from './src/utils/api';
import HandlingURL from './src/utils/Url';
import { currentUserPosition } from './src/utils/settings';
import LocationSearch from './src/components/LocationSearch';
import SetUnits from './src/components/SetUnits';
import RecentlyCities from './src/components/RecentlyCities';
import FavoriteCities from './src/components/FavoriteCities';
import Component from './src/framework/Component';

class App extends Component {
  constructor() {
    super();
    this.host = document.createElement('div');
    this.host.classList.add('application-container');
    this.state = {
      city: 'Kiev',
    };
    this._locationSearch = new LocationSearch({
      city: this.state.city,
    });
    this._favoriteCities = new FavoriteCities();
    this._recentlyCities = new RecentlyCities();
    this._handlingURL = new HandlingURL();
    this._setUnits = new SetUnits();
  }

  render() {
    const toRender = [
      this._locationSearch.update(this.state.city),
      this._favoriteCities.update(),
      this._setUnits.update(),
      this._recentlyCities.update(),
    ];

    this._handlingURL.getParamFromUrl();

    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));

    return toRender;
  }
}

export default App;
