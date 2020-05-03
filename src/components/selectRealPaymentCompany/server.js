export default class Server {

  constructor(params) {

  }

  /**
    * 根据付款方公司信息查询银行信息组件
    * 
    */
  queryBanks(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsBaseDataURL}/mdBank/findMdBankListByCondition`, param).then((response) => {
        resolve(response);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }
}