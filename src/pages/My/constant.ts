export const FunctionData = [{
  icon: 'https://cdn.tuanzhzh.com/buyudaren/paihang.png',
  name: '排行榜',
  key: 1
}, {
  icon: 'https://cdn.tuanzhzh.com/buyudaren/kefu.png',
  name: '客服',
  key: 2
}, {
  icon: 'https://cdn.tuanzhzh.com/buyudaren/shuoming.png',
  name: '游戏说明',
  key: 3
}, {
  icon: 'https://cdn.tuanzhzh.com/buyudaren/duihuan.png',
  name: '兑换码',
  key: 4
}, {
  icon: 'https://cdn.tuanzhzh.com/buyudaren/yaoqing.png',
  name: '邀请朋友',
  key: 5
}]

const dealWithDateData = () => {
  const DateData = []
  for(let i = 1; i < 31; i++) {
    if ([3, 6, 9, 13, 17, 20, 24, 27, 29].includes(i)) {
      let zuanshi = 0
      switch (i) {
      case 3:
        zuanshi = 3
        break;
      case 6:
      case 9:
        zuanshi = 5
        break;
      case 13:
      case 17:
      case 24:
        zuanshi = 7
        break;
      case 20:
        zuanshi = 9
        break;
      case 27:
        zuanshi = 12
        break;
      case 29:
        zuanshi = 30
        break;
      default:
        break;
      }
      DateData.push({
        icon: 'https://cdn.tuanzhzh.com/buyudaren/qiandaozuanshi.png',
        signIcon: 'https://cdn.tuanzhzh.com/buyudaren/yiqiandao.png',
        noSignIcon: 'https://cdn.tuanzhzh.com/buyudaren/weiqiandao.png',
        number: zuanshi,
        key: i
      })
    } else {
      let gold = 0
      switch (i) {
      case 1:
      case 2:
      case 4:
      case 5:
        gold = 1
        break;
      case 8:
      case 11:
      case 12:
      case 15:
      case 16:
      case 19:
        gold = 2
        break;
      case 7:
      case 10:
      case 22:
      case 23:
      case 25:
      case 26:
        gold = 3
        break;
      case 14:
      case 18:
        gold = 5
        break;
      case 21:
        gold = 7
        break;
      case 20:
        gold = 9
        break;
      case 27:
        gold = 12
        break;
      case 28:
        gold = 10
        break;
      case 30:
        gold = 20
        break;
      default:
        break;
      }
      DateData.push({
        icon: 'https://cdn.tuanzhzh.com/buyudaren/qiandaojinbi.png',
        signIcon: 'https://cdn.tuanzhzh.com/buyudaren/yiqiandao.png',
        noSignIcon: 'https://cdn.tuanzhzh.com/buyudaren/weiqiandao.png',
        number: gold,
        key: i
      })
    }
  }
  return DateData
}

export default dealWithDateData()
