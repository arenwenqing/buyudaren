import React, { useState, useCallback } from 'react'
import { Form, Input, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import Apis from 'src/apis'
import './index.less'

let count = 60
const ForgetPassword = () => {
  const [verificaationText, setVerificaationText] = useState('获取验证码')
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const goBack = () => {
    navigate('/login')
  }

  const pkgNameRule = {
    pattern: /^1[3-9]\d{9}$/,
    message: '手机号不合法'
  }

  const passwordRule = {
    pattern: /^[a-zA-Z0-9]{8,16}$/,
    message: '8~16位数字、英文混合'
  }

  const getVerificationCode = useCallback(() => {
    if (count < 60) return
    form.validateFields(['phoneNum']).then(res => {
      console.log(res.data)
      let timerId = null
      verificationCode()
      setVerificaationText(`${count} s`)
      timerId = setTimeout(function run() {
        if (count < 1) {
          clearTimeout(timerId)
          setVerificaationText('获取验证码')
          count = 60
          return
        }
        count -= 1
        timerId = setTimeout(run, 1000)
        setVerificaationText(`${count} s`)
      }, 1000)
    }, err => {
      console.log(err)
    })
  }, [])

  const verificationCode = () => {
    Apis.getResetVerifyCode({
      phoneNum: form.getFieldsValue().phoneNum
    }).then(res => {
      console.log(res.data)
      if (!res.data.sendResult) {
        Toast.show({
          icon: 'fail',
          content: res.data.sendMsg
        })
      }
    }, err => {
      Toast.show({
        icon: 'fail',
        content: err.sendMsg
      })
    })
  }

  const sureHandle = async () => {
    const values = await form.validateFields()
    console.log(values)
    Apis.getBackPwd(values).then(res => {
      if (!res.data.resetResult) {
        return Toast.show({
          content: res.data.registerMsg
        })
      }
      Toast.show({
        icon: 'success',
        content: '修改成功'
      })
      navigate('/login')
    })
  }

  return <div className='register-wrapper'>
    <span className='register-back' onClick={goBack}></span>
    <div className='register-content'>
      <Form requiredMarkStyle='asterisk' className='content-wrapper' form={form}>
        <Form.Item name='phoneNum' label={<span className='content-item-title user-title'>手机号</span>} rules={[
          { required: true, message: '请输入11位手机号'},
          pkgNameRule
        ]}>
          <Input placeholder='请输入手机号' className='input-style' />
        </Form.Item>
        <Form.Item name='verifyCode'
          label={<span className='content-item-title yanzheng-title'>验证码</span>}
          rules={[{ required: true }]}
          className='get-yanzheng-item'
          extra={<span className='get-number-style' onClick={getVerificationCode}>{verificaationText}</span>}
        >
          <Input placeholder='请输入验证码' className='input-style' />
        </Form.Item>
        <Form.Item name='newPasswd' label={<span className='content-item-title password-title'>密码</span>} rules={[
          { required: true, message: '8~16位数字、英文混合'},
          passwordRule
        ]}>
          <Input placeholder='请输入密码' type='password' className='input-style' />
        </Form.Item>
        <Form.Item name='repasswd' label={<span className='content-item-title sure-title'>确认密码</span>} rules={[
          { required: true, message: '8~16位数字、英文混合'},
          passwordRule
        ]}>
          <Input placeholder='请输入密码' type='password' className='input-style' />
        </Form.Item>
        <div className='register-btn' onClick={sureHandle}>
          <span>保存修改</span>
        </div>
        <div className='register-login' onClick={() => navigate('/login')}>去登录</div>
      </Form>
    </div>
  </div>
}
export default ForgetPassword
