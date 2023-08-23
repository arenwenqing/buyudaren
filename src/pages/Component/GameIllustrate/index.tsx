import React from 'react'

import './index.less'

const GameIllustrate = (props) => {
  return <div className='game-illustrate-wrapper'>
    <div className='game-illustrate-content'>
      <span className='close-icon' onClick={props.close}></span>
      <ul className='content-text'>
        <li>当您成功捕获鱼，系统会赠送您对应的金币和钻石</li>
        <li>您获赠的金币可以继续捕鱼，获赠的钻石可以兑换抖币或其他赠品</li>
        <li>每成功邀请一位朋友，您和您的朋友均可获赠10金币</li>
        <li>为避免您的损失，关闭游戏时请先点击左上角的退出按钮再关闭网页</li>
      </ul>
    </div>
  </div>
}
export default GameIllustrate
