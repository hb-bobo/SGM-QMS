import Dexie from 'dexie';

// 不用考虑怎么open indexedDB, 开始事务。创建store更简单，查询功能强大

// 1. 新建一个数据库 

const db = new Dexie('myDataBase');

// 2. 创建store
db.version(1).stores({
    myStore: '++id, name, age', 
});
// db.delete();

// 3. 添加新数据

let data = [
    {
        name: 'Ellen',
        age: 25,
        street: 'East 13:th Street',
    },
    {
        name: 'Neo',
        age: 25,
        street: 'East 13:th Street',
    },
    {
        name: 'jeff',
        age: 25,
        street: 'East 13:th Street',
    },
    {
        name: 'Ellen',
        age: 20,
        street: 'South 13:th Street',
    }
];

// db.myStore.add({
//     name: 'Ellen',
//     age: 25,
//     street: 'East 13:th Street',
// });

// data.forEach(item => {
//     db.myStore.add(item);
// });
// 4. 删

// db.myStore.delete(17);

// 5. 改
// db.myStore.update(18, {
//     name: 'Neo2',
//     age: 20,
//     street: 'East 12:th Street',
// }).then((updated) => {
//     if (updated) {
//         console.log('更新成功')
//     }
// });

// 6. 查

db.myStore.orderBy('name').filter(function (item) {
    return item.name === "Ellen";
}).toArray().then(res => {
    console.log(res);
});

db.myStore
    .where('name')
    .equalsIgnoreCase('Neo')
    .and((item) => {
        return item.age === 20;
    })
    .toArray()
    .then(res => {
        console.log(res);
    });
