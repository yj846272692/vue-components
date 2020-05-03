export default class Server {

  constructor(params) {

  }

  /**
    * 分页查询城市信息
    */
   queryCitys(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.claimURL}/standardarea/findStandardareaListByPage`, param).then((response) => {
        resolve(response);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }
}