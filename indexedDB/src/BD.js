
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
				console.log(event)
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
}
