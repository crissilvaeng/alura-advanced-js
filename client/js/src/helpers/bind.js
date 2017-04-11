// bind.js

import { ProxyFactory } from './../services/proxy-factory'

/**
 * Bind associate the view with the model.
 */
class Bind {
  /**
   * Build a instance of this Bind.
   * @param {Object} model - A instance of a model class.
   * @param {Object} view - A instance if a view class.
   * @param {Array} props - A array with the props for trigger actions when change.
   * @returns {Proxy} - Return a configured proxy.
   */
  constructor (model, view, ...props) {
    let proxy = ProxyFactory.create(model, props, model => {
      view.update(model)
    })

    view.update(model)

    return proxy
  }
}

export { Bind }
