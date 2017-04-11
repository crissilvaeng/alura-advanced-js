// trade-view.js

import { BaseView } from './base-view'
import { DateConverter } from './../helpers/date-converter'
import { instance } from './../controllers/trade-controller'

/**
 * TradeView is the specification of the way to display Trade entities.
 */
class TradeView extends BaseView {
  /**
   * Build a instance of trade view with a event listenet to sort columns.
   * @param {Element} element - Parent element for the component.
   */
  constructor (element) {
    super(element)
    element.addEventListener('click', function (event) {
      if (event.target.nodeName === 'TH') {
        instance().sort(event.target.textContent.toLowerCase())
      }
    })
  }

  /**
   * Provide a template for trade table.
   * @returns {string} Table for Trades layout.
   */
  template (model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
            <th>VOLUME</th>
          </tr>
        </thead>
        
        <tbody>
          ${model.trades.map(trade => {
            return `
              <tr>
                <td>${DateConverter.toString(trade.date)}</td>
                <td>${trade.amount}</td>
                <td>${trade.price}</td>
                <td>${trade.volume}</td>
              </tr>
            `
          }).join('')}
        </tbody>
          <td colspan="3">Total</td>
          <td>${
            model.total
          }</td>
        <tfoot>
        </tfoot>
      </table>
    `
  }
}

export { TradeView }
