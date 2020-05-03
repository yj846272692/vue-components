// 仅在开发环境下使用mock数据
// if(process.env.API.mock) {
//   require('./mock')
// }

export default class Server {

  constructor(params) {
    
  }

  _errReporter(error) {
    return { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
  }

  _axios(url, param) {
    return new Promise((resolve) => {
      $axios.post(url, param).then((response) => {
        console.log(url, response)
        resolve(response.data);
      }).catch((error) => {
        resolve(this._errReporter(error));
      })
    })
  }


  /**
  * 已选择 常用申请 列表
  */
  getList(param = {}) {
    return this._axios(`${process.env.API.baseURL}/sys/menuhome/queryhome`, param)
  }

  /**
  * 新增
  */
  add(param = {}) {
    return this._axios(`${process.env.API.baseURL}/sys/menuhome/inserthome`, param)
  }

  /**
  * 删除
  */
  del(param = {}) {
    return this._axios(`${process.env.API.baseURL}/sys/menuhome/deletehome`, param)
  }

  /**
  * 排序
  */
  sort(param = {}) {
    return this._axios(`${process.env.API.baseURL}/sys/menuhome/updatehome`, param)
  }


}