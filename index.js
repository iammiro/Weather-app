import App from './App';
import {clearChildren} from "./src/utils";

const init = new App();

const root = clearChildren(document.getElementById('root'));

root.appendChild(init.host);
console.log(init.host);

init.render();
