import React from 'react'

import './index.less'

const KefuModal = (props) => {
  return <div className='kefu-wrapper'>
    <div className='kefu-content'>
      <span className='close-icon' onClick={props.close}></span>
      <div className='kefu-erweima'></div>
      <div className='kefu-scan-wrapper'>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className='kefu-bottom-text'>关注微信公众号，获取更多玩法和优惠</div>
    </div>
  </div>
}
export default KefuModal
