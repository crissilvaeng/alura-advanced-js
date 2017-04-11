// trade-collection.js

/**
 * TradeCollection class encapsuled a list of Trade, disallowing ilegal
 * modifications.
 */
class TradeCollection {
  /**
   * Create a TradeCollection.
   */
  constructor () {
    this._trades = []
  }

  /**
   * Add a Trade to a TradeCollection.
   * @param {Trade} trade - A trade stock.
   */
  add (trade) {
    this._trades.push(trade)
  }

  /**
   * Insert a array of trades in the and of this collection.
   * @param {Array} Concat this array to the current collection.
   */
  insert (trades) {
    this._trades = this._trades.concat(trades)
  }

  /**
   * Erase ao Trades in this Trade collection.
   */
  erase () {
    this._trades = []
  }

  /**
   * Sort this collection based in the rule provided as parameter.
   * @param {Function} rule - A function describing the rules of comparation.
   */
  sort (rule) {
    this._trades.sort(rule)
  }

  /**
   * Reverse this collection.
   */
  reverse () {
    this._trades.reverse()
  }

  /**
   * Check if this collection contains a trade.
   * @param {Trade} trade - Trades to check if exists in this collection.
   * @return {Boolean} - True if this collection contains a trade, false otherwise.
   */
  contains (trade) {
    return this._trades.some(current => JSON.stringify(current) === JSON.stringify(trade))
  }

  /**
   * Get trade collection.
   * @returns {Array} A Array of Trade.
   */
  get trades () {
    return [].concat(this._trades)
  }

  /**
   * Get total volume from the trade collection.
   * @returns {number} Total volume value.
   */
  get total () {
    return this._trades.reduce((total, n) => total + n.volume, 0.0)
  }
}

export { TradeCollection }
