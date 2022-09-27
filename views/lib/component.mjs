import Store from "./store.mjs";
import './pug.js';
let pug = require('pug');

/**
 * 
 * @param {{
 * render: function,
 * store: Store,
 * stores: Store[],
 * element: HTMLElement,
 * }} props 
 */
function Component(props) {
    this._render = props.render || null;
    this._afterRender = props.bindings || function () {}

    this.unsubscribes = [];
    if (props.store instanceof Store)
        this.unsubscribes.push(props.store.subscribe(() => this.render()));
    
    for (let store of props.stores || [])
        if (store instanceof Store)
            this.unsubscribes.push(props.store.subscribe(() => this.render()));

    if (props.element)  {
        this.element = props.element;
        if (this._afterRender) {
            this.observer = new MutationObserver(()=>this._afterRender()); 
            this.observer.observe(this.element, {childList: true});
        }
    }
}


Component.prototype.__defineSetter__('render', function (fn) {
    this._render=fn.bind(this);
    this.render();
});
Component.prototype.__defineGetter__('render', function () { 
    return function () { 
        if (this._render) this.element.innerHTML = pug.render(this._render()); 
    }.bind(this) 
});
Component.prototype.__defineSetter__('bindings', function (fn) {
    this._afterRender=fn.bind(this);
    if (!this.observer) {
        this.observer = new MutationObserver(()=>this._afterRender()); 
        this.observer.observe(this.element, {childList: true});
    }
});
Component.prototype.__defineGetter__('bindings', ()=>console.log("No point getting that"));

/**
 * 
 * @param {Store} store 
 */
Component.prototype.subscribe = function (store) {
    this.unsubscribes.push(store.subscribe(() => this.render()));
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
