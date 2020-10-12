import { clearChildren } from './utils';
import App from '../App';

const init = new App();

const root = clearChildren(document.getElementById('root'));

root.appendChild(init.host);

init.update();
