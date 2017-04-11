// message.js

/**
 * Class Message encapsuled message fo User.
 */
class Message {
  /**
   * Create a instance of Message
   * @param {string} [text=''] Text for the message.
   */
  constructor (text = '') {
    this._text = text
  }

  /**
   * Get message text.
   */
  get text () {
    return this._text
  }

  /**
   * Set a new text to message.
   */
  set text (value) {
    this._text = value
  }
}

export { Message }
