import React, { useCallback, useEffect, useState, useRef, useContext } from 'react'
// import TopRolling from '@pages/Component/TopRolling/index'
import { useNavigate } from 'react-router-dom'
import { NavBar, List, Toast, InfiniteScroll } from 'antd-mobile'
import Apis from 'src/apis'
import moment from 'moment'
import CustomServiceModal from '../Component/CustomServiceModal'
import { Context, setCustomServiceModal } from '../../store'
import GiftBroadcast from '@pages/Component/GiftBroadcast'
import './index.less'

const borderColorMap = {
  '#FD3636': 'red-border',
  '#FFAD5E': 'yellow-border',
  '#D651FF': 'purple-border',
  '#2FBFFF': 'blue-border',
  '#FFFFFF': 'none-border'
}
const History:React.FC = () => {
  const [data, setData] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const { dispatch } = useContext(Context)
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const navigate = useNavigate()

  const numRef = useRef(1)
  const isLoad = useRef(true)

  const back = useCallback(() => {
    navigate({
      pathname: '/home',
      search: window.location.search
    })
  }, [])
  const homeBack = () => {
    navigate({
      pathname: '/home',
      search: window.location.search
    })
  }

  const contactCustomService = () => {
    dispatch(setCustomServiceModal({
      visible: true
    }))
  }

  async function loadMore() {
    await getLotteryHistory()
  }

  // 获取历史记录
  const getLotteryHistory = () => {
    if (!isLoad.current) return
    isLoad.current = false
    Apis.getLotteryHistory({
      userId: userInfo.userId,
      page: numRef.current,
      pageSize: 10
    }).then(res => {
      // let arr =[]
      // res.data?.forEach((item, i) => {
      //   const tempArr = item.giftList?.filter(list => list.giftId === item.maxValueGiftId) || []
      //   res.data[i].giftList = tempArr
      // })
      setHasMore(res.data?.length > 0)
      if (res.data?.length) {
        numRef.current += 1
      }
      res.data?.forEach(item => {
        item.lotteryTime = moment(item.lotteryTime).format('YYYY-MM-DD HH:mm:ss')
        item.orderId = item.lotteryId.substr(0, 8)
      })
      setData(data.concat(res.data))
    }, () => {
      Toast.show({
        content: '获取历史记录出错'
      })
    }).finally(() =>{
      isLoad.current = true
    })
  }

  useEffect(() => {
    getLotteryHistory()
    numRef.current = 1
  }, [])

  return <div className='history-wrapper'>
    <NavBar
      onBack={back}
    >
      历史记录
    </NavBar>
    {/* <TopRolling height={48} speed={3} /> */}
    <GiftBroadcast />
    <div className='home-back' onClick={homeBack}>
      <img className='doubi-tiqu' src='https://cdn.tuanzhzh.com/doubi-image/home-icon.png' />
      <span className='doubi-tiqu-text'>返回首页</span>
    </div>
    <div className='home-back contact-customer' onClick={contactCustomService}>
      <img className='doubi-tiqu' src='https://cdn.tuanzhzh.com/doubi-image/kefu.png' />
      <span className='doubi-tiqu-text'>联系客服</span>
    </div>
    <div className='extract-list-wrapper'>
      <List>
        {
          data?.map((item, i) => {
            return <List.Item key={i}>
              <div className={`extract-list-item ${borderColorMap[item.gift?.giftColor]}`}>
                <div className='extract-list-content'>
                  <div className='list-item-top'>
                    <span>
                      <span className='list-item-user'>{item.orderId??'--'}</span>
                      {/* <span>海***</span> */}
                    </span>
                    <span className='list-item-prize-name' style={{ color: item.gift?.giftColor }}>{item.gift?.giftName || '--'}</span>
                  </div>
                  <div className='list-item-bottom'>
                    <span className='list-item-time'>{item.lotteryTime??'--'}</span>
                    <span className='list-item-bottom-right'>
                      <label>抖音价值</label>
                      <label className='list-item-douyin-number' style={{ color: item.gift?.giftColor }}>{item.gift?.dyMoneyAmount??0}</label>
                    </span>
                  </div>
                </div>
              </div>
            </List.Item>
          })
        }
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
    <CustomServiceModal />
  </div>
}
export default History