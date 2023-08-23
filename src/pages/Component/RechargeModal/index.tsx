import React, { useState } from 'react'
import { Popup, AutoCenter, Toast, Dialog } from 'antd-mobile'
import Apis from 'src/apis'
import { stringifyParams } from 'src/utils'
import './index.less'

const RechargeModal = (props) => {
  const [payVisible, setPayVisible] = useState(false)
  const [choiceGoldNum, setChoiceGoldNum] = useState(0)
  const [htmlText, setHtmlText] = useState('')
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const chargeList = [{
    img: 'https://cdn.tuanzhzh.com/buyudaren/shouchongthree.png',
    gold: 10,
    money: 1
  }, {
    img: 'https://cdn.tuanzhzh.com/buyudaren/shouchongtwo.png',
    gold: 300,
    money: 29
  }, {
    img: 'https://cdn.tuanzhzh.com/buyudaren/shouchongtwo.png',
    gold: 500,
    money: 49
  }, {
    img: 'https://cdn.tuanzhzh.com/buyudaren/shouchongtwo.png',
    gold: 1000,
    money: 98
  }, {
    img: 'https://cdn.tuanzhzh.com/buyudaren/shouchongtwo.png',
    gold: 4000,
    money: 398
  }, {
    img: 'https://cdn.tuanzhzh.com/buyudaren/shouchongtwo.png',
    gold: 7000,
    money: 698
  }]

  const rechargeHandle = (num) => {
    console.log(num)
    setPayVisible(true)
    setChoiceGoldNum(num)
  }

  // 微信支付
  const wechatPay = () => {
    Toast.show({
      icon: 'loading',
      content: '加载中…'
    })
    const str = stringifyParams({
      // keyType: rechargeKeyInfo.keyCountInfo.keyType,
      // keyCount: rechargeKeyInfo.keyCountInfo.keyCount,
      userId: userInfo.userId,
      from: 'h5'
    })
    setTimeout(() => {
      Dialog.confirm({
        content: '您是否已支付完成？',
        bodyStyle: {
          background: '#fff'
        }
      }).then(res => {
        if (res) {
          window.location.reload()
        } else {
          console.log('点击取消')
        }
      })
    }, 1500);
    // 判断是否是小程序环境
    if (window.__wxjs_environment === 'miniprogram') {
      window.wx.miniProgram.navigateTo({
        url: `/pages/index/index?${str}`
      })
    } else  {
      getWeixinUrl()
    }
  }

  const getWeixinUrl = () => {
    // const str = stringifyParams({
    //   keyType: rechargeKeyInfo.keyCountInfo.keyType,
    //   keyCount: rechargeKeyInfo.keyCountInfo.keyCount,
    //   userId: userInfo.userId,
    //   from: 'h5'
    // })
    // Apis.createMiniProgram({
    //   path: '/pages/index/index',
    //   'env_version': 'release',
    //   query: str
    // }).then(res => {
    //   if (!res.code) {
    //     closePay()
    //     closeModal()
    //     window.location.href = res.data
    //   } else {
    //     Toast.show({
    //       content: '支付异常，稍后重试'
    //     })
    //   }
    // }).catch(() => {
    //   Toast.show({
    //     content: '支付异常，稍后重试'
    //   })
    // }).finally(() => {
    //   Toast.clear()
    // })
  }

  // 微信支付
  // const wechatPay = () => {
  //   setPayVisible(false)
  //   Toast.show({
  //     icon: 'loading',
  //     content: '加载中…'
  //   })
  //   Apis.prepareWx({
  //     userId: userInfo.userId,
  //     goldCoinCount: choiceGoldNum * 1
  //   }).then(res => {
  //     console.log(res.data)
  //   })
  // }

  // 支付宝
  const aliPay = () => {
    // setHtmlText('')
    // console.log(document.forms[0].submit())
    setPayVisible(false)
    Toast.show({
      icon: 'loading',
      content: '加载中…'
    })
    Apis.prepareAliPay({
      userId: userInfo.userId,
      goldCoinCount: choiceGoldNum * 1
    }).then(res => {
      console.log(res.data)
      setHtmlText(res.data?.payForm)
      document.forms[0].submit();
    }, () => {
      Toast.show({
        content: '支付异常，稍后重试'
      })
    }).finally(() => {
      Toast.clear()
    })
  }

  return <div className='recharge-modal-wrapper'>
    <div className='recharge-content'>
      <span className='recharge-close-icon' onClick={props.close}></span>
      <div className='recharge-item-wrapper'>
        {
          chargeList.map((item, i) => {
            return <div className='recharge-item' key={i}>
              <div className='recharge-item-top'></div>
              <img className='recharge-icon' src={item.img} />
              <div className='recharge-item-gold'>
                <span>{item.gold}</span>
                <span>金币</span>
              </div>
              <div className='recharge-btn' onClick={rechargeHandle.bind(null, item.gold)}>￥{item.money}</div>
            </div>
          })
        }
      </div>
    </div>
    <Popup
      className='recharge-popup-wrapper'
      visible={payVisible}
      onMaskClick={() => {
        setPayVisible(false)
      }}
      showCloseButton
      onClose={() => {
        setPayVisible(false)
      }}
      bodyStyle={{
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        minHeight: '30vh'
      }}
    >
      <AutoCenter className='popup-title'>支付方式选择</AutoCenter>
      <div className='pay-list-wrapper'>
        <div className='pay-list' onClick={wechatPay}>
          <span className='wechat'></span>
          <span className='pay-word'>微信支付</span>
        </div>
        <div className='pay-list' onClick={aliPay}>
          <span className='zhifubao'></span>
          <span className='pay-word'>支付宝支付</span>
        </div>
      </div>
    </Popup>
    <div dangerouslySetInnerHTML={{ __html: htmlText }}></div>
  </div>
}
export default RechargeModal
