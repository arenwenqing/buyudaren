import React, { useEffect, useState, useRef } from 'react'
import { NavBar, Space, Popup, Form, Input, DatePicker, Toast, InfiniteScroll } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import Apis from 'src/apis'
import './index.less'

const BigProxy = () => {
  const [visible, setVisible] = useState(false)
  const [startFlag, setStartFlag] = useState(false)
  const [endFlag, setEndFlag] = useState(false)
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [dataList, setDataList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [saleData, setSaleData] = useState<any>({})
  // const [param, setParam] = useState({
  //   startTime: moment().subtract(7, 'day').startOf('day').valueOf(),
  //   endTime: moment().subtract(1, 'day').startOf('day').valueOf(),
  //   page: 1,
  //   pageSize: 30,
  //   proxyUserId: 'dd5821c9c0744a5383f43ee62a458acc' // userInfo.userId
  // })
  const userInfo = JSON.parse(window.localStorage.getItem('system-user') || '{}')
  const paramRef = useRef({
    startTime: moment().subtract(7, 'day').startOf('day').valueOf(),
    endTime: moment().subtract(1, 'day').startOf('day').valueOf(),
    page: 1,
    pageSize: 30,
    proxyUserId: userInfo.userId
  })
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const back = () => {
    navigate({
      pathname: '/extension-home',
      search: window.location.search
    })
  }
  const showFilter = () => {
    setVisible(true)
  }

  const searchHandle = async () => {
    const value = await form.validateFields()
    paramRef.current = {
      startTime: moment(value.startTime).valueOf(),
      endTime: moment(value.endTime).valueOf(),
      page: 1,
      pageSize: 30,
      proxyUserId: userInfo.userId
    }
    getList()
    setVisible(false)
  }

  const dataPickerClose = () => {
    setDatePickerVisible(false)
    if (startFlag) setStartFlag(false)
    if (endFlag) setEndFlag(false)
  }

  const dataPickerConfirm = (val) => {
    const time = moment(val).format('YYYY/MM/DD')
    if (startFlag) {
      form.setFieldValue('startTime', time)
    }
    if (endFlag) {
      form.setFieldValue('endTime', time)
    }
  }

  const getList = () => {
    return Apis.getSubList({
      ...paramRef.current
    }).then(res => {
      return res
    }).catch(() => {
      setHasMore(false)
      Toast.show({
        icon: 'fail',
        content: '明细出错'
      })
    })
  }
  async function loadMore() {
    const res = await getList()
    if (res.data.detailList.length) {
      paramRef.current = {
        ...paramRef.current,
        page: paramRef.current.page + 1
      }
    }
    setDataList(val => [...val, ...res.data.detailList])
    setHasMore(res.data.detailList.length > 0)
  }

  const getSaleData = () => {
    Apis.getSaleData({
      userId: userInfo.userId // 'dd5821c9c0744a5383f43ee62a458acc '
    }).then(res => {
      const tempMap = ['ytdWaterAmount', 'ytdProfit', 'curMonthWaterAmount', 'curMonthProfit', 'historyAllWaterAmount', 'historyAllProfit', 'toSettledProfit']
      Object.keys(res.data || {}).forEach(item => {
        if (tempMap.includes(item)) {
          res.data[item] = (res.data[item] / 100).toFixed(2)
        }
      })
      setSaleData(res.data || {})
    }).catch(() => {
      Toast.show({
        icon: 'fail',
        content: '流水出错'
      })
    })
  }

  useEffect(() => {
    getSaleData()
  }, [])

  return <div className='sociaty-small-proxy-wrapper'>
    <NavBar back='返回' onBack={back}>
      推广明细
    </NavBar>
    <Space className='sociaty-small-month'>
      <Space>
        <span>昨日流水</span>
        <span>{saleData.ytdWaterAmount || 0}</span>
      </Space>
      <Space>
        <span>昨日收益</span>
        <span>{saleData.ytdProfit || 0}</span>
      </Space>
    </Space>
    <Space className='sociaty-small-month'>
      <Space>
        <span>本月流水</span>
        <span>{saleData.curMonthWaterAmount || 0}</span>
      </Space>
      <Space>
        <span>本月收益</span>
        <span>{saleData.curMonthProfit || 0}</span>
      </Space>
    </Space>
    <Space className='sociaty-small-month'>
      <Space>
        <span>历史流水</span>
        <span>{saleData.historyAllWaterAmount || 0}</span>
      </Space>
      <Space>
        <span>历史收益</span>
        <span>{saleData.historyAllProfit || 0}</span>
      </Space>
    </Space>
    <Space className='sociaty-small-month'>
      <Space>
        <span>待结算收益</span>
        <span>{saleData.toSettledProfit || 0}</span>
      </Space>
      <Space>
        <span>结算周期</span>
        <span>每月{saleData.settleDayOfMonth || 0}号</span>
      </Space>
    </Space>
    <div className='sociaty-filter'>
      <span className='sociaty-filter-btn' onClick={showFilter}>筛选</span>
    </div>
    <div className='sociaty-fitler-condition-show'>
      <span>当前条件：</span>
      <span>2023/01/26~2023/02/26</span>
    </div>
    <div>
      {
        dataList.map((item, i) => {
          return <div key={i} className='sociaty-data-list'>
            <div className='list-item'>
              {
                i === 0 ? <span>推广人手机号</span> : ''
              }
              <span className='list-item-content'>{item.subUserPhoneNum}</span>
            </div>
            <div className='list-item'>
              {
                i === 0 ? <span>日期</span> : ''
              }
              <span className='list-item-content'>{item.detailDate}</span>
            </div>
            <div className='list-item'>
              {
                i === 0 ? <span>流水总额</span> : ''
              }
              <span className='list-item-content'>{(item.waterAmount / 100).toFixed(2)}</span>
            </div>
            <div className='list-item'>
              {
                i === 0 ? <span>收益总额</span> : ''
              }
              <span className='list-item-content'>{(item.profit / 100).toFixed(2)}</span>
            </div>
          </div>
        })
      }
    </div>
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    <Popup
      visible={visible}
      onMaskClick={() => {
        setVisible(false)
      }}
      className='sociaty-filter-popup-wrapper'
      closeOnMaskClick={false}
      bodyStyle={{
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        minHeight: '30vh',
        background: '#fff'
      }}
    >
      <div className='filter-conter-wrapper'>
        <div className='filter-content-top'>
          <span onClick={ () => setVisible(false) }>取消</span>
          <span onClick={searchHandle}>确定</span>
        </div>
        <Form layout='horizontal' form={form} requiredMarkStyle='none'>
          <Form.Item label='开始时间' name='startTime' rules={[{ required: true }]}>
            <Input placeholder='请输入' onFocus={() => {
              setDatePickerVisible(true)
              setStartFlag(true)
            }} />
          </Form.Item>
          <Form.Item label='结束时间' name='endTime' rules={[{ required: true }]}>
            <Input placeholder='请输入' onFocus={() => {
              setDatePickerVisible(true)
              setEndFlag(true)
            }} />
          </Form.Item>
        </Form>
      </div>
    </Popup>
    <DatePicker
      visible={datePickerVisible}
      onClose={ dataPickerClose }
      precision='day'
      onConfirm={ val => {
        dataPickerConfirm(val)
      }}
    />
  </div>
}
export default BigProxy