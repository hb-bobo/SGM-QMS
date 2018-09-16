import DB from './BD';
// open -> transaction -> objectStore
const db = new DB('db', { store: 'id' });

const store = db.collection('store');



let data = [
    {
        name: '甲',
        id: 1,
    },
    {
        name: '乙',
        id: 2,
    }
]
store.put(data[0]).then(ev => {
    console.log(ev);
});