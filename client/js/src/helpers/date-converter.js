// date-converter.js

/**
 * Class converter to handler with commons Date display and convertion problems.
 */
class DateConverter {
  /**
   * Dateconverter constructor throws a Error, because this class has only static
   * methods.
   */
  constructor () {
    throw new Error('DateConverter has only static methods.')
  }

  /**
   * Convert a text in a Date.
   * @param {string} date - String representation of date.
   * @return {Date} A date object for the string representation.
   */
  static toDate (date) {
    if (/\d{2}\/\d{2}\/\d{4}/.test(date) === false) {
      throw new Error('Date string should be in the format dd/mm/yyyy.')
    }

    return new Date(...date.split('/').reverse().map((item, index) => {
      return item - index % 2 // fix the difference in month
    }))
  }

  /**
   * Convert a Date in a formated text.
   * @param {Date} date - Date object to convert to string.
   * @returns {string} A formated string representation of a Date object.
   */
  static toString (date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
}

export { DateConverter }
