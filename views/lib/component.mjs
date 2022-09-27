import Store from "./store.mjs";
import './pug.js';
let pug = require('pug');
/**
 * 
 * @param {{
 * render: function,
 * store: Store,
 * element: HTMLElement,
 * }} props 
 */
function Component(props) {
    this._render = props.render || function () {return ''};
    this.__defineSetter__('render', (fn)=>this._render=fn.bind(this));
    this.__defineGetter__('render', ()=> function () { this.element.innerHTML = pug.render(this._render()); }.bind(this));
    this.store = props.store || {};

    if (props.store instanceof Store)
        this.unsubscribe = props.store.events.subscribe('stateChange', () => this.render());

    if (props.element) 
        this.element = props.element;
}

export default Component;
export {
    Component,
};
try {
    window.Component = Component;
} catch {
    console.log("Not on browser");
}
try {
    global.Component = Component;
} catch {
    console.log("Not on node");
}
