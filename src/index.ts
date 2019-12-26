import { AxiosRequestConfig, AxiosePromise, AxiosResponse } from './types'
import xhr from './xhr'
import { buildUrl } from './helper/url'
import { transformRequest, transformData } from './helper/data'
import { processHeaders } from './helper/header'

function axios(config: AxiosRequestConfig): AxiosePromise {
  // 先去处理一遍config的url和参数
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

/**
 * 在请求前对请求数据进行处理
 * @param config 传入的配置
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 此处需要注意 因为data需要为普通对象 才能处理headers的Content-Type
  // 所以需要先处理headers后处理data 顺序不能错
  config.headers = transformRequestHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { params, url } = config

  return buildUrl(url!, params) // url加上类型断言，表面不为空
}

// 处理请求body
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理请求头headers
function transformRequestHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 处理响应data
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformData(res.data)
  return res
}

export default axios
