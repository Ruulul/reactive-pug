/**@typedef {{observers: (data)=>void[], subscribe: (function)=>function, state: State, notify: function}} Store */
/**
 * @param {State} state
 * @returns {Store} 
 */

function Store(state) {
    this.observers = [];
    let set = setState.bind(this);
    this.state = new Proxy(state || {}, {set});
}
Store.prototype.subscribe = function (callback) {
    this.observers.push(callback);
    return ()=>this.observers = this.observers.filter(fn=>fn!==callback);
}
Store.prototype.notify = function () {
    this.observers.map(callback=>callback(this.state));
}
function setState (state, key, value) {
    state[key] = value;
    this.notify();
    return true;
}

/**
 * 
 * @param {State} from_state 
 * @returns {{store: Store, state: State}}
 */
Store.makeStore = function (from_state) {
    let store = new Store(from_state);
    let state = store.state;

    return {store, state};
}
export default Store;
export {
    Store,
};