// trade-repository.js

import { TradeDao } from './../dao/trade-dao'

/**
 * TradeRepository encapsules operations with trade manipulation.
 */
class TradeRepository {
  constructor (connection) {
    this._dao = new TradeDao(connection)
  }

  add (trade) {
    return new Promise ((resolve, reject) {
      
    })
  }
}

export { TradeRepository }
