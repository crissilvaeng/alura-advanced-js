//  trade-dao.js

import { Trade } from './../models/trade'

/**
 * Layer to database access for Trade model.
 */
class TradeDao {
  /**
   * Create a TradeDao instance.
   * @param {Object} connection - Connection with IndexedDB.
   */
  constructor (connection) {
    this._connection = connection
    this._store = 'trades'
  }

  /**
   * Add a trade in local IndexedDB.
   * @param {Trade} trade - A trading negotiation to persist in local database.
   * @returns {Promise} - Returns a promise from this requests.
   */
  add (trade) {
    return new Promise((resolve, reject) => {
      let store = this._connection.transaction([this._store], 'readwrite')
        .objectStore(this._store)

      let request = store.add(trade)

      request.onsuccess = event => resolve()

      request.onerror = event => {
        console.error(event.target.error)
        reject(event.target.error.name)
      }
    })
  }

  /**
   * Get a list of trades salved in IndexedDB.
   * @returns {Promise} - A promise with trade list as result or error.
   */
  getAll () {
    return new Promise((resolve, reject) => {
      let store = this._connection.transaction([this._store], 'readonly')
        .objectStore(this._store)

      let cursor = store.openCursor()
      let trades = []

      cursor.onsuccess = event => {
        let position = event.target.result

        if (position !== null) {
          let trade = position.value
          trades.push(new Trade(trade._date, trade._amount, trade._price))

          position.continue()
        } else {
          resolve(trades)
        }
      }

      cursor.onerror = event => {
        console.error(event.target.error)
        reject(event.target.error.name)
      }
    })
  }

  /**
   * Remove all trades salved in IndexedDB.
   * @returns {Promise} - A promise with result or error.
   */
  erase () {
    return new Promise((resolve, reject) => {
      let store = this._connection.transaction([this._store], 'readwrite')
        .objectStore(this._store)

      let request = store.clear()

      request.onsuccess = event => resolve()

      request.onerror = event => {
        console.error(event.target.error)
        reject(event.target.error.name)
      }
    })
  }
}

export { TradeDao }
