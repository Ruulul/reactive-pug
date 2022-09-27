import PubSub from "./pubsub.mjs";

function Store(state) {
    this.events = new PubSub();

    let set = setState.bind(this);

    this.state = new Proxy(state || {}, {set});
}

function setState (state, key, value) {
    state[key] = value;
    this.events.publish('stateChange', this.state);    

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