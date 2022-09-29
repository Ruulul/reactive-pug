import Store from '/js/store.mjs';

/**
 * @typedef {{label: string, checked: Boolean, id: number}} Item
 * @typedef {{items: Item[]}} State
 * @typedef {{
 *  store: import('./store.mjs').Store<State>,
 *  state: State,
 *  addItem: function (string),
 *  removeItem: function (id: number),
 *  markItem: function(id: number),
 * }} Store
 * @returns {Store} Store
 */
function makeListStore() {
    /**@type {{store: import('./store.mjs').Store<State>, state: State}} */  
    const { store, state } = Store.makeStore({items: []});

    let id = 0;
    return {
        store,
        state,
        /**@param {string} item item label*/
        addItem(item) {
            state.items.push({label: item, checked: false, id: id++});
            state.items = state.items;
        },
        /**@param {number} id item id*/
        removeItem(id) {
            state.items = state.items.filter(item=>item.id!==id);
        },
        /**@param {number} id item id*/
        markItem(id) {
            let item = store.state.items.find(item=>item.id===id)
            item.checked = !item.checked
            state.items = state.items
        }
    }
}
const { store, state, addItem, removeItem, markItem } = makeListStore();
export {
    store,
    state,
    addItem,
    removeItem,
    markItem,
}