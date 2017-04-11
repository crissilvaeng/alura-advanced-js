// base-view.js

/**
 * BaseView is the base class for view implementations.
 */
class BaseView {
  /**
   * Build a instance based in view, salving the parent element.
   * @param {Element} element - Parent element for the component.
   */
  constructor (element) {
    this._element = element
  }

  /**
   * Generate a string with the content for the view component.
   * @param {Object} Model object to generate string content.
   * @returns {string} String content for view component.
   */
  template (model) {
    throw new Error('Method BaseView._template(model) should be implemented.')
  }

  /**
   * Draw view component in element passed in constructor.
   * @param {Object} model - Model base to rederizer view.
   */
  update (model) {
    this._element.innerHTML = this.template(model)
  }
}

export { BaseView }
