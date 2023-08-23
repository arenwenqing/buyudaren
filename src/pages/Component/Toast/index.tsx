import React from 'react'
import { PropsType } from './interface'
import './index.less'

const Toast:React.FC<PropsType> = (props) => {
  return <div className={ props.visible ? 'register-toast-tip' : 'hide'}>
    <span>{props.content}</span>
  </div>
}
export default Toast