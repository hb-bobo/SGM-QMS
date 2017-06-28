/**
 * @param {Object} store
 * @return {void}
 */
export default function applyCommit (store) {
    console.log(store)
    store.commit = function () {

    }
    return store;
}