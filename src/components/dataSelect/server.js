import BaseServer from '../baseServer'
export default class Server extends BaseServer {

  constructor(params) {
    super(params);
  }

  /**
    * 根据值集code查询值集信息
    */
   queryValueSetByCode(param) {
    return this.QueryValueSetByCode(param);
  }

  /**
    * 根据值集parentCode、code查询值集信息
    */
   queryValueSetByCodeAndParentKey(param) {
    return this.QueryValueSetByCodeAndParentKey(param);
  }
}