declare module 'axios-service' {
  interface IReqParam {
    root: string
  }
  interface AxiosConfig {
    url?: string;
    params?: string|object;
    data?: string|string;
    autoLoading?:boolean;
    baseURL?: string;
    [key: string]: any;
  }
  interface IResponseData {
    status: number;
    data: any;
    msg: string;
  }
  interface IAxiosFun {
    (params?: string|object, config?: AxiosConfig): Promise<any>
  }
  interface IHttpRes {
    get(url: string): IAxiosFun;
    post(url: string): IAxiosFun;
    postXForm(url: string): IAxiosFun;
    postXFormData(url: string): IAxiosFun;
    postXFormString(url: string): IAxiosFun;
  }
  export function getRequestsByRoot(IReqParam): IHttpRes;

  interface msgDecParam {
    // eslint-disable-next-line @typescript-eslint/ban-types
    success: Function;
    // eslint-disable-next-line @typescript-eslint/ban-types
    error: Function;
  }
  export function getMessageDecorator(msgDecParam):any

  export function init(a:any, b: any): any
}

