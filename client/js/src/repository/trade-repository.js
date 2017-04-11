// trade-repository.js

import { TradeDao } from './../dao/trade-dao'

/**
 * TradeRepository encapsules operations with trade manipulation.
 */
class TradeRepository {
  /**
   * Create a TradeRepository instance given a connection with IndexedDB.
   * @param {Object} connection - A connection with IndexedDB.
   */
  constructor (connection) {
    this._dao = new TradeDao(connection)
  }

  /**
   * Add a trade in IndexedDB.
   * @param {Trade} trade - Trade to persist in IndexedDB.
   * @return {Promise} - Resolve if saves with success the trade, reject otherwise.
   */
  add (trade) {
    return new Promise((resolve, reject) => {
      this._dao.add(trade)
        .then(resolve('Trade saved with success!'))
        .catch(err => reject(err))
    })
  }
}

export { TradeRepository }
