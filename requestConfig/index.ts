
import build from './build'

const IS_DEV = build.IS_DEV
const HOST = window.location.host
const ORIGIN = window.location.origin
const PATHNAME = window.location.pathname
const SERACH = window.location.search

const prodRootMap = {
  'mystery.tuanzhzh.com': {
    root: 'https://mystery.tuanzhzh.com/'
  }
}

const rootObj = prodRootMap[Object.keys(prodRootMap).find(key => HOST.indexOf(key) === 0)] || {}

const DEFAULT_ROOT = '/'

const getRootStr = rootStr => {
  return rootStr || DEFAULT_ROOT
}

const PROD = {
  APIS: {
    uploadMediaRoot: getRootStr(rootObj.uploadMediaRoot),
    uploadRoot: getRootStr(rootObj.uploadRoot),
    flowRoot: getRootStr(rootObj.flowRoot),
    root: getRootStr(rootObj.root),
    authRoot: getRootStr(rootObj.authRoot)
  }
}

const DEV = {
  APIS: {
    uploadMediaRoot: DEFAULT_ROOT,
    uploadRoot: DEFAULT_ROOT,
    flowRoot: DEFAULT_ROOT,
    root: DEFAULT_ROOT,
    authRoot: DEFAULT_ROOT
  }
}

const ssoService = encodeURIComponent(`${ORIGIN + PATHNAME + SERACH}`)

// 开发环境权限总开关 false - 关闭权限菜单， true - 开启权限菜单
const devAuthority = true

const OBJ = {
  SUPER_ADMIN: ['wanghl@inke.cn', 'lin@inke.cn'],
  IS_DEV,

  USER_INFO_MOCK: false,

  // 手机登录情况下，登录页面路由地址
  PHONE_LOGGIN_PATH: 'login',

  SSO_PAGE_SERVICE: `http://sso.inkept.cn/?service=${ssoService}`,

  SSO_PAGE_URL: 'http://sso.inkept.cn',

  SSO_LOGOUT_PAGE_SERVICE: `https://sso.inkept.cn/api/v1/user/logout/?service=${ssoService}`,

  build,

  ...build.ENV,

  ...IS_DEV ? DEV : PROD,

  // 该系统权限标识，获取请联系 @李宁，2 为测试系统
  // http://wiki.inkept.cn/pages/viewpage.action?pageId=50851740
  AUTH_SYSTEM_ID: 2,

  // 系统中文名称
  SYSTEM_CHINA_NAME: '固定资产管理系统 ',

  // 系统英文缩写
  SYSTEM_US_NAME: 'Legal',

  // 系统地址
  SYSTEM_URL: 'legal.inkept.cn',

  // 权限总开关 false - 关闭权限菜单， true - 开启权限菜单
  authority: IS_DEV ? devAuthority : true,

  // 使用情况监控，获取请联系 @赵通，-1 则全局关闭监控
  // http://wiki.inkept.cn/pages/viewpage.action?pageId=54597351
  LOG_SYSTEM_SOURCE: -1
}
export default OBJ
