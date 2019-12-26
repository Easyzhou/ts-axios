/**
 * @param url 的一些辅助函数
 */
import {isDate, isPlainObject} from './util';

/**
 * 
 * @param val 需要编译的url字符串
 */
function encode(val: string): string {
  return encodeURIComponent(val)
  .replace(/%40/g, '@')
  .replace(/%3A/gi, ':')
  .replace(/%24/g, '$')
  .replace(/%2C/ig, ',')
  .replace(/%20/g, '+')
  .replace(/%5B/gi, '[')
  .replace(/%5d/gi, ']')
}

/**
 * 方法为将携带的参数params写入到url中
 * @param url 请求路径
 * @param params 请求携带的参数
 */
export function buildUrl(url: string,params?: any): string {
  if (!params) {
    return url;
  }

  const parts: string[] = [];

  Object.keys(params).forEach((key) => {
    const val = params[key];

    if (val === null || typeof val === 'undefined') {
      return
    }

    let values = [];
    if (Array.isArray(val)) {
      key += '[]';
      values = val;
    } else {
      values = [val]
    }

    values.forEach(k => {
      if (isDate(k)) {
        k = k.toISOString();
      } else if (isPlainObject(k)) {
        k = JSON.stringify(k);
      }
      parts.push(`${encode(key)}=${encode(k)}`);
    });
  });

  let serializedParams = parts.join('&');
  if (serializedParams) {
    // 将url中含有哈希标识得后面的参数忽略掉
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }

    // 需要判断url中是否已经含有?如果有就拼接‘&’符，没有就拼接‘?’符
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
} 