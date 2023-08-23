import React, { useContext } from 'react'
import { Modal, Space } from 'antd-mobile'
import { Context, setRenewModalData } from '../../../../store'
import './index.less'

const levelMap = {
  1: '一级推广',
  2: '二级推广'
}
const RenewModal = () => {
  const { state, dispatch } = useContext(Context)
  const close = () => {
    dispatch(setRenewModalData({
      visible: false
    }))
  }
  return <Modal
    title='续期'
    visible={state.renewModalData.visible}
    showCloseButton={true}
    onClose={close}
    bodyClassName='renew-modal-wrapper'
    content={<div className='renew-content-wrapper'>
      <Space direction='vertical' block>
        {/* <span>
          <label>您将续期至：</label>
          <label className='item-value'>2025/01/28</label>
        </span> */}
        <span>
          <label>您的级别为：</label>
          <label className='item-value'>{levelMap[state.renewModalData.level]}</label>
        </span>
        {/* <span>
          <label>续期费用：</label>
          <label>10000.00元</label>
        </span> */}
        <span>请扫描客服微信进行续期</span>
        <img src='https://cdn.tuanzhzh.com/doubi-image/Wechat-k.jpeg' />
      </Space>
    </div>}
  />
}

export default RenewModal
