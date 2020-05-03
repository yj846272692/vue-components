// 仅在开发环境下使用mock数据
if (process.env.API.mock) {
  require('@/mock/index.js')
}

export default class Server {
  constructor(params) {
  }
  /**
     * 分页查询
     */
  QueryaccountControllerList(param = {}) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsBaseDataURL}/account/findPage`, param).then((response) => {
        resolve(response);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }
}