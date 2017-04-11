// proxy-factory.js

/**
 * Models proxy factory class.
 */
class ProxyFactory {
  /**
   * IsFunction discover if the parameter is a function type.
   * @param {Object} func - A element to test if is a function.
   * @return {Boolean} True if the parameter is a function, false otherwise.
   */
  static _isFunction (func) {
    return typeof (func) === typeof (Function)
  }

  /**
   * Create a proxy factory for a model.
   * @param {Object} object - A instance of a Model Class.
   * @param {Array} props - A array with the names of methods.
   * @param {Function} action - A function with the action to start when a method was called.
   * @returns {Object} Return undefined or a object with the normal result from the called.
   */
  static create (object, props, action) {
    return new Proxy(object, {

      get (target, prop, receiver) {
        if ((props.includes(prop) === true) &&              // If the called property is registred in this proxy and
            ProxyFactory._isFunction(target[prop])) {       // the called proxy is a function.
          return function () {
            Reflect.apply(target[prop], target, arguments)  // Perform the function passing the arguments.
            return action(target)                           // Perform the action passing the model.
          }
        }

        return Reflect.get(target, prop, receiver)
      },

      set (target, prop, value, receiver) {
        let result = Reflect.set(target, prop, value, receiver)

        if (prop.includes(prop) === true) { // If the called property is refgistred int this proxy.
          action(target)                    // Perform the action passing the model.
        }

        return result
      }
    })
  }
}

export { ProxyFactory }
