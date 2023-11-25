import React, { useEffect, useRef, useState } from 'react'
import Apis from 'src/apis'
import { Toast } from 'antd-mobile'
import './index.less'

const code = {
  1: 'doing',
  2: 'done',
  3: 'fail'
}
const ExchargeHistory = (props) => {
  const [data, setData] = useState([])
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10
  })
  const saveValueRef = useRef(true)
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  // 获取列表
  const getList = () => {
    Toast.show({
      icon: 'loading',
      content: '加载中…'
    })
    Apis.getRecordList({
      userId: userInfo.userId,
      page: param.page,
      pageSize: param.pageSize
    }).then(res => {
      saveValueRef.current = res.data.length === 10
      const allData = data.concat(res.data || [])
      setData(allData)
    }, () => {
      saveValueRef.current = true
    }).finally(() => {
      Toast.clear()
    })
  }
  // 滚动
  const scollHandle = () => {
    const dom = document.getElementById('content-id')
    // 判断是否滚动到底部
    if (dom.scrollHeight - dom.scrollTop <= dom.clientHeight + 1) {
      console.log('已经滚动到底部！');
      // 在这里执行你想要的操作
      if (saveValueRef.current) {
        saveValueRef.current = false
        setParam({
          page: param.page + 1,
          pageSize: 10
        })
      }
    }
  }

  useEffect(() => {
    getList()
  }, [param])
  useEffect(() => {
    const dom = document.getElementById('content-id')
    dom.addEventListener('scroll', scollHandle)
  }, [])
  return <div className="excharge-history">
    <div className='excharge-content-wrapper'>
      <span className='excharge-close-icon' onClick={props.close}></span>
      <div className='excharge-content'>
        <span className='excharge-qubiezhen'></span>
        <div className='content-wrapper' id='content-id'>
          {
            data.map((item, i) => {
              return <div className='excharge-record-item' key={i}>
                <div className='item-content-left'>
                  <div>{item.exchangeDay} 兑换{item.couponName}</div>
                  <div>到手机号{item.exchangePhoneNum}</div>
                </div>
                <div className={`item-content-right ${code[item.exchangeStatus.code]}`}></div>
              </div>
            })
          }
        </div>
      </div>
      <div className='excharge-close-wrapper'>
        <span className='close-btn' onClick={props.close}>
          <label>关闭</label>
        </span>
      </div>
    </div>
  </div>
}
export default ExchargeHistory