import React, { useContext, useState } from 'react'
import { Input, Toast } from 'antd-mobile'
import Apis from 'src/apis'
import {
  getUserInfo,
  Context
} from 'src/store'
import './index.less'

const cardNum:any = '1'
const ExchargeModal = (props) => {
  // const [doubiNum, setDoubiNum] = useState<any>(1)
  // const [consumeDiamondNum, setConsumeDiamondNum] = useState<any>(0)
  const [dyId, setDyId] = useState()
  const { state, dispatch } = useContext(Context)
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const {
    userInfoData
  } = state

  // const diamondChange = (val) => {
  //   // const formattedValue = val.replace(/^0+/, '')
  //   // const value = formattedValue * 1
  //   // const count = Math.trunc(value / 10)
  //   // setDoubiNum(count)
  //   setConsumeDiamondNum(val)
  // }

  const douyinHandle = (val) => {
    setDyId(val)
  }

  const exchargeDoubi = () => {
    // if (!dyId || !consumeDiamondNum) {
    //   return Toast.show({
    //     icon: 'fail',
    //     content: '相关内容不能为空'
    //   })
    // }
    const pattern = /^1[3-9]\d{9}$/
    if (!pattern.test(dyId)) {
      return Toast.show({
        icon: 'fail',
        content: '手机号不合法'
      })
    }
    Toast.show({
      icon: 'loading',
      content: '加载中…'
    })
    Apis.exchargeCard({
      userId: userInfo.userId,
      couponId: props.consumeObj.couponId,
      // diamondCount: props.consumeObj.diamondCount * 1,
      exchangeCount: 1,
      exchangePhoneNum: dyId
    }).then(res => {
      if (res.data.exchangeResult) {
        Toast.show({
          icon: 'success',
          content: '兑换成功'
        })
        dispatch(getUserInfo())
        props.getExchargeList && props.getExchargeList()
        props.close()
      } else {
        Toast.show({
          icon: 'fail',
          content: res.data.failedMsg
        })
      }
    }).finally(() => {
      Toast.clear()
    })
  }

  // useEffect(() => {
  //   const maxGold = Math.trunc(consumeDiamondNum * 1 / 10)
  //   setDoubiNum(maxGold)
  // }, [consumeDiamondNum])

  // useEffect(() => {
  //   setConsumeDiamondNum(userInfoData.diamondCount)
  // }, [userInfoData.diamondCount])

  return <div className='excharge-modal-wrapper'>
    <div className='excharge-modal-content'>
      <span className='excharge-close-icon' onClick={props.close}></span>
      <div className='title-wrapper'>
        <span className='title-name'>{props.consumeObj.couponName}</span>
      </div>
      <div className='excharge-content'>
        <div className='excharge-content-left'>
          <img src={props.consumeObj.couponPicUrl} />
        </div>
        <div className='excharge-content-right'>
          <div className='excharge-content-item'>
            <span className='item-title xiaohao-icon'>消耗：</span>
            <Input
              placeholder='请输入'
              max={userInfoData.diamondCount}
              value={props.consumeObj.diamondCount || 0}
              disabled
              // onChange={diamondChange}
              type='number'
              className='item-input zuanshi-input'
            />
          </div>
          <div className='excharge-content-item doubi-item'>
            <span className='item-title'>卡劵：</span>
            <Input
              placeholder='自动换算'
              type='number'
              value={cardNum}
              disabled
              className='item-input doubi-input'
            />
          </div>
        </div>
      </div>
      <div className='douyin-number-wrapper'>
        <span className='douyin-title'>手机号：</span>
        <Input placeholder='请输入手机号' className='douyin-input-style' clearable value={dyId} onChange={douyinHandle} />
      </div>
      <div className='excharge-explain-word'>
        <div className='excharce-space-wrapper'>
          <span>抖币将于1小时内到账</span>
          <span>请务必保证抖音号填写正确</span>
          <span>切勿短时多次小额钻石兑换</span>
          <span>如抖音号异常，消费钻石将原路退回</span>
        </div>
      </div>
      <div className='excharge-sure-btn-wrapper' onClick={exchargeDoubi}>
        <span>确认兑换</span>
      </div>
    </div>
  </div>
}
export default ExchargeModal
