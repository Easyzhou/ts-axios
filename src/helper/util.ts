const objToString = Object.prototype.toString;

// 使用类型保护，让调用日期对象方法时不会报错 val is Date & val is Object为类型保护
export function isDate(val: any): val is Date {
  // 判断类型的方法
  return objToString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// 普通对象判断方法
export function isPlainObject(val: any): val is Object {
  return objToString.call(val) === '[object Object]';
}