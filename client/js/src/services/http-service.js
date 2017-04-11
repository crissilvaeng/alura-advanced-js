// http-service.js

/**
 * HttpService encapsules complexy from a Http Request.
 */
class HttpService {
  /**
   * Get return a promise from a GET request for a resource.
   * @param {string} url - A address from the resource of this request.
   * @returns {Promise} - Returns a promise from this requests.
   */
  get (url) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest()
      request.open('GET', url)

      request.onreadystatechange = () => {
        if (request.readyState === 4) { // DONE
          if (request.status === 200) { // OK
            resolve(JSON.parse(request.responseText))
          } else {
            reject(request.responseText)
          }
        }
      }
      request.send()
    })
  }

  /**
   * Post data to server with a POST request.
   * @param {string} url
   * @param {Trade} data
   * @returns {Promise} - Returns a promise from this requests.
   */
  post (url, data) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest()
      request.open('POST', url, true)
      request.setRequestHeader('Content-type', 'application/json')
      request.onreadystatechange = () => {
        if (request.readyState === 4) { // DONE
          if (request.status === 200) { // OK
            resolve(JSON.parse(request.responseText))
          } else {
            reject(request.responseText)
          }
        }
      }
      request.send(JSON.stringify(data))
    })
  }
}

export { HttpService }
