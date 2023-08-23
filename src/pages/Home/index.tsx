import React, { useEffect } from 'react'
import './index.less'

const Home: React.FC = () => {
  // useEffect(() => {
  //   const scripts = [
  //     '../static/R.js',
  //     '../static/Utils.js',
  //     '../static/fishjoy.js',
  //     '../static/FishManager.js',
  //     '../static/FishGroup.js',
  //     '../static/views/Fish.js',
  //     '../static/views/Cannon.js',
  //     '../static/views/Bullet.js',
  //     '../static/views/Num.js',
  //     '../static/views/Player.js'
  //   ];
  //   let scriptElement
  //   scripts.forEach(item => {
  //     // 创建 <script> 元素
  //     scriptElement = document.createElement('script');

  //     // 设置 src 属性为你想要加载的脚本文件的 URL
  //     scriptElement.src = item;

  //     // 可选：设置 async 或 defer 属性，控制脚本的加载和执行方式
  //     scriptElement.async = false;

  //     // 添加到页面中，这里将其添加到 <head> 元素中
  //     document.head.appendChild(scriptElement);
  //   })
  //   return () => {
  //     document.head.removeChild(scriptElement);
  //   };
  // }, [])

  useEffect(() => {
    window.location.href = window.location.origin + '/game.html?time=' + Math.random()
  }, [])

  return <div id="outer">
    {/* <div id="middle">
      <div id="container" style={{ position:'relative', width: '980px', height: '100vh', top: '-0%', margin:'0 auto' }}></div>
      <div id="msg"></div>
    </div>
    <div id="fps" style={{ position:'absolute',top:'0',left:'0',color:'#fff', display: 'none' }}></div> */}
  </div>
}
export default Home