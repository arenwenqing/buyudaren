import React, { useContext, useState } from 'react'
import ExchargeModal from '../ExchargeModal'
import ExchargeGoldModal from '../ExchargeGoldModal'
import {
  Context
} from 'src/store'
import './index.less'

const ZuanshiExcharge = (props) => {
  const [doubiExchargeShow, setDoubiExchargeShow] = useState(false)
  const [goldExchargeShow, setGoldExchargeShow] = useState(false)
  // const [exchargeMaxGold, setExchargeMaxGold] = useState(0)
  // const [exchargeMaxDoubi, setExchargeMaxDoubi] = useState(0)
  const { state, dispatch } = useContext(Context)

  const {
    userInfoData
  } = state
  const listdata = [{
    type: 1,
    num: 150,
    exchargeNum: 12
  }, {
    type: 2,
    num: 100,
    exchargeNum: 2
  }]

  const exchargeHandle = (data) => {
    data.type === 2 ? setDoubiExchargeShow(true) : setGoldExchargeShow(true)
  }

  const closeExchargeHandle = () => {
    setDoubiExchargeShow(false)
  }

  const goldExchargeHandle = () => {
    setGoldExchargeShow(false)
  }

  return <>
    <div className='zuanshi-excharge-wrapper'>
      <div className='zuanshi-excharge-content'>
        <span className='zuanshi-close-icon' onClick={props.close}></span>
        <span className='zuanshi-history-icon'></span>
        <div className='zuanshi-num'>
          <span className='zuanshi-icon'></span>
          <span>{userInfoData.diamondCount || 0}</span>
        </div>
        <div className='excharge-list-wrapper'>
          {
            listdata.map((item, i) => {
              return <div key={i} className={ item.type === 1 ? 'list-item list-item-jinbi' : 'list-item-doubi list-item'}>
                <div className='list-content'>
                  <div className='list-content-left'>
                    <span className='excharge-exptions-word'>兑换商品归属于绑定的号码账号</span>
                    <span className='excharge-xiaohao'>
                      <label></label>
                      <label>消耗：10</label>
                    </span>
                  </div>
                  <div className='list-content-right'>
                    <span className='content-right-btn' onClick={exchargeHandle.bind(null, item)}>
                      <label>兑换</label>
                    </span>
                    <span className='excharge-number'>*已兑换{item.exchargeNum}次</span>
                  </div>
                </div>
                <span className='excharge-jin-dou'>X{item.num}</span>
              </div>
            })
          }
        </div>
      </div>
    </div>
    {
      doubiExchargeShow && <ExchargeModal close={closeExchargeHandle} />
    }
    {
      goldExchargeShow && <ExchargeGoldModal close={goldExchargeHandle} />
    }
  </>
}
export default ZuanshiExcharge
