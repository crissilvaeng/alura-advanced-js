// trade-controller.js

import { Bind } from './../helpers/bind'
import { DateConverter } from './../helpers/date-converter'

import { MessageView } from './../views/message-view'
import { TradeView } from './../views/trade-view'

import { Message } from './../models/message'
import { Trade } from './../models/trade'
import { TradeCollection } from './../models/trade-collection'

import { TradeService } from './../services/trade-service'
import { ConnectionFactory } from './../services/connection-factory'

import { TradeDao } from './../dao/trade-dao'

import { TradeRepository } from './../repository/trade-repository'

/**
 * Class controller to perform trading operations.
 */
class TradeController {
  /**
   * Create a TradeController.
   */
  constructor () {
    // Syntax sugar to transform document.querySelector(any) call in $.
    let $ = document.querySelector.bind(document)

    this._date = $('#data')
    this._amount = $('#quantidade')
    this._price = $('#valor')

    this._sorted = ''

    this._service = new TradeService()

    this._collection = new Bind(
      new TradeCollection(),
      new TradeView($('#trade-view')),
      'add', 'insert', 'sort', 'reverse', 'erase'
    )

    this._message = new Bind(
      new Message(),
      new MessageView($('#message-view')),
      'text'
    )

    this._repository = null
    ConnectionFactory.getConnection()
      .then(connection => {
        this._repository = new TradeRepository(connection)
      }).catch(err => {
        this._message = err
      })

    this._init()
  }

  /**
   * Initialize method.
   */
  _init () {
    ConnectionFactory.getConnection()
      .then(connection => new TradeDao(connection))
      .then(dao => dao.getAll())
      .then(trades => this._collection.insert(trades))
      .catch(err => console.error(err))

    setInterval(() => this.import(), 3000)
  }

  /**
   * Add trade event catcher.
   * @param {object} event - Event trigger.
   */
  add (event) {
    event.preventDefault()

    let trade = this._create()
    this._repository.add(trade)
      .then(msg => {
        this._collection.add(trade)
        this._message = msg
        this._clean()
      })
      .catch(err => {
        this._message.text = err
      })
  }

  /**
   * Import get trades from server.
   */
  import () {
    this._service.getAllTrades()
      .then(trades => trades.filter(
        trade => this._collection.contains(trade) === false))
      .then(trades => {
        this._collection.insert(trades)
        this._message.text = 'Trades imported with success!'
      }).catch(err => {
        this._message.text = err
      })
  }

  /**
   * Sort the table with trades based on the column select for sort.
   * @param {string} column - The column to sort.
   */
  sort (column) {
    if (this._sorted === column) {
      this._collection.reverse()
    } else {
      this._collection.sort((a, b) => a[column] - b[column])
    }
    this._sorted = column
  }

  /**
   * Erase remove all trades of collection and popup a message.
   */
  erase () {
    ConnectionFactory.getConnection()
      .then(connection => new TradeDao(connection))
      .then(dao => dao.erase())
      .then(() => {
        this._collection.erase()
        this._message.text = 'All traiding was deleted.'
      })
      .catch(err => {
        this._message.text = err
      })
  }

  /**
   * Create a Trade.
   * @returns {Trade} Trade create with the data of form.
   */
  _create () {
    let date = DateConverter.toDate(this._date.value)
    return new Trade(date, parseInt(this._amount.value), parseFloat(this._price.value))
  }

  /**
   * Clean form and set focus in field Date.
   */
  _clean () {
    let $ = document.querySelector.bind(document)

    $('.form').reset()
    this._date.focus()
  }
}

let controller = new TradeController()
export function instance () {
  return controller
}
