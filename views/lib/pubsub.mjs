function PubSub() {
    /** @type {Object<string, function[]>} */
    this.events = {};
}

/** 
 * @type {function} subscribe
 * @param {string} event
 * @param {function} callback 
 * @returns {function} unsubscribe
 * */
PubSub.prototype.subscribe = function (event, callback) {
    if(!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return ()=>this.events[event] = this.events[event].filter(c=>c!==callback);
}

/**
 * 
 * @param {string} event 
 * @param {any} data 
 */
PubSub.prototype.publish = function(event, data = {}) {
    this.events[event].map(callback => callback(data))
}

export default PubSub;
export {
    PubSub,
};