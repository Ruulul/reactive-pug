import Store from "./store.mjs";

/**
 * 
 * @param {{
 * render: function,
 * store: Store,
 * element: HTMLElement,
 * }} props 
 */
function Component(props) {
    this.render = props.render || function () {};
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
