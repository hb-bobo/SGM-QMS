
// declare var mozIndexedDB: IDBFactory;
// declare var webkitIndexedDB: IDBFactory;
// declare var msIndexedDB: IDBFactory;

var indexedDB = window.indexedDB || mozIndexedDB || webkitIndexedDB || msIndexedDB;
const isObject = function (data) {
	return Object.prototype.toString(data) === '[object Object]';
}

export default class DB {
    constructor(databaseName, version, storeOptions) {
		this._dbs = {};
		this._databaseName = databaseName;
		this.init(databaseName, version, storeOptions);
	}

	init(databaseName, version, storeOptions) {
		let _version;
		let _storeOptions;
		if (version && typeof version === 'number') {
			_version = version;
		} else if (isObject(version)) {
			_storeOptions = version;
			_version = 1;
		}
		return this.open(databaseName, _version, _storeOptions);
	}
	/**
	 * 打开数据库
	 * @param {string} databaseName
	 * @param {number} version
	 * @param {Object}
	 * @return {Promise}
	 */
    open(databaseName, version, storeOptions) {
		return new Promise((resolve, reject) => {
			// IDBOpenDBRequest 
			const request = indexedDB.open( databaseName, version );
				// 版本更新，创建新的store的时候
				request.onupgradeneeded = ( event ) => {
					// IDBDatabase
					let database = event.target.result;
					// 缓存起来
					this._dbs[databaseName + version] = database;
					for (let key in storeOptions) {
						if ( database.objectStoreNames.contains( key ) === false ) {
							let keyPath = storeOptions[key] ? storeOptions[key] : [];
							database.createObjectStore( key, {keyPath});
						}
					}
					resolve();
				};
				request.onsuccess = ( event ) => {
					// IDBDatabase 
					let database = event.target.result;
					// 缓存起来
					this._dbs[databaseName + version] = database;
					resolve(database);
				};
				request.onerror = ( event ) => {
					reject(event);
					console.error( 'IndexedDB', event );
				};
		});
		
	}
	/**
	 * 获取 IDBDatabase
	 * @param {string} databaseName 
	 * @param {number} version
	 * @return {Promise} Promise.resolve(IDBDatabase)
	 */
	async _getDatabase(databaseName, version = 1) {
		if (this._dbs[databaseName + version]) {
			return this._dbs[databaseName + version];
		}
		else {
			let db = this.open(databaseName, version);
			return db;
		}
	}
	/**
	 * 获取 IDBTransaction
	 * IDBTransaction: 表示事务。您在数据库上创建事务，指定范围（例如您要访问的对象存储），并确定所需的访问类型（只读或读写）
	 * @param {string} storeName
	 * @param {number} version
	 * @return {Promise}
	 */
	async _getTransaction(storeName, version) {
		let db = await this._getDatabase(this._databaseName, version);
		return db.transaction( [ storeName ], 'readwrite' );
	}
	/**
	 * 获取store
	 * IDBObjectStore: 表示允许访问IndexedDB数据库中的一组数据的对象存储，
	 * @param {string} storeName
	 * @param {number} version
	 * @return {IDBObjectStore}
	 */
	async _getObjectStore(storeName, version) {
		let objectStore = await this._getTransaction(storeName, version);
		return objectStore.objectStore( storeName );;
	}

	/**
	 * 
	 * @param {string} storeName
	 * @param {string} version
	 */
	collection(storeName, version) {
		this.currentStore = storeName;
		this._getObjectStore(storeName, version);
		return this;
	}
	get(data) {
		return new Promise((resolve, reject) => {
			this._getObjectStore(this.currentStore).then((objectStore) => {
				const request = objectStore.get( 0 );
				request.onsuccess = function ( event ) {
					resolve(event);
				};
			});
		});
	}
	/**
	 * 
	 * @param {any} data 
	 * @return {Promise}
	 */
	add(data) {
		return new Promise((resolve, reject) => {
			this._getObjectStore(this.currentStore).then((objectStore) => {
				console.log(data)
				const request = objectStore.add(data);
				request.onsuccess = function ( event ) {
					resolve(event);
				};
			});
		});
	}
	/**
	 * 
	 * @param {any} data 
	 * @return {Promise}
	 */
	delete(data) {
		return new Promise((resolve, reject) => {
			this._getObjectStore(this.currentStore).then((objectStore) => {
				const request = objectStore.delete(data);
				request.onsuccess = function ( event ) {
					resolve(event);
				};
			});
		});
	}
	/**
	 * 
	 * @param {any} data 
	 * @return {Promise}
	 */
	put(data) {
		return new Promise((resolve, reject) => {
			this._getObjectStore(this.currentStore).then((objectStore) => {
				const request = objectStore.put(data);
				request.onsuccess = function ( event ) {
					resolve(event);
				};
			});
		});
	}
	
	/**
	 * 
	 * @param {string} storeName 
	 * @return {Promise}
	 */
	clear(storeName) {
		return new Promise((resolve, reject) => {
			const objectStore = this.getObjectStore( storeName );
			const request = objectStore.clear();
			request.onsuccess = ( event ) => {
				resolve(event);
			};
			request.onerror = (event) => {
				reject(event)
			}
	});
	}
}
