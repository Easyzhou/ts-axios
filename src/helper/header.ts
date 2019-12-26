import { isPlainObject } from './util';

/**
 * 因为客户端可以将headers中的Content-Type设置为content-type
 * 所以此处我们将此字段做一个格式化
 * @param headers headers对象
 * @param normalizeName 格式化的名称
 */
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return;
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name];
      delete headers[name];
    }
  })
}

/**
 * 对请求headers进行一些处理
 * @param headers 传入的请求头
 * @param data 携带的参数，此处的作用是判断传入的参数是否为普通对象，来决定如何设置请求头
 */
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type');
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers;
}

/**
 * 处理响应头
 * @param headers 响应头
 */
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach((line) => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val.trim()
    }

    parsed[key] = val
  })

  return parsed
}