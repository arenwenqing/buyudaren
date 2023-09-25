/// <reference types="src/types/axios-service" />
/**
 * @overview 如果系统有统一的错误信息处理，请将 @errorMessageDecorator 注释
 */
declare class Apis {
    /**
     * 获取验证码
     */
    getVerifyCode: import("axios-service").IAxiosFun;
    /**
     * 注册
     */
    registerFromPhone: import("axios-service").IAxiosFun;
    /**
     * 登录
     */
    login: import("axios-service").IAxiosFun;
    /**
     * 用户-找回密码
     */
    getBackPwd: import("axios-service").IAxiosFun;
    /**
     * 获取用户信息
     */
    getUserInfo: import("axios-service").IAxiosFun;
    /**
     * 修改昵称
     */
    modifyName: import("axios-service").IAxiosFun;
    /**
     * 排行榜
     */
    rankingList: import("axios-service").IAxiosFun;
    /**
     * 兑换金币
     */
    exchargeGold: import("axios-service").IAxiosFun;
    /**
     * 兑换抖币
     */
    exchargeDoubi: import("axios-service").IAxiosFun;
    /**
     * 签到
     */
    signIn: import("axios-service").IAxiosFun;
    /**
     * 签到列表
     */
    signInList: import("axios-service").IAxiosFun;
    /**
     * 找回密码获取验证码
     */
    getResetVerifyCode: import("axios-service").IAxiosFun;
    /**
     * 金币-充值-预支付-微信
     */
    prepareWx: import("axios-service").IAxiosFun;
    /**
     * 金币-充值-预支付-支付宝
     */
    prepareAliPay: import("axios-service").IAxiosFun;
    /**
     * 【捕鱼-用户】判断用户是否首充
     */
    firstDeposit: import("axios-service").IAxiosFun;
}
export declare const ServiceApis: typeof Apis;
declare const _default: Apis;
export default _default;
