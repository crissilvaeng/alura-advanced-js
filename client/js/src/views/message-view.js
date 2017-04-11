// message-view.js

import { BaseView } from './base-view'

/**
 * Message View handled with the display of message.
 */
class MessageView extends BaseView {
  /**
   * Provide a template for message.
   * @param {Object} Model object to generate string content.
   * @returns {string} Message for parent element.
   */
  template (model) {
    return model.text ? `<p class="alert alert-info">${model.text}</p>`
                      : `<p></p>`
  }
}

export { MessageView }
