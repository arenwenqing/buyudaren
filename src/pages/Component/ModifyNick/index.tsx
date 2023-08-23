import React, { useState } from 'react'
import { Input, Toast } from 'antd-mobile'
import Apis from 'src/apis'
import './index.less'

const ModifyNick = (props) => {
  const [value, setValue] = useState()
  const [tip, setTip] = useState(false)
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')

  const sureHandle = () => {
    const regex = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
    if (regex.test(value)) {
      setTip(false)
      Apis.modifyName({
        userId: userInfo.userId,
        oldNickname: props.name,
        newNickname: value
      }).then(res => {
        console.log(res.data)
        Toast.show({
          content: '修改成功'
        })
        props.close(value)
      })
    } else {
      setTip(true)
    }
  }

  const inputChange = (value) => {
    setValue(value)
  }

  return <div className='modify-nick-wrapper'>
    <div className='modify-content'>
      <span className='close-icon' onClick={props.close}></span>
      <div className='modify-new-input'>
        <span className='new-nick-title'>新昵称：</span>
        <Input className='input-style' defaultValue={props.name} placeholder='请输入内容' clearable onChange={inputChange} />
      </div>
      {
        tip && <div className='input-tip'>请输入1～7位的中文、英文、数字</div>
      }
      <div className='modify-btn' onClick={sureHandle}>
        <label>确定</label>
      </div>
    </div>
  </div>
}
export default ModifyNick
