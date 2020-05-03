export default class Server {

  constructor(params) {
  }

  /**
    * 查询归属公司信息
    */
   queryCompanys(param = {}) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsBaseDataURL}/mdOu/findCurrentMdOu`, param).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }

  /**
    * 付款工作台权限配置查询归属公司信息
    */
    paymentQueryCompanys(param = {}) {
      return new Promise((resolve) => {
        $axios.post(`${process.env.API.emsBaseDataURL}/mdOu/findAllMdOuList`, param).then((response) => {
          resolve(response.data);
        }).catch((error) => {
          let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
          resolve(responseData);
        })
      })
    }
}