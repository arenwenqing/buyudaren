import React, { useContext, useState, useEffect } from 'react'
import { Input, Toast } from 'antd-mobile'
import Apis from 'src/apis'
import {
  getUserInfo,
  Context
} from 'src/store'
import './index.less'

const ExchargeModal = (props) => {
  const [doubiNum, setDoubiNum] = useState<any>()
  const [consumeDiamondNum, setConsumeDiamondNum] = useState<any>()
  const [dyId, setDyId] = useState()
  const { state, dispatch } = useContext(Context)
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const {
    userInfoData
  } = state

  const diamondChange = (val) => {
    const formattedValue = val.replace(/^0+/, '')
    const value = formattedValue * 1
    const count = Math.trunc(value / 10)
    setDoubiNum(count)
    setConsumeDiamondNum(val)
  }

  const douyinHandle = (val) => {
    if (val && val.trim()) {
      setDyId(val)
    }
  }

  const exchargeDoubi = () => {
    if (!dyId || !consumeDiamondNum || !doubiNum) {
      return Toast.show({
        icon: 'fail',
        content: '相关内容不能为空'
      })
    }
    Apis.exchargeDoubi({
      userId: userInfo.userId,
      diamondCount: consumeDiamondNum * 1,
      dyId: dyId
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
    setDoubiNum(maxGold)
  }, [consumeDiamondNum])

  useEffect(() => {
    setConsumeDiamondNum(userInfoData.diamondCount)
  }, [userInfoData.diamondCount])

  return <div className='excharge-modal-wrapper'>
    <div className='excharge-modal-content'>
      <span className='excharge-close-icon' onClick={props.close}></span>
      <div className='excharge-content'>
        <div className='excharge-content-left'></div>
        <div className='excharge-content-right'>
          <div className='excharge-content-item'>
            <span className='item-title xiaohao-icon'>消耗：</span>
            <Input
              placeholder='请输入'
              max={userInfoData.diamondCount}
              value={consumeDiamondNum}
              onChange={diamondChange}
              type='number'
              className='item-input zuanshi-input'
            />
          </div>
          <div className='excharge-content-item doubi-item'>
            <span className='item-title'>抖币：</span>
            <Input
              placeholder='自动换算'
              type='number'
              value={doubiNum}
              disabled
              className='item-input doubi-input'
            />
          </div>
        </div>
      </div>
      <div className='douyin-number-wrapper'>
        <span className='douyin-title'>抖音号：</span>
        <Input placeholder='请输入抖音号' className='douyin-input-style' clearable value={dyId} onChange={douyinHandle} />
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
