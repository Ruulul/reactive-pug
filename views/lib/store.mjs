import PubSub from "./pubsub.mjs";

function Store(state) {
    this._store = new PubSub();
    this.subscribe = this._store.subscribe.bind(this._store);

    let set = setState.bind(this);

    this.state = new Proxy(state || {}, {set});
}

function setState (state, key, value) {
    state[key] = value;
    this._store.publish('stateChange', this.state);    

    return true;
}

Store.makeStore = function (from_state) {
    let store = new Store(from_state);
    let state = store.state;

    return {store, state};
}
export default Store;
export {
    Store,
};
try {
    window.Store = Store;
} catch {
    console.log("Not on browser");
}
try {
    global.Store = Store;
} catch {
    console.log("Not on node");
}