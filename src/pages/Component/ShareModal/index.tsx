import React from 'react'
import html2canvas from 'html2canvas'
import './index.less'

const ShareModal = (props) => {
  // const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const saveImage = () => {
    const element = document.getElementById('share-content');
    html2canvas(element).then((canvas) => {
      // 将 canvas 转换为图片
      const image = canvas.toDataURL('image/png');
      // 处理图片，例如下载或显示在页面上
      const link = document.createElement('a')
      // 设置链接的属性
      link.href = image;
      link.download = 'image.png'; // 设置下载文件的名称

      // 创建一个点击事件
      const clickEvent = new MouseEvent('click');

      // 模拟点击链接来触发下载
      link.dispatchEvent(clickEvent);
    });
  }
  return <div className='share-wrapper'>
    <div className='share-content' id='share-content'>
      <span className='close-icon' onClick={props.close}></span>
      <span className='share-num'>1000</span>
      <span className='share-ercode' />
      <div className='share-btn' onClick={saveImage}></div>
      <div className='share-get-btn'>领取</div>
    </div>
  </div>
}
export default ShareModal
