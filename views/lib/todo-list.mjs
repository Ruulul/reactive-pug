import Store from '/js/store.mjs';

function makeListStore() {
    /**
     * @typedef {{checked: Boolean, label: string, id: number}} Item
     * @type {{items: Item[]}} list
     */
    const initial_state = {items: []};
    /**@type {{store: import('./store.mjs').Store, state: {items: Item[]}}} */
    const { store, state } = Store.makeStore(initial_state);
    let id = 0;
    return {
        store,
        state,
        addItem(item) {
            state.items.push({label: item, checked: false, id: id++});
            state.items = state.items;
        },
        removeItem(id) {
            state.items = state.items.filter(item=>item.id!==id);
        },
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