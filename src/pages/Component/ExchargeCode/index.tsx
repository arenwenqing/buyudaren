import React, { useState } from 'react'
import { Input, Toast } from 'antd-mobile'
import Apis from 'src/apis'
import './index.less'

const ExchargeCode = (props) => {
  const [value, setValue] = useState()
  const [tip, setTip] = useState(false)
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')

  const sureHandle = () => {
    Apis.modifyName({
      userId: userInfo.userId,
      oldNickname: props.name,
      newNickname: value
    }).then(res => {
      console.log(res.data)
      Toast.show({
        content: '兑换成功'
      })
      props.close(value)
    })
  }

  const inputChange = (value) => {
    setValue(value)
  }

  return <div className='modify-nick-wrapper'>
    <div className='modify-content'>
      <span className='close-icon' onClick={props.close}></span>
      <div className='modify-new-input'>
        <span className='new-nick-title'>兑换码：</span>
        <Input className='input-style' defaultValue={props.name} placeholder='请输入兑换码' clearable onChange={inputChange} />
      </div>
      <div className='modify-btn' onClick={sureHandle}>
        <label>确定</label>
      </div>
    </div>
  </div>
}
export default ExchargeCode
