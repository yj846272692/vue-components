import BaseServer from '../baseServer'
export default class Server extends BaseServer {

  constructor(params) {
    super(params);
  }

  /**
    * 查询初始化的三层组织信息
    */
  queryInitializationOrgs(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.baseURL}/org/findOrgs` + (param ? ("/" + param.name) : ""), {}).then((response) => {
        resolve(response.data);
      })
        .catch((error) => {
          let responseData = { "dataResult": [], "extra": "", "msg": "服务异常，请联系管理员", "statusCode": "-1" };
          resolve(responseData);
        })
    })
  }

  /**
    * 根据组织code查询下一级组织部门
    */
  querySubOrgsByOrgCode(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.baseURL}/org/findSubOrgs/` + param.orgId, {}).then((response) => {
        resolve(response.data);
      })
        .catch((error) => {
          let responseData = { "dataResult": [], "extra": "", "msg": "服务异常，请联系管理员", "statusCode": "-1" };
          resolve(responseData);
        })
    })
  }

  /**
    * 根据组织code查询员工
    */
  queryEmployeeByOrgCode(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.baseURL}/org/findSubEmployees/` + param.orgId, {}).then((response) => {
        resolve(response.data);
      })
        .catch((error) => {
          let responseData = { "dataResult": [], "extra": "", "msg": "服务异常，请联系管理员", "statusCode": "-1" };
          resolve(responseData);
        })
    })
  }
  queryEmployeeByOrgCodeClaim(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.claimURL}/org/findSubEmployees/` + param.orgId, {}).then((response) => {
        resolve(response.data);
      })
        .catch((error) => {
          let responseData = { "dataResult": [], "extra": "", "msg": "服务异常，请联系管理员", "statusCode": "-1" };
          resolve(responseData);
        })
    })
  }

  /**
    * 根据组织名称查询组织数据
    */
  queryOrgByOrgName(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.baseURL}/org/findOrg` + (param ? ("/" + param.name) : ""), {}).then((response) => {
        resolve(response.data);
      })
        .catch((error) => {
          let responseData = { "dataResult": [], "extra": "", "msg": "服务异常，请联系管理员", "statusCode": "-1" };
          resolve(responseData);
        })
    })
  }

  /**
    * 根据员工姓名查询员工
    */
  queryEmployeeByName(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.baseURL}/org/findEmployee/${param.name}`, param).then((response) => {
        resolve(response.data);
      })
        .catch((error) => {
          let responseData = { "dataResult": [], "extra": "", "msg": "服务异常，请联系管理员", "statusCode": "-1" };
          resolve(responseData);
        })
    })
  }
}