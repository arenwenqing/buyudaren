import React, { useCallback } from 'react'
import { Form, Input, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import Apis from 'src/apis'
import './index.less'

const ExtensionLogin:React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const loginHandle = useCallback( async () => {
    const obj = await form.validateFields()
    Apis.login(obj).then(res => {
      if (res.data.loginResult) {
        window.localStorage.setItem('system-user', JSON.stringify(res.data.user || {}))
        // dispatch(setUserId(res.data.user.userId))
        navigate({
          pathname: '/extension-home',
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

  const resetHandle = () => {
    form.resetFields()
  }

  return <div className='login-form-wrapper'>
    <div className='extension-login-title'>抖盒子推广系统</div>
    <Form layout='horizontal' form={form}>
      <div className='login-item'>
        <span className='login-item-title'>手机号</span>
        <div className='login-item-component'>
          <Form.Item noStyle name='phoneNum'>
            <Input placeholder='请输入11位手机号' clearable className='input-style' />
          </Form.Item>
        </div>
      </div>
      <div className='login-item'>
        <span className='login-item-title'>密码</span>
        <div className='login-item-component'>
          <Form.Item
            name='passwd'
          >
            <Input placeholder='请输入密码' clearable type={'password'} className='input-style' />
          </Form.Item>
        </div>
      </div>
      <div className='login-item login-item-btn-wrapper'>
        <span className='btn-style' onClick={resetHandle}>重置</span>
        <span className='btn-style' onClick={loginHandle}>登录</span>
      </div>
    </Form>
  </div>
}
export default ExtensionLogin