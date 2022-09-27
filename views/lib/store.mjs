import PubSub from "./pubsub.mjs";

function Store(params) {
    this.events = new PubSub();

    let set = setState.bind(this);

    this.state = new Proxy(params.state || {}, {set});
}

function setState (state, key, value) {
    state[key] = value;
    this.events.publish('stateChange', this.state);    

    return true;
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