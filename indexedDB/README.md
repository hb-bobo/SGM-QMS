# indexedDB

推荐第三方库 [zangodb](https://erikolson186.github.io/zangodb/)、[dexie.js](http://dexie.org/)


## IndexedDB 具有以下特点。

（1）IndexedDB 数据库存储键值对。 IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JavaScript 对象。对象仓库中，数据以"键值对"的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。

（2）IndexedDB API主要是异步的。 IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，这与 LocalStorage 形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现。

（3）IndexedDB 构建在事务数据库模型上。 IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。

（4）同源限制 IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。

（5）储存空间大 IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 50MB，甚至没有上限。某些浏览器会限制每次写入130M

（6）支持二进制储存。 IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。


## 基本模式

- 打开数据库 -> indexedDB.open() -> IDBDatabase
- 开始一个事务 -> IDBDatabase.transaction() -> IDBTransaction ->IDBObjectStore

- 新建数据库 (IDBObjectStore.createObjectStore())
- 新增数据 (IDBObjectStore.add())
- 读取数据 (IDBObjectStore.get())
- 遍历数据 (IDBObjectStore.openCursor())
- 更新数据 (IDBObjectStore.put())
- 删除数据 (IDBObjectStore.delete())

1. 打开数据库
```javascript
    // IDBOpenDBRequest  表示打开数据库的请求
    const request: IDBOpenDBRequest  = indexedDB.open( databaseName, version );
        // 版本更新，创建新的store的时候
        request.onupgradeneeded = ( event ) => {
            // // IDBDatabase 表示与数据库的连接。这是获取数据库事务的唯一方法。
            const db: IDBDatabase = event.target.result;
            if ( db.objectStoreNames.contains( stroeName ) === false ) {
                db.createObjectStore( stroeName, {keyPath: 'key'} );
            }
        };
        request.onsuccess = ( event ) => {
            // IDBDatabase 表示与数据库的连接。这是获取数据库事务的唯一方法。
            const db: IDBDatabase = event.target.result;
            openSuccess(db);
        };
        request.onerror = ( event ) => {
            console.error( 'IndexedDB', event );
        };

 ```


  2. 开始一个事务
```ts
   function openSuccess (db: IDBDatabase) {
       transaction: IDBTransaction = db.transaction( [ storeName ], 'readwrite' );
   }

 ```
  3. 新建数据库
```javascript
   function openSuccess (db: IDBDatabase) {
       transaction: IDBTransaction = db.transaction( [ storeName ], 'readwrite' );
        objectStore: IDBObjectStore = transaction.objectStore(storeName);
   }

 ```
  4. 新增数据
```javascript
   const request: IDBRequest = objectStore.add(data);
    request.onsuccess = function ( event ) {
    };
    request.onerror = function ( event ) {
    };

 ```

5. 读取数据
```javascript
    // 根据keyPath查询
   const request: IDBRequest = objectStore.get(data);
    request.onsuccess = function ( event ) {
        // 获取查询结果
        event.target.result;
    };
    request.onerror = function ( event ) {
    };

 ```

   6. 更新数据
```javascript
   const request: IDBRequest = objectStore.put(data);
    request.onsuccess = function ( event ) {
    };
    request.onerror = function ( event ) {
    };

 ```

   7. 删除数据
```javascript
    // 根据keyPath删除
   const request: IDBRequest = objectStore.delete(data);
    request.onsuccess = function ( event ) {
    };
    request.onerror = function ( event ) {
    };

 ```

  8. 遍历数据
  ```typescript
    const request = objectStore.openCursor();
    request.onsuccess = ( event ) => {
        let cursor = event.target.result;
        // 没有数据可遍历时 cursor === null
        if (cursor !== null) {
            callback(cursor.value);
            // 下一个
            cursor.continue();
        }
    };
    request.onerror = (event) => {
        callback(event)
    }

 ```
  