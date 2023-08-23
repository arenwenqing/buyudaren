import axios from 'axios'
import axiosService from 'axios-service'
// import loading from 'components/loading'
// import $user from 'user'
const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')

const setTicketToHeader = config => {
  const { headers } = config
  headers.userId = userInfo.userId
  console.log(headers)
  // headers.ticket = cookie.getItem('ticket') || window.localStorage.getItem('ticket')
  // if (window.localStorage.getItem('mail')) {
  //   headers.mail = window.localStorage.getItem('mail')
  //   headers['Auth-Type'] = window.localStorage.getItem('Auth-Type')
  // }
};

const setTicketToParams = config => {
  const { params = {} } = config;
  config.params = {
    ...params
  }
};

// const TIME_OUT = 5000
// const TIME_OUT = 3e+4;
const TIME_OUT = 10 * 60 * 1000

axiosService.init(axios, {
  requestDefaults: {
    // 目前还没实现, 预计在下个版本中处理
    autoLoading: true,
    // response.data下面的配置
    // server端请求msg(
    msgKey: 'msg',
    // server端数据的key
    dataKey: 'data',
    // server端请求状态的key
    codeKey: 'code',
    // server端请求成功的状态, 注意: 此为response.data下该接口请求成功状态码, 非浏览器中http请求返回的成功状态(200)
    successCode: 0
  }
});

// 超时时间
axios.defaults.timeout = TIME_OUT;
// 打开withCredentials
axios.defaults.withCredentials = true;

// 请求拦截器
axios.interceptors.request.use((config: any) => {
  if (config.autoLoading === undefined || config.autoLoading === true) {
    // loading.show();
  }

  // 把 ticket 放入 header 和 query 中，按需选用
  setTicketToHeader(config)
  setTicketToParams(config)
  return config
}, error => {
  // loading.hide();
  console.error('加载超时');
  return Promise.reject(error)
});

// 响应拦截器
axios.interceptors.response.use((data: any) => {
  const { autoLoading } = data.config;
  if (autoLoading === undefined || autoLoading === true) {
    // loading.hide()
  }
  // todo 返回 ticket 过期则退出
  /**
   * 处理status为0的情况
   */
  // else if (Object.prototype.hasOwnProperty.call(data.data, 'dm_error')) {
  //   data.data.dm_error = 0
  // }
  return data
}, error => {
  // loading.hide();
  return Promise.reject(error)
});
