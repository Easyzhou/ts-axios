import { head } from "shelljs";
import { puts } from "util";

/**
 * 为method定义字符串字面量类型
 */
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosePromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosePromise

  get(url: string, config: AxiosRequestConfig): AxiosePromise

  delete(url: string, config: AxiosRequestConfig): AxiosePromise

  head(url: string, config: AxiosRequestConfig): AxiosePromise

  options(url: string, config: AxiosRequestConfig): AxiosePromise

  post(url: string, data: any, config: AxiosRequestConfig): AxiosePromise

  put(url: string, data: any, config: AxiosRequestConfig): AxiosePromise

  patch(url: string, data: any, config: AxiosRequestConfig): AxiosePromise
}

export interface AxiosIntance extends Axios {
  (config: AxiosRequestConfig): AxiosePromise
}