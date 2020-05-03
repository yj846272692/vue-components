export default class Server {

  constructor(params) {
    
  }

  /**
    * 查询项目信息
    */
   queryCompanys(param = {}) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsBaseDataURL}/project/findPagedProjectList`, param).then((response) => {
        resolve(response);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }
}