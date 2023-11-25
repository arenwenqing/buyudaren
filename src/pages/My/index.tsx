import React, { useCallback, useContext, useEffect, useState } from 'react'
import DateData, { FunctionData } from './constant'
import ModifyNick from '@pages/Component/ModifyNick'
import ZuanshiExcharge from '@pages/Component/ZuanshiExcharge'
import SortModal from '@pages/Component/SortModal'
import GameIllustrate from '@pages/Component/GameIllustrate'
import RechargeModal from '@pages/Component/RechargeModal'
import KefuModal from '@pages/Component/KefuModal'
import ExchargeCode from '@pages/Component/ExchargeCode'
import ShareModal from '@pages/Component/ShareModal'
import { Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import Apis from 'src/apis'
import {
  getUserInfo,
  setUserGoldAndDiamondInfo,
  Context
} from 'src/store'
import './index.less'

const My: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [signRecordIndex, setSignRecordIndex] = useState(0)
  const [showModify, setShowModify] = useState(false)
  const [exchargeShow, setExchargeShow] = useState(false)
  const [sortModalShow, setSortModalShow] = useState(false)
  const [gameIllistateShow, setGameIllistateShow] = useState(false)
  const [rechargeShow, setRechargeShow] = useState(false)
  const [kefuShow, setKefuShow] = useState(false)
  const [showExchargeCode, setShowExchargeCode] = useState(false)
  const [shareModalShow, setShareModalShow] = useState(false)
  // const [userInfoMessage, setUserInfoMessage] = useState<any>({
  //   diamondCount: 0,
  //   goldCoinCount: 0,
  //   user: {}
  // })
  // const [diamondNumber, setDiamondNumber] = useState(0)
  const [name, setName] = useState()
  const { state, dispatch } = useContext(Context)
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const {
    userInfoData
  } = state

  const navigate = useNavigate()

  const signHandle = useCallback((index) => {
    console.log(index)
    if (!userInfo.userId) {
      return Toast.show({
        content: '请登录'
      })
    }
    if (index > signRecordIndex + 1) {
      return Toast.show({
        content: '请连续签到'
      })
    }
    const today = new Date()
    // const year = today.getFullYear()
    const currentDay = today.getDate()
    // const month = today.getMonth() + 1
    const cacheDay = parseInt(window.localStorage.getItem('day') || '0')
    if (currentDay != cacheDay) {
      window.localStorage.setItem('day', String(currentDay))
      setIndex(index)
      signIn(index)
    } else {
      return Toast.show({
        content: '已经签到'
      })
    }
  }, [signRecordIndex])

  const modifyHandle = (name) => {
    setShowModify(true)
    setName(name)
  }

  const close = (newName) => {
    setShowModify(false)
    if (newName) {
      dispatch(getUserInfo())
    }
  }

  const rechargeHandle = () => {
    setRechargeShow(true)
  }

  const closeRechargeModal = () => {
    setRechargeShow(false)
  }

  const zuanshiExcharge = () => {
    setExchargeShow(true)
    // setDiamondNumber(num)
    // console.log(num)
  }

  const closeExcharge = () => {
    setExchargeShow(false)
  }

  const closeSortModal = () => {
    setSortModalShow(false)
  }

  const closeGameIllistateModal = () => {
    setGameIllistateShow(false)
  }

  const dealWithHandle = (item) => {
    switch (item.key) {
    case 1:
      if (!userInfo.userId) {
        return Toast.show({
          content: '请登录'
        })
      }
      setSortModalShow(true)
      break;
    case 2:
      setKefuShow(true)
      break
    case 3:
      setGameIllistateShow(true)
      break;
    case 4:
      setShowExchargeCode(true)
      break;
    case 5:
      if (!userInfo.userId) {
        return Toast.show({
          content: '请登录'
        })
      }
      setShareModalShow(true)
      break;
    default:
      break;
    }
  }

  const loginHandle = () => {
    if (!userInfo.userId) {
      navigate('/login')
    }
  }

  const logoutHandle = () => {
    window.localStorage.removeItem('user')
    dispatch(setUserGoldAndDiamondInfo({
      diamondCount: 0,
      goldCoinCount: 0,
      user: {}
    }))
  }

  // 签到
  const signIn = (index) => {
    Apis.signIn({
      userId: userInfo.userId,
      signInDayNum: index
    }).then(res => {
      if (res.data.signInResult) {
        console.log('成功')
      }
    })
  }

  // 签到列表
  const signInList = () => {
    Apis.signInList({
      userId: userInfo.userId
    }).then(res => {
      setSignRecordIndex(res.data)
    })
  }

  const goHome = () => {
    window.location.href = window.location.origin + '/game.html'
    // navigate('/game.html?time=' + Math.random())
  }

  useEffect(() => {
    dispatch(getUserInfo())
    signInList()
  }, [])

  return <div className='my-wrapper'>
    <div className='my-top-wrapper'>
      <div className='my-top-gold' onClick={rechargeHandle}>
        <span className='gold-num'>{ userInfo.userId ? userInfoData.goldCoinCount : 0}</span>
        <span className='gold-add'></span>
      </div>
      <div className='my-top-zuanshi' onClick={zuanshiExcharge}>
        <span className='zuanshi-num'>{userInfo.userId ? userInfoData.diamondCount : 0}</span>
        <span className='zuanshi-add'></span>
      </div>
    </div>
    <div className='user-message-wrapper'>
      <div className='user-message'>
        <div className='user-header'></div>
        <div className='user-name-wrapper'>
          <span className='user-name-top'>
            <label onClick={loginHandle}>{userInfo.userId ? userInfoData.user.nickName : '未登录'}</label>
            <label className={userInfo.userId ? '' : 'hide'} onClick={modifyHandle.bind(null, userInfoData.user.nickName)}></label>
          </span>
          <span className={ userInfo.userId ? 'user-name-option' : 'user-name-option hide'} onClick={logoutHandle}>
            <label>退出</label>
            <label></label>
          </span>
        </div>
      </div>
      <div className='user-buyu-btn' onClick={goHome}>
        <label>捕鱼去</label>
      </div>
    </div>
    <div className='my-function-wrapper'>
      {
        FunctionData.map((item, i) => {
          return <div key={i} className='function-item' onClick={dealWithHandle.bind(null, item)}>
            <img src={item.icon} className='function-item-icon' />
            <span className='function-item-name'>{item.name}</span>
          </div>
        })
      }
    </div>
    <div className='sign-in-wrapper'>
      {
        DateData.map((item, i) => {
          return <div key={i} className='sign-item'>
            <img src={item.icon} className='sign-item-img' onClick={signHandle.bind(null, item.key)} />
            <img src={item.signIcon} className={ (i + 1 === index || signRecordIndex >= i + 1) ? 'sign-icon-mark' : 'hide'} />
            <span className='sign-item-number'>x{item.number}</span>
            <span className='sign-item-days'>第{item.key}天</span>
          </div>
        })
      }
    </div>
    {
      showModify && <ModifyNick name={name} close={close} />
    }
    {
      exchargeShow && <ZuanshiExcharge close={closeExcharge} />
    }
    {
      sortModalShow && <SortModal close={closeSortModal} visible={sortModalShow} />
    }
    {
      gameIllistateShow && <GameIllustrate close={closeGameIllistateModal} />
    }
    {
      rechargeShow && <RechargeModal close={closeRechargeModal} />
    }
    {
      kefuShow && <KefuModal close={() => setKefuShow(false)} />
    }
    {
      showExchargeCode && <ExchargeCode close={() => setShowExchargeCode(false)} />
    }
    {
      shareModalShow && <ShareModal close={() => setShareModalShow(false)} />
    }
  </div>
}
export default My