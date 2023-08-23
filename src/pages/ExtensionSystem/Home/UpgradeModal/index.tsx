import React, { useContext } from 'react'
import { Modal, Space } from 'antd-mobile'
import { Context, setUpgradeModalData } from '../../../../store'
import './index.less'

const UpgradeModal = () => {
  const { state, dispatch } = useContext(Context)
  const close = () => {
    dispatch(setUpgradeModalData({
      visible: false
    }))
  }
  return <Modal
    title='升级'
    visible={state.upgradeModalData.visible}
    showCloseButton={true}
    onClose={close}
    bodyClassName='renew-modal-wrapper'
    content={<div className='renew-content-wrapper'>
      <Space direction='vertical' block>
        <span>
          <label>您将升级至：</label>
          <label className='item-value'>一级推广</label>
        </span>
        {/* <span>
          <label>升级费用：</label>
          <label className='item-value'>5000.00元</label>
        </span> */}
        <span>请扫描客服微信进行升级</span>
        <img src='https://cdn.tuanzhzh.com/doubi-image/Wechat-k.jpeg' />
      </Space>
    </div>}
  />
}

export default UpgradeModal
