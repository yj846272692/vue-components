export default class Server {

  constructor(params) {

  }

  /**
    * 查询供应商信息
    */
  queryVendorInfo(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsPaymentUrl}/PayLineController/info/getPayLineInfo`, param).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }

  /**
    * 保存供应商信息
    */
  saveVendorInfo(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsPaymentUrl}/PayLineController/info/updatePayLineInfo`, param).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }
}