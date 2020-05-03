export default class Server {

  constructor(params) {

  }

  /**
    * 根据供应商名称查询供应商银行账号信息
    */
  queryBanks(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsBaseDataURL}/vendor/findVendorListByType`, param).then((response) => {
        resolve(response);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }
}