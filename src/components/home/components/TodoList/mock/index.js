import Mock from 'mockjs'

const listItem = {
  a: "2018-06-26",
  b: "CCSQ201806261004",
  c: "职工体检费",
  d: "324.00",
  e: "审批中",
  f: "直接上级-栗子祥",
  g: "入职体检费用报销"
}

const datas = []

for(var i = 0; i < 5; i++) {
  datas.push(listItem)
}

const list = {"total":5,"list":datas,"pageNum":1,"pageSize":10,"size":10,"startRow":0,"endRow":0,"pages":0,"prePage":0,"nextPage":0,"isFirstPage":false,"isLastPage":true,"hasPreviousPage":false,"hasNextPage":false,"navigatePages":8,"navigatepageNums":[],"navigateFirstPage":0,"navigateLastPage":0,"firstPage":0,"lastPage":0}

// 付款列表
Mock.mock(`${process.env.API.claimURL}/initPaymentPreparation/getTodoList`, list)
