import { AxiosRequestConfig, AxiosePromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helper/header'
import { createError } from '../helper/error'

export default function xhr(config: AxiosRequestConfig): AxiosePromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (timeout) {
      request.timeout = timeout
    }

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toLocaleUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) return

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = request.responseType === 'text' ? request.responseText : request.response
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      handleResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} exceeded`, config, 'ECONNABORTED', request))
    }

    // 此处设置请求头headers
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status <= 300) {
        resolve(response)
      } else {
        reject(createError(`Request Failed with status code ${response.status}`, config, null, request, response))
      }
    }

    request.send(data)
  })
}
