import BaseServer from '../baseServer'
export default class Server extends BaseServer {

  constructor(params) {
    super(params);
  }

  /**
    * 查询所有业务大类
    */
   queryAllBusinessType() {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsBaseDataURL}/category/buildCategoryTree`, {}).then((response) => {
        resolve(response.data);
      })
        .catch((error) => {
          let responseData = { "dataResult": [], "extra": "", "msg": "服务异常，请联系管理员", "statusCode": "-1" };
          resolve(responseData);
        })
    })
  }

  // 查询业务大树数据
  queryBusinessCategorys(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsBaseDataURL}/category/buildCategoryTreeByCondition/`, param).then((response) => {
        resolve(response.data);
      })
        .catch((error) => {
          let responseData = { "dataResult": [], "extra": "", "msg": "服务异常，请联系管理员", "statusCode": "-1" };
          resolve(responseData);
        })
    })
  }
}