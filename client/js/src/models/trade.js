// trade.js

/**
 * Class representing stock trading.
 */
class Trade {
  /**
   * Create a stock trade.
   * @param {number} date - Date of trading.
   * @param {number} amount - Amount of stocks.
   * @param {number} price - Individual stocks prices.
   */
  constructor (date, amount, price) {
    // Create a new date representation for not to allow modifications a date
    // object outside this class.
    this._date = new Date(date.getTime())
    this._amount = amount
    this._price = price

    // Freezing the object because after created a trade can't be modified.
    Object.freeze(this)
  }

  /**
   * Get date value.
   * @return {Date} The trading date.
   */
  get date () {
    // Create a new date representation for not to allow modifications in the
    // original object.
    return new Date(this._date.getTime())
  }

  /**
   * Get amount value.
   * @return {number} The stocks amount of this trade.
   */
  get amount () {
    return this._amount
  }

  /**
   * Get price value.
   * @return {number} The stock individual price.
   */
  get price () {
    return this._price
  }

  /**
   * Get volume value.
   * @return {number} The trade total amount.
   */
  get volume () {
    return this._amount * this._price
  }
}

export { Trade }
