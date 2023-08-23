import React, { useState, useCallback, useContext } from 'react'
import { Form, Input,Toast } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import Apis from 'src/apis'
import {
  setUserId,
  Context
} from 'src/store'
import './index.less'

const LoginForm: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const { dispatch } = useContext<any>(Context)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const loginHande = useCallback( async () => {
    const obj = await form.validateFields()
    Apis.login(obj).then(res => {
      if (res.data.loginResult) {
        Toast.show({
          icon: 'success',
          content: '成功'
        })
        window.localStorage.setItem('user', JSON.stringify(res.data.user || {}))
        dispatch(setUserId(res.data.user.userId))
        navigate({
          pathname: '/home',
          search: window.location.search
        })
      } else {
        Toast.show({
          icon: 'fail',
          content: res.data.loginMsg
        })
      }
    })
  }, [])

  const forgetPasswordHandle = () => {
    navigate({
      pathname: '/forget',
      search: window.location.search
    })
  }

  // const wechatLogin = () => {
  //   // 小程序appid
  //   // redirect_uri重定向至当前页面
  //   // snsapi_userinfo 用户手动授权

  //   // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb48e40dbe585c7f2&redirect_uri=http://192.168.3.143:12345/login&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect'
  //   window.location.href = 'weixin://wap/pay'
  //   // window.ap.chooseImage()
  //   // window.ap.tradePay({
  //   //   tradeNO: '201802282100100427058809844'
  //   // }, function(res){
  //   //   window.ap.alert(res.resultCode);
  //   // });
  // }

  return <div className='login-form-wrapper'>
    <Form layout='horizontal' form={form}>
      <div className='login-item'>
        <span className='login-item-title'>手机号</span>
        <div className='login-item-component'>
          <Form.Item noStyle name='phoneNum' rules={[{ required: true, message: '请输入手机号'}]}>
            <Input placeholder='请输入11位手机号' clearable className='input-style' />
          </Form.Item>
        </div>
      </div>
      <div className='login-item'>
        <span className='login-item-title'>密码</span>
        <div className='login-item-component'>
          <Form.Item
            name='passwd'
            rules={[{ required: true, message: '请输入密码'}]}
            extra={
              <div className='eye'>
                {!visible ? (
                  <EyeInvisibleOutline onClick={() => setVisible(true)} />
                ) : (
                  <EyeOutline onClick={() => setVisible(false)} />
                )}
              </div>
            }
          >
            <Input placeholder='请输入密码' clearable type={visible ? 'text' : 'password'} className='input-style' />
          </Form.Item>
        </div>
      </div>
    </Form>
    <div className='login-btn' onClick={loginHande}>
      <span>登录</span>
    </div>
    <div className='forget-password' onClick={forgetPasswordHandle}>忘记密码</div>
    {/* <div className='wechat-login-wrapper'>
      <span className='login-way-text'>其他方式登录</span>
      <img onClick={wechatLogin} className='wechat-login-icon' src='https://cdn.tuanzhzh.com/doubi-image/wecaht-login-icon.png' />
    </div> */}
  </div>
}
export default LoginForm