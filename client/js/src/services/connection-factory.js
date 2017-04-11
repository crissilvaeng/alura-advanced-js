// connection-factory.js

const stores = ['trades']
const version = 2
const dbName = 'tradingframe'

let connection = null
let close = null

/**
 * Class manages the connection access with the IndexedDB.
 */
class ConnectionFactory {
  /**
   * ConnectionFactory has only static methods, no use this constructor.
   */
  constructor () {
    throw new Error('Ubale to create instances of connection factory.')
  }

  /**
   * Returns a Promise with only a single IndexedDB's connection.
   * @returns {Promise} - A promise with connection or error.
   */
  static getConnection () {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(dbName, version)

      request.onupgradeneeded = event => {
        ConnectionFactory._createStores(event.target.result)
      }

      request.onsuccess = event => {
        if (connection === null) {
          connection = event.target.result
          close = connection.close.bind(connection)

          connection.close = function () {
            throw new Error('Close connection is not allowed.')
          }
        }
        resolve(event.target.result)
      }

      request.onerror = event => {
        console.error(event.target.error)
        reject(event.target.error.name)
      }
    })
  }

  /**
   * On event onupgradeneeded this method create news stores.
   * @param {Object} connection - Success connection with IndexedDB.
   */
  static _createStores (connection) {
    stores.forEach(store => {
      if (connection.objectStoreNames.contains(store) === true) {
        connection.deleteObjectStore(store)
      }
      connection.createObjectStore(store, {autoIncrement: true})
    })
  }

  /**
   * Close connection with IndexedDb.
   */
  static closeConnection () {
    if (connection !== null) {
      close()
      connection = null
    }
  }
}

export { ConnectionFactory }
