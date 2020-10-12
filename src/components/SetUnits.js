import getForecastFromApi from '../utils/api';
import { currentUserPosition, units } from '../utils/settings';
import { bindAll } from '../utils';
import Component from '../framework/Component';

class SetUnits extends Component {
  constructor() {
    super();
    bindAll(this, 'setUnits');
    this.host = document.createElement('div');
    this.host.id = ('units-container');
    this.host.addEventListener('click', this.setUnits);
  }

  setUnits(e) {
    if (e.target && e.target.matches('#us-unit')) {
      units.set('units', 'us').set('temperature', 'F').set('speed', 'mph').set('visibility', 'mi');
    } else if (e.target && e.target.matches('#si-unit')) {
      units.set('units', 'si').set('temperature', 'C').set('speed', 'm/s').set('visibility', 'km');
    }
    getForecastFromApi(currentUserPosition.get('latitude'), currentUserPosition.get('longitude'));
  }

  render() {
    return '<button id="us-unit" class="unit-button">˚F, mph</button><button id="si-unit" class="unit-button">˚C, m/s</button>';
  }
}

export default SetUnits;
