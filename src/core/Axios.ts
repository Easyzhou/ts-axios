import { AxiosRequestConfig, AxiosePromise, Method } from "../types";
import dispatchRequest from "./dispathRequest";

export default class Axios {
  request(config: AxiosRequestConfig):AxiosePromise {
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosePromise {
    return this.requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosePromise {
    return this.requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosePromise {
    return this.requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosePromise {
    return this.requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosePromise {
    return this.requestMethodWithoutData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosePromise {
    return this.requestMethodWithoutData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosePromise {
    return this.requestMethodWithoutData('patch', url, data, config)
  }

  private requestMethodWithoutData(method: Method, url: string, data?: any, 
    config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }))
  }
}