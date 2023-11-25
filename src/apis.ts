import srcConfig from '../requestConfig'
import { getRequestsByRoot } from 'axios-service'

const root = srcConfig.APIS.root

const { post, get } = getRequestsByRoot({ root })

/**
 * @overview 如果系统有统一的错误信息处理，请将 @errorMessageDecorator 注释
 */
class Apis {
  /**
   * 获取验证码
   */
  getVerifyCode = post('/api/mystery/user/register/phone/verifyCode')

  /**
   * 注册
   */
  registerFromPhone = post('/api/mystery/user/register/phone')

  /**
   * 登录
   */
  login = post('/api/mystery/user/login/phone')

  /**
   * 用户-找回密码
   */
  getBackPwd = post('/api/mystery/user/password/reset')

  // /**
  //  * 【首页】钥匙-充值-预支付-微信
  //  */
  // prepareWx = post('/api/mystery/key/deposit/prepare/wx')

  // /**
  //  * 【支付】钥匙-充值-预支付-支付宝
  //  */
  // prepareAliPay = post('/api/mystery/key/deposit/prePay/ali')

  /**
   * 获取用户信息
   */
  getUserInfo = get('/api/mystery/fish/user/detail')

  /**
   * 修改昵称
   */
  modifyName = post('/api/mystery/user/nickname/modify')

  /**
   * 排行榜
   */
  rankingList = get('/api/mystery/fish/ranking/list')

  /**
   * 兑换金币
   */
  exchargeGold = post('/api/mystery/fish/currency/diamondToGoldCoin')

  /**
   * 兑换抖币
   */
  exchargeDoubi = post('/api/mystery/fish/currency/diamondToDyMoney')

  /**
   * 兑换卡劵
   */
  exchargeCard = post('/api/mystery/fish/coupon/exchange')

  /**
   * 签到
   */
  signIn = post('/api/mystery/fish/user/signIn')

  /**
   * 签到列表
   */
  signInList = get('/api/mystery/fish/user/signIn/list')

  /**
   * 找回密码获取验证码
   */
  getResetVerifyCode = post('/api/mystery/user/password/reset/verifyCode')

  /**
   * 金币-充值-预支付-微信
   */
  prepareWx = post('/api/mystery/fish/currency/goldCoin/deposit/prePay/wx')

  /**
   * 金币-充值-预支付-支付宝
   */
  prepareAliPay = post('/api/mystery/fish/currency/goldCoin/deposit/prePay/ali')

  /**
   * 【捕鱼-用户】判断用户是否首充
   */
  firstDeposit = get('/api/mystery/fish/currency/user/firstDeposit')

  /**
   * 兑换记录
   */
  getRecordList = post('/api/mystery/fish/coupon/record/list')

  /**
   * 卡劵兑换列表
   */
  couponsList = get('/api/mystery/fish/coupon/list')
}

export const ServiceApis = Apis;
export default new Apis()
