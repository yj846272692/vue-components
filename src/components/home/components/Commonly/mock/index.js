import Mock from 'mockjs'
import commonList from './commonList'
import quickList from './quickList'
import personCommonList from './personCommonList'
import personQuickList from './personQuickList'

// 已选择 常用申请 列表
Mock.mock(`${process.env.API.claimURL}/initPaymentPreparation/personCommonList`, personCommonList)
// 已选择 快捷功能 列表
Mock.mock(`${process.env.API.claimURL}/initPaymentPreparation/personQuickList`, personQuickList)
// 常用申请列表
Mock.mock(`${process.env.API.claimURL}/initPaymentPreparation/commonList`, commonList)
// 快捷功能列表
Mock.mock(`${process.env.API.claimURL}/initPaymentPreparation/quickList`, quickList)

