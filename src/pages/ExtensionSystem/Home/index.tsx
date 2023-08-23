import React, { useContext, useEffect, useState } from 'react'
import { Divider, Space, Ellipsis, Toast, Empty } from 'antd-mobile'
import { Context, setRenewModalData, setUpgradeModalData, setModifyPayData } from '../../../store'
import RenewModal from './RenewModal'
import UpgradeModal from './UpgradeModal'
import ModifyPay from './ModifyPay'
import Apis from 'src/apis'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import './index.less'

const levelMap = {
  1: '一级推广',
  2: '二级推广'
}
const ExtensionHome = () => {
  const [extensionData, setExtensionData] = useState<any>({})
  const { state, dispatch } = useContext(Context)
  const navigate = useNavigate()
  const userInfo = JSON.parse(window.localStorage.getItem('system-user') || '{}')
  // const copyToClipboard = (textToCopy: any) => {
  //   // navigator clipboard 需要https等安全上下文
  //   if (navigator.clipboard && window.isSecureContext) {
  //     // navigator clipboard 向剪贴板写文本
  //     Toast.show({
  //       icon: 'success',
  //       content: '复制成功'
  //     })
  //     return navigator.clipboard.writeText(textToCopy);
  //   } else {
  //     // 创建text area
  //     const textArea = document.createElement('textarea');
  //     textArea.value = textToCopy;
  //     // 使text area不在viewport，同时设置不可见
  //     textArea.style.position = 'absolute';
  //     textArea.style.opacity = '0';
  //     textArea.style.left = '999999px';
  //     textArea.style.top = '-999999px';
  //     document.body.appendChild(textArea);
  //     textArea.focus();
  //     textArea.select();
  //     return new Promise((resolve, reject) => {
  //       // 执行复制命令并移除文本框
  //       // eslint-disable-next-line prefer-promise-reject-errors
  //       document.execCommand('copy') ? resolve('') : reject();
  //       textArea.remove();
  //       Toast.show({
  //         icon: 'success',
  //         content: '复制成功'
  //       })
  //     });
  //   }
  // }

  const copyToClipboard = (url) => {
    copy(url)
    Toast.show({
      icon: 'success',
      content: '复制成功'
    })
  }

  const renewHandle = (level) => {
    dispatch(setRenewModalData({
      visible: true,
      level
    }))
  }

  const upgradeHandle = () => {
    dispatch(setUpgradeModalData({
      visible: true
    }))
  }

  const modifyPayHandle = (aliPayId) => {
    dispatch(setModifyPayData({
      visible: true,
      aliPayId
    }))
  }

  const getProxyUser = () => {
    Apis.getProxyUser({
      userId: userInfo.userId // '1588476545ab4a3b9f18833dba5dbb1f' userInfo.userId
    }).then(res => {
      Object.keys(res.data || {}).forEach(item => {
        if (['curDateProfit', 'nextMonthProfit', 'historyAllProfit'].includes(item)) {
          res.data[item] = Number(res.data[item] / 100).toFixed(2)
        }
      })
      setExtensionData(res.data || {})
    })
  }

  const recruitHandle = () => {
    navigate({
      pathname: '/extension-recruit',
      search: window.location.search
    })
  }

  const logout = () => {
    window.localStorage.removeItem('system-user')
    navigate({
      pathname: '/extension-login',
      search: window.location.search
    })
  }

  const showDetail = () => {
    navigate({
      pathname: '/extension-wild',
      search: window.location.search
    })
  }

  const extensionLogin = () => {
    navigate({
      pathname: '/extension-login',
      search: window.location.search
    })
  }

  useEffect(() => {
    getProxyUser()
  }, [])

  return <div className='extension-home-wrapper'>
    <div className='extension-home-title'>推广后台</div>
    <Empty style={{ display: userInfo.userId ? 'none' : '' }} description={<span className='extension-login-btn' onClick={extensionLogin}>点击登录</span>} />
    <div style={{ display: userInfo.userId ? '' : 'none' }}>
      <div className='extension-home-date'>
        <span>{moment(extensionData?.expDate).format('YYYY/MM/DD')} 到期</span>
        <span className='extension-home-date-btn' onClick={renewHandle.bind(this, extensionData.proxyUserType)}>续期</span>
      </div>
      <Divider />
      <div className='extension-home-profit-wrapper'>
        <Space direction='vertical'>
          <div className='extension-home-profit-item'>
            <span>当日收益</span>
            <span>{extensionData.curDateProfit}</span>
          </div>
          <div className='extension-home-profit-item'>
            <span>下月5日将结算</span>
            <span>{extensionData.nextMonthProfit}</span>
          </div>
          <div className='extension-home-profit-item'>
            <span>历史总收益</span>
            <span>{extensionData.historyAllProfit}</span>
            {
              extensionData.hasDetailSaleData ? <span onClick={showDetail}>推广明细</span> : ''
            }
          </div>
        </Space>
      </div>
      <Divider />
      <div className='extension-home-user-wrapper'>
        <Space direction='vertical'>
          <div className='extension-home-user-item'>
            <span>用户名称</span>
            <span>{extensionData.userPhoneNum}</span>
            <span onClick={logout}>退出</span>
          </div>
          <div className='extension-home-user-item'>
            <span>支付宝</span>
            <span>{state.modifyPayData.aliPayId || extensionData.aliPayId}</span>
            <span onClick={modifyPayHandle.bind(this, extensionData.aliPayId)}>修改</span>
          </div>
          <div className='extension-home-user-item'>
            <span>用户级别</span>
            <span>{levelMap[extensionData.proxyUserType]}</span>
            {
              extensionData.proxyUserType === 2 ? <span onClick={upgradeHandle}>升级</span> : ''
            }
          </div>
          <div className='extension-home-user-item'>
            <span>提成比例</span>
            <span>{extensionData.commissionRatio || 0}%</span>
          </div>
        </Space>
      </div>
      <Divider />
      <div className='extension-home-extension-user-wrapper'>
        <Space direction='vertical'>
          <span className='extension-home-extension-user-title'>推广员管理</span>
          <div className='extension-home-extension-user-info'>
            <span>已招募的推广员</span>
            <span>{extensionData.subProxyUserCount}人</span>
            <span onClick={recruitHandle}>招募新推广员</span>
          </div>
        </Space>
      </div>
      <div className='extension-home-extension-new-user-wrapper'>
        <div className='extension-home-new-user-info'>
          <span className='extension-home-extension-user-title'>推广新用户</span>
          <span>已推广的用户：{extensionData.subUserCount}人</span>
        </div>
        <div className='extension-url-link'>
          <Ellipsis direction='end' content={extensionData.subUserUrl} />
        </div>
        <span className='extension-url-copy' onClick={copyToClipboard.bind(this, extensionData.subUserUrl)}>复制</span>
      </div>
      <RenewModal />
      <UpgradeModal />
      <ModifyPay />
    </div>
  </div>
}
export default ExtensionHome