/**
 * @template State
 * @param {State} state
 * @returns {{observers: Function[], subscribe: (Function)=>Function, state: State, notify: Function}} Store
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
 * @template State
 * @param {State} from_state 
 * @returns {{store: Store<State>, state: State}}
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