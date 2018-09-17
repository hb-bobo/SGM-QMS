import DB from './BD';

/* 打开数据库并开始一个事务 */
// open -> transaction -> objectStore
const db = new DB('db', { store: 'id' });

const store = db.collection('store');


let data = [
    {
        name: '甲',
        id: 100,
    },
    {
        name: '乙',
        id: 1001,
    }
]

/* 增 */


// store.add(data[1]).then(ev => {   
//     // store.add(data[1]).then(ev => {
//     // });
//     store.get(2).then(result => {
//         console.log(result)
//     })
// });

/* 删 */

// store.delete(1).then(ev => {
//     console.log(ev);
// });

/* 改 */
// store.put(data[0]).then(ev => {
//     // store.put(data[0]).then(ev => {
//     // });
//     store.get(1).then(result => {
//         console.log(result)
//     })
// });

/* 查 */

// store.get(2).then(result => {
//     console.log(result)
// });


/* 遍历 */

// store.each((result) => {
//     console.log(result)
// })
