import getForecastFromApi from '../utils/api';
import { currentUserPosition, units } from '../utils/settings';
import { bindAll } from '../utils';
import Component from '../framework/Component';

class SetUnits extends Component {
  constructor() {
    super();
    bindAll(this, 'setUnits');
    this.host = document.createElement('div');
    this.host.className = ('toolbar-row');
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
    return `<div class="form-item"><button id="us-unit" class="control control--size--medium control--theme--gray">˚F, mph</button></div>
            <div class="form-item"><button id="si-unit" class="control control--size--medium control--theme--gray">˚C, m/s</button></div>`;
  }
}

export default SetUnits;
