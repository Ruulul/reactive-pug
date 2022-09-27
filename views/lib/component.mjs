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
    this.__defineSetter__('render', (fn)=>this._render=fn.bind(this));
    this.__defineGetter__('render', ()=> function () { if (this._render) this.element.innerHTML = pug.render(this._render()); }.bind(this));
    this._afterRender = props.bindings || function () {}
    this.__defineSetter__('bindings', (fn)=>{
        this._afterRender=fn.bind(this);
        if (!this.observer) {
            this.observer = new MutationObserver(()=>this._afterRender()); 
            this.observer.observe(this.element, {childList: true});
        }
    });
    this.__defineGetter__('bindings', ()=>console.log("No point getting that"));

    this.unsubscribes = [];
    if (props.store instanceof Store)
        this.unsubscribes.push(props.store.events.subscribe('stateChange', () => this.render()));
    
    for (let store of props.stores || [])
        if (store instanceof Store)
            this.unsubscribes.push(props.store.events.subscribe('stateChange', () => this.render()));

    if (props.element)  {
        this.element = props.element;
        if (this._afterRender) {
            this.observer = new MutationObserver(()=>this._afterRender()); 
            this.observer.observe(this.element, {childList: true});
        }
    }
}

/**
 * 
 * @param {Store} store 
 */
Component.prototype.subscribe = function (store) {
    this.unsubscribes.push(store.events.subscribe(() => this.render()));
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
