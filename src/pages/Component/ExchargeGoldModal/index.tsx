import React, { useContext, useEffect, useState } from 'react'
import { Input, Toast } from 'antd-mobile'
import Apis from 'src/apis'
import {
  getUserInfo,
  Context
} from 'src/store'
import './index.less'

const ExchargeGoldModal = (props) => {
  const [goldNum, setGoldNum] = useState<any>()
  const [consumeDiamondNum, setConsumeDiamondNum] = useState<any>(0)
  const { state, dispatch } = useContext(Context)
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const {
    userInfoData
  } = state

  const diamondChange = (val) => {
    const formattedValue = val.replace(/^0+/, '')
    const value = formattedValue * 1
    const count = Math.trunc(value / 10)
    setGoldNum(count)
    setConsumeDiamondNum(val)
  }

  const exchargeGoldHandle = () => {
    Apis.exchargeGold({
      userId: userInfo.userId,
      diamondCount: consumeDiamondNum * 1
    }).then(res => {
      if (res.data.result) {
        Toast.show({
          icon: 'success',
          content: '兑换成功'
        })
        dispatch(getUserInfo())
        props.close()
      } else {
        Toast.show({
          icon: 'fail',
          content: res.data.failedMsg
        })
      }
    })
  }

  useEffect(() => {
    const maxGold = Math.trunc(consumeDiamondNum * 1 / 10)
    setGoldNum(maxGold)
  }, [consumeDiamondNum])

  useEffect(() => {
    setConsumeDiamondNum(userInfoData.diamondCount)
  }, [userInfoData.diamondCount])

  return <div className='excharge-modal-wrapper2'>
    <div className='excharge-modal-content'>
      <span className='excharge-close-icon' onClick={props.close}></span>
      <div className='excharge-content'>
        <div className='excharge-content-left'></div>
        <div className='excharge-content-right'>
          <div className='excharge-content-item'>
            <span className='item-title xiaohao-icon'>消耗：</span>
            <Input
              placeholder='请输入'
              type='number'
              max={userInfoData.diamondCount}
              value={consumeDiamondNum}
              onChange={diamondChange}
              className='item-input zuanshi-input'
            />
          </div>
          <div className='excharge-content-item doubi-item'>
            <span className='item-title'>金币：</span>
            <Input
              placeholder='自动换算'
              type='number'
              disabled
              value={goldNum}
              className='item-input doubi-input'
            />
          </div>
        </div>
      </div>
      <div className='excharge-sure-btn-wrapper' onClick={exchargeGoldHandle}>
        <span>确认兑换</span>
      </div>
    </div>
  </div>
}
export default ExchargeGoldModal
