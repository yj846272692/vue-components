// 仅在开发环境下使用mock数据
if(process.env.API.mock) {
  require('./mock')
}

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
        resolve(response);
      }).catch((error) => {
        resolve(this._errReporter(error));
      })
    })
  }


  /**
    * 拉取信息公告列表数据
    */
  getNewsList(param = "") {
    return new Promise((resolve) => {
      $axios.get(`${process.env.API.baseURL}/sys/notice/my/${param}`, param).then((response) => {
        resolve(response);
      }).catch((error) => {
        resolve(this._errReporter(error));
      })
    })
  }

  /**
    * 根据id获取公告详情
    */
  getNoticeInfo(param = "") {
    return new Promise((resolve) => {
      $axios.get(`${process.env.API.baseURL}/sys/notice/view/${param}`).then((response) => {
        resolve(response);
      }).catch((error) => {
        resolve(this._errReporter(error));
      })
    })
  }

  /**
    * 获取公告附件列表
    */
  getNoticeAttaList(param = "") {
    return new Promise((resolve) => {
      $axios.get(`${process.env.API.baseURL}/sys/notice/attach/list/${param}`).then((response) => {
        resolve(response);
      }).catch((error) => {
        resolve(this._errReporter(error));
      })
    })
  }

  /**
    * 下载附件
    */
  downloadAttach(param = {}) {
    return new Promise((resolve) => {
      $axios.get(`${process.env.API.baseURL}/sys/notice/attach/download/${param}`, param).then((response) => {
        resolve(response);
      }).catch((error) => {
        resolve(this._errReporter(error));
      })
    })
  }

}