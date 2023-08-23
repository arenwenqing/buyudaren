import React, { useState } from 'react'
import { Form, Input, Picker, Space, Toast, Modal } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import Apis from 'src/apis'
import './index.less'

const ExtensionLogin:React.FC = () => {
  const [aliPayCode, setAliPayCode] = useState(false)
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState<(string  | null)[]>(['2'])
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const userInfo = JSON.parse(window.localStorage.getItem('system-user') || '{}')

  const loginHandle = async () => {
    const obj = await form.validateFields()
    Apis.proxyUserRegister({
      ...obj,
      subProxyUserType: Number(value[0])
    }).then(res => {
      if (res.data.registerSuccess) {
        Toast.show({
          icon: 'success',
          content: '成功'
        })
        setAliPayCode(true)
        return
      }
      Toast.show({
        icon: 'fail',
        content: res.data.registerFailedMsg
      })
    }).catch((err) => {
      Toast.show({
        icon: 'fail',
        content: err
      })
    })
    // navigate({
    //   pathname: '/extension-home'
    // })
  }

  const resetHandle = () => {
    form.resetFields()
  }

  const loginRecruitHandle = () => {
    navigate({
      pathname: '/extension-login',
      search: window.location.search
    })
  }

  const closeHandle = () => {
    setAliPayCode(false)
  }

  return <div className='login-form-wrapper'>
    <div className='extension-login-title'>招募新推广员</div>
    <Form layout='horizontal' form={form}>
      <div className='login-item'>
        <span className='login-item-title'>指导人手机号</span>
        <div className='login-item-component'>
          <Form.Item noStyle name='parentProxyUserPhoneNum' initialValue={userInfo.phoneNum}>
            <Input placeholder='请输入11位手机号' disabled clearable className='input-style' />
          </Form.Item>
        </div>
      </div>
      <div className='login-item'>
        <span className='login-item-title'>新推广员手机号</span>
        <div className='login-item-component'>
          <Form.Item noStyle name='subProxyUserPhoneNum'>
            <Input placeholder='请输入11位手机号' clearable className='input-style' />
          </Form.Item>
        </div>
      </div>
      <div className='login-item' onClick={() => setVisible(true)}>
        <span className='login-item-title'>新推广员级别</span>
        <div className='login-item-component login-item-level'>
          <Form.Item noStyle name='subProxyUserType'>
            <Picker
              columns={[
                [{
                  label: '一级推广员',
                  value: '1'
                }, {
                  label: '二级推广员',
                  value: '2'
                }]
              ]}
              visible={visible}
              onClose={() => {
                setVisible(false)
              }}
              value={value || ['请选择']}
              onConfirm={v => {
                setValue(v)
              }}
              popupClassName='level-popup-wrapper'
            >
              {(items) => {
                return (
                  <Space align='center'>
                    {items.every(item => item === null)
                      ? '未选择'
                      : items.map(item => item?.label ?? '未选择').join(' - ')}
                  </Space>
                )
              }}
            </Picker>
          </Form.Item>
        </div>
      </div>
      <div className='login-item'>
        <span className='login-item-title'>新推广员支付宝</span>
        <div className='login-item-component'>
          <Form.Item noStyle name='subProxyUserAlipayId'>
            <Input placeholder='请输入支付宝账号' clearable className='input-style' />
          </Form.Item>
        </div>
      </div>
      <div className='login-system-text' onClick={loginRecruitHandle}>登录推广系统</div>
      {/* <div className='login-item'>
        <span className='login-item-title'>密码</span>
        <div className='login-item-component'>
          <Form.Item
            name='passwd'
          >
            <Input placeholder='请输入密码' clearable type={'password'} className='input-style' />
          </Form.Item>
        </div>
      </div> */}
      <div className='login-item login-item-btn-wrapper'>
        <span className='btn-style' onClick={resetHandle}>重置</span>
        <span className='btn-style' onClick={loginHandle}>确定</span>
      </div>
    </Form>
    <Modal
      title=''
      visible={aliPayCode}
      showCloseButton={true}
      onClose={closeHandle}
      bodyClassName='recruit-modal-wrapper'
      content={<div className='recruit-content-wrapper'>
        <Space direction='vertical' block>
          <span className='alipay-title'>请用支付宝扫码支付</span>
          <img src='https://cdn.tuanzhzh.com/doubi-image/alipay.jpeg' />
        </Space>
      </div>}
    />
  </div>
}
export default ExtensionLogin