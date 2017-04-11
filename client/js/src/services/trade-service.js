// trade-service.js

import { HttpService } from './http-service'
import { Trade } from './../models/trade'

/**
 * TradeService encapsules all interaction with the Trading Service.
 */
class TradeService {
  /**
   * Build a instance of TradeService with a HttpService.
   */
  constructor () {
    this._http = new HttpService()
  }

  /**
   * GetTradesOfCurrentWeek return all trades maked in this week.
   * @returns {Promise} - Returns a promise from this requests.
   */
  getTradesOfCurrentWeek () {
    return this._http.get('trades/week')
      .then(trades => {
        return trades.map(trade => new Trade(new Date(trade.date), trade.amount, trade.price))
      }).catch(err => {
        console.error(err)
        throw new Error('Was not possible import the trades from the service.')
      })
  }

  /**
   * GetTradesOfLastWeek return all trades maked in this week.
   * @returns {Promise} - Returns a promise from this requests.
   */
  getTradesOfLastWeek () {
    return this._http.get('trades/last-week')
      .then(trades => {
        return trades.map(trade => new Trade(new Date(trade.date), trade.amount, trade.price))
      }).catch(err => {
        console.error(err)
        throw new Error('Was not possible import the trades from the service.')
      })
  }

  /**
   * GetTradesOfBeforeLastWeek return all trades maked in this week.
   * @returns {Promise} - Returns a promise from this requests.
   */
  getTradesOfBeforeLastWeek () {
    return this._http.get('trades/before-last-week')
      .then(trades => {
        return trades.map(trade => new Trade(new Date(trade.date), trade.amount, trade.price))
      }).catch(err => {
        console.error(err)
        throw new Error('Was not possible import the trades from the service.')
      })
  }

  /**
   * GetAllTrades return all trades from the current week, the last week and the
   * week before.
   * @returns {Array} - A array of trades.
   */
  getAllTrades () {
    return Promise.all([
      this.getTradesOfCurrentWeek(),
      this.getTradesOfLastWeek(),
      this.getTradesOfBeforeLastWeek()
    ]).then(result => {
      return result.reduce((flat, array) => flat.concat(array), [])
    }).catch(err => {
      throw new Error(err)
    })
  }

  /**
   * Post a trade to trading API.
   * @param {Trade} trade - A trade for send to server,
   * @returns {Promise} - A promise with result or error.
   */
  postNewTrade (trade) {
    let data = {
      date: trade.date,
      amount: trade.amount,
      price: trade.price
    }
    return this._http.post('/trades', data)
      .then(result => {
        return result
      }).catch(err => {
        console.error(err)
        throw new Error('Not was possible send this trading to service.')
      })
  }
}

export { TradeService }
