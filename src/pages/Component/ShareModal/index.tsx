import React from 'react'

import './index.less'

const ShareModal = (props) => {
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  return <div className='share-wrapper'>
    <div className='share-content'>
      <span className='close-icon' onClick={props.close}></span>
      <span className='share-num'>1000</span>
      <img className='share-ercode' src={userInfo.shareQrCodeUrl} />
      <div className='share-btn'></div>
      <div className='share-get-btn'>领取</div>
    </div>
  </div>
}
export default ShareModal
