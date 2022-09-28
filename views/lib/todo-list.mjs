import Store from '/js/store.mjs';

function makeListStore() {
    const { store, state } = Store.makeStore({items: []});
    let id = 0;
    return {
        store,
        state,
        addItem(item) {
            state.items.push({...item, id: id++});
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