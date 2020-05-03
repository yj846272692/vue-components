import BaseServer from '../baseServer'
export default class Server extends BaseServer {

  constructor(params) {
    super(params);
  }

  /**
    * 查询本地出纳人员
    */
  queryCashierByCompanyCode(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsPaymentUrl}/payment/config/load/local_cashier/${param.companyCode}`, param).then((response) => {
        resolve(response.data);
      })
        .catch((error) => {
          let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
          resolve(responseData);
        })
    })
  }

  //提交
  sumbitCashierByCompanyCode(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsPaymentUrl}/payment/prepare/informLocalCashier/${param.localCashierCode}`, param.cashierParam).then((response) => {
        resolve(response.data);
      })
        .catch((error) => {
          let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
          resolve(responseData);
        })
    })
  }
}