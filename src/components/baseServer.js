// 仅在开发环境下使用mock数据
if (process.env.API.mock) {
  require('@/mock/index.js')
}
export default class BaseServer {

  constructor(params) {

  }

  // 根据值集代码查询
  QueryValueSetByCode(param) {
    return new Promise((resolve) => {
      $axios.get(`${process.env.API.baseURL}/sys/valueset/item/list/VEHICLE`).then((response) => {
        debugger
        if (response.data.statusCode == '0') {
          let result = [];
          for (let item of response.data.dataResult) {
            result.push({ label: item.vsiValue, value: item.vsiKey });
          }
          resolve(result);
        } else {
          let responseData = { "dataResult": [], "extra": "", "msg": (response.data.msg || "服务异常，请联系管理员"), "statusCode": "-1" };
          resolve(responseData);
        }
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }

  // 根据值集代码、父级值key查询
  QueryValueSetByCodeAndParentKey(param) {
    return new Promise((resolve) => {
      $axios.get(`${process.env.API.baseURL}/sys/valueset/item/list/${param.code}/${param.parentKey}`).then((response) => {
        debugger
        if (response.data.statusCode != '-1') {
          let result = [];
          for (let item of response.data.dataResult) {
            result.push({ label: item.vsiValue, value: item.vsiKey });
          }
          resolve(result);
        } else {
          let responseData = { "dataResult": [], "extra": "", "msg": (response.data.msg || "服务异常，请联系管理员"), "statusCode": "-1" };
          resolve(responseData);
        }
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }
}