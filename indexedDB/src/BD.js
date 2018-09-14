
// declare var mozIndexedDB: IDBFactory;
// declare var webkitIndexedDB: IDBFactory;
// declare var msIndexedDB: IDBFactory;

var indexedDB = window.indexedDB || mozIndexedDB || webkitIndexedDB || msIndexedDB;

export default class DB {
    constructor(databaseName, version = 1) {
		this.version = version;
		this.db = null;
		this.init(databaseName);
    }
    init(databaseName) {
        const request = indexedDB.open( databaseName, this.version );
			request.onupgradeneeded = function ( event ) {
				this.db = event.target.result;
				if ( this.db.objectStoreNames.contains( 'states' ) === false ) {
					this.db.createObjectStore( 'states' );
				}
			};
			request.onsuccess = function ( event ) {
				
			};
			request.onerror = function ( event ) {
				console.error( 'IndexedDB', event );
			};
	}
	/* 事务 */
	transaction(stroeName) {
		return database.transaction( [ stroeName ], 'readwrite' );
	}
	/*  */
	objectStore(stroeName) {
		this.transaction(stroeName).objectStore( stroeName );
	}
	get(stroeName, callback) {
		// 事物
		var objectStore = this.objectStore( stroeName );
		var request = objectStore.get( 0 );
		request.onsuccess = function ( event ) {
			callback( event.target.result );
		};
	}

	put(stroeName, data, callback) {
		var objectStore = this.objectStore( stroeName );
		var request = objectStore.put( data, 0 );
		request.onsuccess = function ( event ) {
			callback(event.target.result);
		};

	}

	add(data, callback) {

	}
	clear(stroeName) {
		if ( this.database === undefined ) return;
		var objectStore = this.objectStore( stroeName );
		var request = objectStore.clear();
		request.onsuccess = function ( event ) {

			console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Cleared IndexedDB.' );

		};

	}
}
