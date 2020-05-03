import Mock from 'mockjs'

const datas = [{
  id: 1,
  title: "信息公告",
  list: [{
    id: 1,
    title: "华润集团管理信息化系统用户账户及权限管理规范",
    date: "6月21日"
  },{
    id: 2,
    title: "华润置地财务领域共性系统组织架构变更接入集团主数据平台的通知",
    date: "6月21日"
  },{
    id: 3,
    title: "华润饮料OA系统成功迁移至集团平台",
    date: "6月21日"
  }],
},{
  id: 2,
  title: "信息文档",
  list: [{
    id: 4,
    title: "华润饮料OA系统成功迁移至集团平台",
    date: "6月22日"
  },{
    id: 5,
    title: "华润集团管理信息化系统用户账户及权限管理规范",
    date: "6月23日"
  },{
    id: 6,
    title: "华润置地财务领域共性系统组织架构变更接入集团主数据平台的通知",
    date: "6月24日"
  }],
}]

// 付款权限列表
Mock.mock(`${process.env.API.claimURL}/initPaymentPreparation/getBoardList`, datas)
