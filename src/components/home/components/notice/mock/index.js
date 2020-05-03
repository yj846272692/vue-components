import Mock from 'mockjs'

const datas = [{
  title: "华润集团管理信息化系统用户账户及权限管理规范"
},{
  title: "华润置地财务领域共性系统组织架构变更接入集团主数据平台的通知"
},{
  title: "华润饮料OA系统成功迁移至集团平台"
},{
  title: "集团新版外联网上线试运行"
},{
  title: "关于华润电力ERP煤业项目成功接入LDAP的通知"
}]

// 付款权限列表
Mock.mock(`${process.env.API.claimURL}/initPaymentPreparation/getNoticeList`, datas)
