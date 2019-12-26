import { AxiosRequestConfig, AxiosePromise } from "../types";
import dispatchRequest from "./dispathRequest";

export default class Axios {
  request(config: AxiosRequestConfig):AxiosePromise {
    return dispatchRequest(config)
  }
}