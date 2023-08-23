import React, { useContext } from 'react'
import { Modal, Space } from 'antd-mobile'
import { Context, setCustomServiceModal } from '../../../store'
import './index.less'

const CustomServiceModal = () => {
  const { state, dispatch } = useContext(Context)
  const close = () => {
    dispatch(setCustomServiceModal({
      visible: false
    }))
  }
  return <Modal
    title=''
    visible={state.customServiceModal.visible}
    showCloseButton={true}
    onClose={close}
    bodyClassName='custom-service-modal-wrapper'
    content={<div className='custom-service-content-wrapper'>
      <Space direction='vertical' block>
        <span>请扫描客服微信</span>
        <img src='https://cdn.tuanzhzh.com/doubi-image/Wechat-k.jpeg' />
      </Space>
    </div>}
  />
}

export default CustomServiceModal
