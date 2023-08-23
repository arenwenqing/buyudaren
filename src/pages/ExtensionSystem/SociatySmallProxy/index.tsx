import React, { useEffect, useState } from 'react'
import { NavBar, Space, Popup, Form, Input, DatePicker, Toast, InfiniteScroll } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import Apis from 'src/apis'
import './index.less'

const SociatySmallProxy = () => {
  const [visible, setVisible] = useState(false)
  const [startFlag, setStartFlag] = useState(false)
  const [endFlag, setEndFlag] = useState(false)
  const [param, setParam] = useState({
    startTime: moment().subtract(7, 'day').startOf('day').valueOf(),
    endTime: moment().subtract(1, 'day').startOf('day').valueOf(),
    page: 1,
    pageSize: 30
  })
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [dataList, setDataList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [saleData, setSaleData] = useState<any>({})
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const userInfo = JSON.parse(window.localStorage.getItem('system-user') || '{}')
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
    setParam({
      startTime: moment(value.startTime).valueOf(),
      endTime: moment(value.endTime).valueOf(),
      page: 1,
      pageSize: 50
    })
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
    Apis.getSubList({
      ...param
    }).then(res => {
      setDataList(res.data?.detailList || [])
      if (res.data?.dataList?.length < 30) {
        setHasMore(false)
      }
    }).catch(() => {
      setHasMore(false)
      Toast.show({
        icon: 'fail',
        content: '明细出错'
      })
    })
  }
  async function loadMore() {
    // const append = await mockRequest()
    const arr = []
    for(let i = 0; i < 30; i++) {
      arr.push({
        subUserPhoneNum: '18612439870',
        detailDate: '2024/01/02',
        waterAmount: 122225.2
      })
    }
    setDataList(arr)
    // setParam({
    //   ...param,
    //   page: param.page + 1
    // })
    // setDataList(val => [...val, ...arr])
    // setHasMore(arr.length > 0)
  }

  const getSaleData = () => {
    Apis.getSaleData({
      userId: userInfo.userId
    }).then(res => {
      const tempMap = ['ytdWaterAmount', 'curMonthWaterAmount', 'historyAllWaterAmount']
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

  useEffect(() => {
    getList()
  }, [param])

  return <div className='sociaty-small-proxy-wrapper'>
    <NavBar back='返回' onBack={back}>
      推广明细
    </NavBar>
    <Space className='sociaty-small-yesterday'>
      <span>昨日流水</span>
      <span>{saleData.ytdWaterAmount || 0}</span>
    </Space>
    <Space className='sociaty-small-month'>
      <Space>
        <span>本月流水</span>
        <span>{saleData.curMonthWaterAmount || 0}</span>
      </Space>
      <Space>
        <span>历史流水</span>
        <span>{saleData.historyAllWaterAmount || 0}</span>
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
export default SociatySmallProxy