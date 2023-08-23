import React, { useEffect, useState } from 'react'
import Apis from 'src/apis'
import { Toast } from 'antd-mobile'
import './index.less'

const SortModal = (props) => {
  const [currentActive, setCurrentActive] = useState(1)
  const [rankingData, setRankingData] = useState<any>({})
  const [threeData, setThreeData] = useState<any>([])
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const sortList = [{
    user: {
      nickName: '似水流年'
    },
    stuffCount: 1223123
  }, {
    user: {
      nickName: '小磁环'
    },
    stuffCount: 23123
  }, {
    user: {
      nickName: '186***188'
    },
    stuffCount: 23123
  }, {
    user: {
      nickName: '186***188'
    },
    stuffCount: 23123
  }, {
    user: {
      nickName: '186***188'
    },
    stuffCount: 23123
  }, {
    user: {
      nickName: '186***188'
    },
    stuffCount: 23123
  }, {
    user: {
      nickName: '186***188'
    },
    stuffCount: 23123
  }, {
    user: {
      nickName: '186***188'
    },
    stuffCount: 23123
  }, {
    user: {
      nickName: '186***188'
    },
    stuffCount: 23123
  }, {
    user: {
      nickName: '186***188'
    },
    stuffCount: 23123
  }]
  const sortData = [{
    type: 'gold',
    name: '金币榜',
    key: 0
  }, {
    type: 'zuanshi',
    name: '钻石榜',
    key: 1
  }, {
    type: 'busha',
    name: '捕鲨榜',
    key: 2
  }]

  const btnHandle = (index) => {
    setCurrentActive(index)
    rankingList(String(index))
  }

  const rankingList = (index) => {
    Toast.show({
      icon: 'loading',
      content: '加载中…',
      duration: 0
    })
    Apis.rankingList({
      userId: userInfo.userId,
      userRankingTypeCode: index
    }).then(res => {
      const data = res.data || {}
      if (data.userRankingList && data.userRankingList.length >= 3) {
        const tempThree = data.userRankingList.slice(0, 3)
        setThreeData({
          first: {
            nickName: tempThree[0].user.nickName,
            stuffCount: tempThree[0].stuffCount
          },
          two: {
            nickName: tempThree[1].user.nickName,
            stuffCount: tempThree[1].stuffCount
          },
          three: {
            nickName: tempThree[2].user.nickName,
            stuffCount: tempThree[2].stuffCount
          }
        })
      }
      setRankingData({
        userRankingList: data.userRankingList || [],
        onRankingThreshold: data.onRankingThreshold
      })
    }).finally(() => {
      const tempThree = sortList.slice(0, 3)
      setThreeData({
        first: {
          nickName: tempThree[0].user.nickName,
          stuffCount: tempThree[0].stuffCount
        },
        two: {
          nickName: tempThree[1].user.nickName,
          stuffCount: tempThree[1].stuffCount
        },
        three: {
          nickName: tempThree[2].user.nickName,
          stuffCount: tempThree[2].stuffCount
        }
      })
      setRankingData({
        userRankingList: sortList,
        onRankingThreshold: true
      })
      Toast.clear()
    })
  }

  useEffect(() => {
    if (props.visible) {
      rankingList('1')
    }
  }, [props.visible])

  return <div className='sort-modal-wrapper'>
    <div className='sort-modal-content'>
      <span className='sort-close-icon' onClick={props.close}></span>
      <div className='sort-btn-wrapper'>
        {
          sortData.map((item, i) => {
            return <div
              key={i}
              className={ currentActive === i + 1 ? 'btn-item active' : 'btn-item no-active'}
              onClick={btnHandle.bind(null, i + 1)}
            >
              <span>{item.name}</span>
            </div>
          })
        }
      </div>
      <div className='fist-style'>
        <span className='sort-icon'></span>
        <span className='sort-name'>{threeData.first?.nickName}</span>
        <span className='sort-num'>{threeData.first?.stuffCount}</span>
      </div>
      <div className='first-two-three'>
        <div className='two-style'>
          <span className='sort-icon'></span>
          <span className='sort-name'>{threeData.two?.nickName}</span>
          <span className='sort-num'>{threeData.two?.stuffCount}</span>
        </div>
        <div className='three-style'>
          <span className='sort-icon'></span>
          <span className='sort-name'>{threeData.three?.nickName}</span>
          <span className='sort-num'>{threeData.three?.stuffCount}</span>
        </div>
      </div>
      <div className='sort-list-wrapper'>
        <div className='sort-list-content'>
          {
            rankingData.userRankingList?.map((item, i) => {
              return <div key={i} className='sort-list-item'>
                <span className='list-name'>
                  <label>{i + 1}</label>
                  <label>{item.user.nickName}</label>
                </span>
                <span className='list-num'>{item.stuffCount}</span>
              </div>
            })
          }
        </div>
        {
          rankingData.onRankingThreshold ? <div className='sort-list-no'>
            <span>
              <label>999+</label>
              <label className='current-user'>我</label>
            </span>
            <span>未上榜</span>
          </div> : undefined
        }
      </div>
    </div>
  </div>
}
export default SortModal
