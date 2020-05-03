import Mock from 'mockjs'

import getPaymentTableDatas from "./getPaymentTableDatas"

// 付款权限列表
Mock.mock(`${process.env.API.claimURL}/initPaymentPreparation/xx123`, getPaymentTableDatas)
