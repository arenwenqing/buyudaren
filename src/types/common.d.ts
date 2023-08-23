declare namespace CommonType {
  interface ItemType {
    name: string
    value: string | boolean
    label: string
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      WxOpenLaunchWeapp: {
        username: string;
        path: string;
        ref: RefObject<HTMLElement>;
        children: ReactNode;
      };
    }
  }
}

interface ReturnListOtherType {
  page: number
  total: number
}
type InferType<T> = T extends (arg: infer P) => infer P ? P : T

type ReturnListType<T> = { list: InferType<T> [] } & ReturnListOtherType

type ConversionRequiredType<T> = {
  [Key in keyof T]?: T[Key]
}

interface Window {
  [propName: string]: any
}
