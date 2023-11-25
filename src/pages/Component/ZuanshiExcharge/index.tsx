import React, { memo, useContext, useEffect, useState } from 'react'
import ExchargeModal from '../ExchargeModal'
import ExchargeGoldModal from '../ExchargeGoldModal'
import ExchargeHistory from '../ExchargeHistory'
import Apis from 'src/apis'
import {
  Context
} from 'src/store'
import './index.less'

const ZuanshiExcharge = (props) => {
  const [doubiExchargeShow, setDoubiExchargeShow] = useState(false)
  const [goldExchargeShow, setGoldExchargeShow] = useState(false)
  const [listdata, setListData] = useState([])
  const [consumeObj, setConsumeObj] = useState({})
  const [exchargeHistory, setExchargeHistory] = useState(false)
  // const [exchargeMaxGold, setExchargeMaxGold] = useState(0)
  // const [exchargeMaxDoubi, setExchargeMaxDoubi] = useState(0)
  const { state } = useContext(Context)
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const {
    userInfoData
  } = state
  // const listdata = [{
  //   type: 1,
  //   num: 150,
  //   exchargeNum: 12
  // }, {
  //   type: 2,
  //   num: 100,
  //   exchargeNum: 2
  // }]

  const exchargeHandle = (data, index) => {
    index !== 0 ? setDoubiExchargeShow(true) : setGoldExchargeShow(true)
    setConsumeObj(data || {})
  }

  const closeExchargeHandle = () => {
    setDoubiExchargeShow(false)
  }

  const goldExchargeHandle = () => {
    setGoldExchargeShow(false)
  }

  // 获取兑换列表
  const getExchargeList = () => {
    Apis.couponsList({
      userId: userInfo.userId
    }).then(res => {
      setListData(res.data || [])
    }, err => {
      console.error(err)
    })
  }

  // 兑换历史
  const chargeHistory = () => {
    setExchargeHistory(true)
  }

  // 关闭
  const closeRecordHandle = () => {
    setExchargeHistory(false)
  }

  useEffect(() => {
    getExchargeList()
  }, [])

  return <>
    <div className='zuanshi-excharge-wrapper'>
      <div className='zuanshi-excharge-content'>
        <span className='zuanshi-close-icon' onClick={props.close}></span>
        <span className='zuanshi-history-icon' onClick={chargeHistory}></span>
        <div className='zuanshi-num'>
          <span className='zuanshi-icon'></span>
          <span>{userInfoData.diamondCount || 0}</span>
        </div>
        <div className='excharge-list-wrapper'>
          {
            listdata.map((item, i) => {
              return <div key={i} className={ item.type === 1 ? 'list-item list-item-jinbi' : 'list-item-doubi list-item'}>
                <div className='list-content'>
                  <img src={item.couponPicUrl} className='card-icon' />
                  <div className='list-content-left'>
                    <span className='excharge-exptions-word'>{item.couponName}</span>
                    <span className='excharge-xiaohao'>
                      <label></label>
                      <label>消耗：{item.diamondCount}</label>
                    </span>
                  </div>
                  <div className='list-content-right'>
                    <span className='content-right-btn' onClick={exchargeHandle.bind(null, item, i)}>
                      <label>兑换</label>
                    </span>
                    <span className='excharge-number'>*已兑换{item.exchangedCount}次</span>
                  </div>
                </div>
                {/* <span className='excharge-jin-dou'>X{item.num}</span> */}
              </div>
            })
          }
        </div>
      </div>
    </div>
    {
      doubiExchargeShow && <ExchargeModal close={closeExchargeHandle} consumeObj={consumeObj} getExchargeList={getExchargeList} />
    }
    {
      goldExchargeShow && <ExchargeGoldModal close={goldExchargeHandle} consumeObj={consumeObj} getExchargeList={getExchargeList} />
    }
    {
      exchargeHistory && <ExchargeHistory close={closeRecordHandle} />
    }
  </>
}
export default memo(ZuanshiExcharge)
