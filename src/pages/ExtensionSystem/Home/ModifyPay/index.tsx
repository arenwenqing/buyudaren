import React, { useContext, useState } from 'react'
import { Modal, Space, Input, Toast } from 'antd-mobile'
import { Context, setModifyPayData } from '../../../../store'
import Apis from 'src/apis'
import './index.less'

const ModifyPay = () => {
  const [value, setValue] = useState('')
  const { state, dispatch } = useContext(Context)

  const userInfo = JSON.parse(window.localStorage.getItem('system-user') || '{}')
  const close = () => {
    dispatch(setModifyPayData({
      visible: false
    }))
  }

  const modifySureHandle = () => {
    Apis.modifyAlipay({
      userId: userInfo.userId,
      newAlipayId: value
    }).then(res => {
      if (res.data.modifySuccess) {
        Toast.show({
          icon: 'success',
          content: '修改成功'
        })
        dispatch(setModifyPayData({
          visible: false,
          aliPayId: value
        }))
        return
      }
      Toast.show({
        icon: 'fail',
        content: res.data.modifyFailedMsg
      })
    }).catch(() => {
      Toast.show({
        icon: 'fail',
        content: '修改报错'
      })
    })
  }

  return <Modal
    title='支付宝账号修改'
    visible={state.modifyPayData.visible}
    showCloseButton={true}
    onClose={close}
    bodyClassName='modify-pay-modal-wrapper'
    content={<div className='modify-pay-content-wrapper'>
      <Space direction='vertical' block>
        <span>
          <label>您当前的结算支付宝为：</label>
          <label className='item-value'>{state.modifyPayData.aliPayId}</label>
        </span>
        <span>请输入新的结算支付宝：</span>
        <Input
          placeholder='请输入内容'
          value={value}
          className='pay-input'
          onChange={val => {
            setValue(val)
          }}
        />
        <div onClick={modifySureHandle} className='modify-btn'>确定</div>
      </Space>
    </div>}
  />
}

export default ModifyPay
