import PubSub from "./pubsub.mjs";

function Store(params) {
    this.actions = params.actions || {};
    this.mutations = params.mutations || {};
    this.status = 'resting';

    this.events = new PubSub();

    let set = setState.bind(this);

    this.state = new Proxy(params.state || {}, {set});
}

function setState (state, key, value) {
    state[key] = value;
    
    console.log(`stateChange: \nstate.${key}: ${value}`);

    this.events.publish('stateChange', this.state);    
    
    if(this.status !== 'mutation') {
        console.warn(`You should use a mutation to set ${key}`);
      }
  
    this.status = 'resting';

    return true;
}

Store.prototype.dispatch = function (actionKey, payload) {  
    if(typeof this.actions[actionKey] !== 'function') {
        console.error(`Action "${actionKey} doesn't exist.`);
        return false;
    }
    this.status = 'action';

    return this.actions[actionKey](this, payload);
}

Store.prototype.commit = function (mutationKey, payload) {
    if(typeof this.mutations[mutationKey] !== 'function') {
        console.error(`Mutation ${mutationKey} doesn't exist.`);
        return false;
    }
    this.status = 'mutation';

    return this.mutations[mutationKey](this.state, payload);
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