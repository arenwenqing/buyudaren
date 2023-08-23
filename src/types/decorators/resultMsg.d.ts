interface msgParam {
  successMsg: string;
  errorMsg: string
}
export function messageDecorator(msgParam): any;
// 只展示错误信息
export const errorMessageDecorator: any;
// 只展示成功信息
export function successMessageDecorator(msg?: string): any;