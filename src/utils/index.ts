import classnames from 'classnames'

// 是否本地环境
export const isLocal = /^localhost|127.0|192.168/.test(window.location.host)

// 开发环境 or 线上环境
export const isDev = /^test/.test(window.location.host) || isLocal

// classnames
export function classNames(prefix, styles) {
  let cx = classnames;
  if (arguments.length === 0) {
    return cx;
  } else if (arguments.length === 1) {
    // eslint-disable-next-line prefer-rest-params
    if (typeof (arguments[0]) === 'string') {
      // Just add prefix whithout bind css module.
    } else {
      // Just bind css moudle whitout add prefix.
      return classnames.bind(styles);
    }
  } else {
    cx = classnames.bind(styles);
  }
  return (...classnames) => {
    return cx(classnames).split(' ').filter(i => i).map(classname => `${prefix}-${classname}`).join(' ') || prefix
  }
}

/**
 * 将url中? 后面的参数, 变成一个json
 * @return {Object}
 * @example 'a=1&b=3' => {a: 1, b: 3}
 */
export function getUrlParams (sourceStr?: string) {
  // 防止hash值, 影响参数名称
  let search;
  if (sourceStr) {
    search = sourceStr.indexOf('?') > -1 ? sourceStr.split('?').slice(-1).toString() : sourceStr;
  } else {
    // 链接中的最后一个
    search = window.location.href.indexOf('?') > -1 && window.location.href.split('?').slice(-1).toString().replace(/#!\/.+/, '');
  }

  // 如果没有, 则返回空对象
  if (!search) return {};

  const searchArr = decodeURIComponent(search).split('&');

  const urlParams = {};

  /* eslint-disable-next-line array-callback-return */
  searchArr.map(str => {
    const paramArr = str.split('=');
    // 如果已经有该参数就不添加进去了
    if (urlParams[paramArr[0]]) return false;

    urlParams[paramArr[0]] = unescape(paramArr[1]);
  });

  return urlParams;
}

/**
 * 参数格式化, 符合url方式
 * @params {Object} {a: '123', age: '18'}
 * @return {String} 'a=123&age=18'
 */
export function stringifyParams(params, cb?:any) {
  let name
  let value
  let str = ''

  /* eslint-disable-next-line */
  for (name in params) {
    value = params[name]
    str += `${name}=${typeof cb === 'function' ? cb(value, name) : value}&`
  }

  return str.slice(0, -1)
}

export function genId () {
  /* eslint-disable no-bitwise */
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  }).toUpperCase();
  /* eslint-enable no-bitwise */
}

/**
 * 得到url中某个参数
 */
export function getUrlParam (name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const search = window.location.search.substring(1) || (window.location.href.split('?')[1] && window.location.href.split('?')[1].replace(/#!\/.+/, ''));
  if (!search) return false;
  const r = search.replace('#', '').match(reg);

  if (r != null) {
    // 对编码的字符串进行解码
    const decodeStr = decodeURI(r[2]);
    switch (decodeStr) {
    case 'true':
      return true;
    case 'null':
      return null;
    case 'false':
      return false;
    case 'undefined':
      return undefined;
    default:
      return decodeStr;
    }
  } else {
    return null;
  }
}