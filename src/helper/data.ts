import { isPlainObject } from "./util";

export function transformRequest(data: any): any {
  // 这里判断是否为普通对象 非FormData, Date等
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }

  return data;
}

export function transformData(data: any): any {
  if (typeof data === 'string') {
    // 避免data不是json字符串使用 try catch语法
    try {
      data = JSON.parse(data)
    } catch(e) {
      // do noting
    }
  }

  return data
}