import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import Apis from 'src/apis'
export const Context = React.createContext(null)
const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
export const initialState = {
  // loginCurrentKey: 'login',
  // userId: '',
  // renewModalData: {
  //   visible: false,
  //   level: 0
  // },
  // upgradeModalData: {
  //   visible: false
  // },
  // modifyPayData: {
  //   visible: false,
  //   aliPayId: ''
  // },
  // customServiceModal: {
  //   visible: false
  // }
  userInfoData: {
    diamondCount: 0,
    goldCoinCount: 0,
    user: {
      nickName: '',
      phoneNum: '',
      shareQrCodeUrl: '',
      userId: ''
    }
  }
}

export const reduxSlice = createSlice({
  name: 'reduxSlice',
  initialState,
  reducers: {
    // setLoginCurrentKey: (state, { payload }) => {
    //   state.loginCurrentKey = payload
    // },
    // setUserId: (state, { payload }) => {
    //   state.userId = payload
    // },
    // setRenewModalData: (state, { payload }) => {
    //   state.renewModalData = payload
    // },
    // setUpgradeModalData: (state, { payload }) => {
    //   state.upgradeModalData = payload
    // },
    // setModifyPayData: (state, { payload }) => {
    //   state.modifyPayData = payload
    // },
    // setCustomServiceModal: (state, { payload }) => {
    //   state.customServiceModal = payload
    // }
    setUserGoldAndDiamondInfo: (state, { payload }) => {
      state.userInfoData = payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  // setLoginCurrentKey,
  // setUserId,
  // setRenewModalData,
  // setUpgradeModalData,
  // setModifyPayData,
  // setCustomServiceModal
  setUserGoldAndDiamondInfo
} = reduxSlice.actions

// redux-thunk actions
export const getUserInfo = (_params?:any) => async (dispatch) => {
  console.log(_params)
  if (!userInfo.userId) {
    return
  }
  const res = await Apis.getUserInfo({
    userId: userInfo.userId
  })
  window.localStorage.setItem('diamondCount', res.data.userInfo?.diamondCount)
  window.localStorage.setItem('goldCoinCount', res.data.userInfo?.goldCoinCount)
  dispatch(setUserGoldAndDiamondInfo(res.data.userInfo || {}))
}

// 拉取是否开通接口
// export const getIsOpen =
//   (query = {}) =>
//   async (dispatch) => {
//     const res = await Apis.getIsOpen(query).catch((err) => {
//       console.log('getIsOpen err', err)
//     })
//     const isOpen = res?.data ?? false
//     dispatch(setIsOpen(isOpen))
//   }

// 数据配置：拉取数据配置列表
// export const getDataTableList = (params) => async (dispatch) => {
//   const res = await Apis.getDataTableList(params).catch((err) => {
//     console.log('getDataTableList err', err)
//     return []
//   })
//   return res?.data
// }

// Reducer
export default reduxSlice.reducer
