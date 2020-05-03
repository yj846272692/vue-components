import BaseServer from '../baseServer'
export default class Server extends BaseServer {

  constructor(params) {
    super(params);
  }

  /**
    * 查询不同付款信息对应的付款方式
    */
   queryPayTypes(param) {
    return new Promise((resolve) => {
      // $axios.post(`${process.env.API.emsPaymentUrl}/payment/pay/info/queryPayInfo`, param).then((response) => {
      $axios.post(`${process.env.API.claimURL}/payment/pay/info/queryPayInfo/${param.payRequestLineId}/${param.payWay}`).then((response) => {
      resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }

  /**
   * 查询银行默认信息
   */
  queryBankDefault(param = {}) {
    return new Promise((resolve) => {
      // $axios.post(`${process.env.API.emsPaymentUrl}/paymentInfoQuery/defaultBankInfo`, param).then((response) => {
      $axios.post(`${process.env.API.claimURL}/paymentInfoQuery/defaultBankInfo`, param).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }

  /**
   * 查询付款信息默认信息POST /paymentInfoQuery/defaultPaymentInfo
   */
  queryPayinfoDefault(param = {}) {
    return new Promise((resolve) => {
      // $axios.post(`${process.env.API.emsPaymentUrl}/paymentInfoQuery/defaultPaymentInfo`, param).then((response) => {
      $axios.post(`${process.env.API.claimURL}/paymentInfoQuery/defaultPaymentInfo`, param).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }

  /**
   * 保存付款信息
   */
  savePayWayInfo(param = {}) {
    return new Promise((resolve) => {
      // $axios.post(`${process.env.API.emsPaymentUrl}/payment/pay/info/savePayInfo`, param).then((response) => {
        $axios.post(`${process.env.API.claimURL}/payment/pay/info/savePayInfo`, param).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }
}