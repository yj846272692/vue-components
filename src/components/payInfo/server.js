import BaseServer from '../baseServer'
export default class Server extends BaseServer {

  constructor(params) {
    super(params);
  }
  //查询付款信息
  queryPaymentInfo(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.claimURL}/payRequestLinePayInfo/findListByPayRequestLineId`,param).then((response) => {
      resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  };
  //删除付款信息
  deletePaymentInfo(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.claimURL}/payRequestLinePayInfo/detele/${param}`).then((response) => {
      resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }
  //保存付款信息
  savePaymentInfo(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.claimURL}/payRequestLinePayInfo/save`,param).then((response) => {
      resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  };

  //查询付款信息(创建付款准备页面查询)
  queryCreatePaymentInfo(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsPaymentUrl}/payLinePayInfo/selectPayInfoList`,param).then((response) => {
      resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  };
  //保存付款信息(创建付款准备页面查询)
  saveCreatePaymentInfo(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsPaymentUrl}/payment/prepare/createPayLineDetail`,param).then((response) => {
      resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  };
}