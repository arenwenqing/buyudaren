import React from 'react'
import { Form, Input, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import Apis from 'src/apis'
import './index.less'

const Login = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const goBack = () => {
    navigate('/login')
  }

  const forgetHandle = () => {
    navigate('/forget')
  }

  const registHandle = () => {
    navigate('/register')
  }

  const loginHandle = async () => {
    const values = await form.validateFields()
    Apis.login(values).then(res => {
      console.log(res.data)
      if (res.data.loginResult) {
        window.localStorage.setItem('user', JSON.stringify(res.data.user || {}))
        // return navigate('/home')
        return window.location.href = window.location.origin + '/game.html?time=' + Math.random()
      }
      Toast.show({
        icon: 'fail',
        content: '登录错误'
      })
    })
  }

  return <div className='login-wrapper'>
    <span className='login-back' onClick={goBack}></span>
    <div className='login-user-header'></div>
    <div className='login-usr-welcome-content'>欢迎回来~</div>
    <div className='login-user-content'>
      <Form requiredMarkStyle='asterisk' className='content-wrapper' form={form}>
        <Form.Item name='phoneNum' rules={[{ required: true }]}>
          <Input placeholder='请输入手机号' className='input-style' />
        </Form.Item>
        <Form.Item name='passwd' rules={[{ required: true }]}>
          <Input placeholder='请输入密码' type='password' className='input-style' />
        </Form.Item>
        <div className='register-btn' onClick={loginHandle}>
          <span>进入游戏</span>
        </div>
        <div className='login-bottom-btn'>
          <span className='btn-one' onClick={forgetHandle}>忘记密码</span>
          <span onClick={registHandle}>注册</span>
        </div>
      </Form>
    </div>
  </div>
}
export default Login