import { AxiosIntance } from "./types";
import Axios from "./core/Axios";
import { extend } from "./helper/util";

function createInstance(): AxiosIntance {
  const context = new Axios()

  // 将Axios类中方法的上下文this指向instance
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)
  return instance as AxiosIntance
}

const axios = createInstance()

export default axios