import qs from 'qs';
export default class BaseServer {

  /**
   * 构造方法
   * 
   * @param {*} params 
   */
  constructor(params = {}) {
    this.formProcNo = ''

    // 提交流程基础数据，做流程提交时候需要该参数
    this.baseFlowRequest = {
      title: '',
    };
  }

  /**
    * 根据值集代码查询值集
    */
  queryValueSetByCode(param) {
    return new Promise((resolve) => {
      $axios.get(`${process.env.API.baseURL}/sys/valueset/item/list/${param.code}`).then((response) => {
        let result = [];
        for (let item of response.data.dataResult) {
          result.push({ label: item.vsiValue, value: item.vsiKey });
        }
        resolve(result);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }

  /**
    * 根据值集代码和父值集代码查询值集
    */
  queryValueSetByCodeAndParentCode(param) {
    return new Promise((resolve) => {
      $axios.get(`${process.env.API.baseURL}/sys/valueset/item/list/${param.code}/${param.parentKey}`).then((response) => {
        let result = [];
        for (let item of response.data.dataResult) {
          result.push({ label: item.vsiValue, value: item.vsiKey });
        }
        resolve(result);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }

  /**
    * 查询归属公司
    */
  queryCompay(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.todo}/todo`, param).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }

  /**
    * 查询付款方式
    */
  queryPaymentTypes(param) {
    return this.queryValueSetByCode(param);
  }

  /**
    * 查询归属公司
    */
  queryCompay(param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.emsAccountingUrl}/todo`, param).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        let responseData = { "dataResult": [], "extra": "", "msg": (error.response.data.message || "服务异常，请联系管理员"), "statusCode": "-1" };
        resolve(responseData);
      })
    })
  }

  /**
    * 
    * 触发待办流程页面跳转
    * 
    */
  todoProcess(formProcNo) {
    this._triggerProcess({ formProcNo, actionType: 'todo' });
  }

  /**
    * 
    * 触发草稿流程页面跳转
    * 
    */
  draftProcess(formProcNo) {
    this._triggerProcess({ formProcNo, actionType: 'draft' });
  }

  /**
    * 
    * 触发已办流程页面跳转
    * 
    */
  doneProcess(formProcNo) {
    this._triggerProcess({ formProcNo, actionType: 'done' });
  }

  _triggerProcess(params) {
    let { formProcNo } = params;
    if (!formProcNo) {
      $app.$Message.warning({
        content: '请提供流程发起编码',
        duration: 3
      });
      return;
    }
    return this.queryProcessParams(formProcNo)
      .then((response) => {
        if (response.statusCode == '0') {
          let origin = location.origin ? location.origin : location.href.split('/#')[0];
          let dataResult = response.dataResult;
          for (let key of Object.keys(dataResult)) {
            if (key != 'formUrl') {
              params[key] = dataResult[key];
            }
          }
          window.open(
            `${origin}/${dataResult.formUrl}?${qs.stringify(params)}&crctoken=${sessionStorage.crctoken}`
          );
        }
      });
  }

  // 通过流程发起编码查询其他工作流参数
  queryProcessParams(formProcNo) {
    return $store.dispatch("queryProcessParams", { formProcNo })
      .then((res) => {
        let data = res.dataResult;
        if (!data) {
          return;
        }
        this._setProcessParams(data);
        return res;
      });
  }

  _setProcessParams(data) {
    for (let key of Object.keys(data)) {
      if (key.toUpperCase() == 'PROCDEFID') {
        this.baseFlowRequest['procDefId'] = data[key];
      } else if (key.toUpperCase() == 'PROCDEFKEY') {
        this.baseFlowRequest['procDefKey'] = data[key];
      } else if (key.toUpperCase() == 'FORMPROCNO') {
        this.formProcNo = data[key];
      } else if (key.toUpperCase() == 'FORMURL') {
        this.formUrl = data[key];
      } else {
        // 只赋值 baseFlowRequest 定义的参数
        this.baseFlowRequest[key] !== undefined && (this.baseFlowRequest[key] = data[key]);
      }
    }
  }

  // 业务接口--查询是否拥有发起权限
  queryFormSetStartPower() {
    return $store.dispatch("queryStartProcessPower", { id: this.baseFlowRequest.formsetId });
  }

  // 业务接口--查询是否拥有待办权限
  queryFormSetTodoPower(taskId) {
    return $store.dispatch("queryTodoProcessPower", { id: this.baseFlowRequest.taskId });
  }

  // 业务接口--查询是否拥有已办权限
  queryFormSetDonePower(taskId) {
    return $store.dispatch("queryDoneProcessPower", { id: this.baseFlowRequest.taskId });
  }

  // 业务接口--查询可驳回节点
  queryRejectNodes() {
    return $store.dispatch("queryRejectNodes", {
      actId: this.baseFlowRequest.actId,
      procInstId: this.baseFlowRequest.processInstanceId,
    });
  }

  // 业务接口--查询业务表单vue组件相对路径
  queryProcessVueUrl(formId) {
    return $store.dispatch("queryProcessVueUrl", { id: formId });
  }

  // 业务接口--查询是否拥有撤回权限
  queryWithDrawPower(params) {
    return $store.dispatch("queryWithDrawPower", {
      procInstId: params.procInstId,
      taskId: params.taskId,
      actionType: params.actionType,
      startUserCode: params.startUserCode,
      currentNodeName: params.currentNodeName,
    });
  }

  // 业务接口--查询流程图URL
  queryProcessPictureUrl() {
    return $store.dispatch("queryProcessPictureUrl", {
      processDefinitionId: this.baseFlowRequest.procDefId,
      processInstanceId: this.baseFlowRequest.processInstanceId,
    });
  }

  // 业务接口--查询审批记录
  queryProcessOperateLog() {
    return $store.dispatch("queryProcessOperateLog", {
      processInstanceId: this.baseFlowRequest.processInstanceId,
    });
  }

  // 业务接口--查询baseInfo，包含当前处理人等信息
  queryProcessBaseInfo() {
    return $store.dispatch("queryProcessBaseInfo", {
      id: this.baseFlowRequest.taskId,
    });
  }

  // 业务接口--查询员工信息
  queryEmployeeInfo() {
    return $store.dispatch("queryEmployeeInfo", {
      id: this.baseFlowRequest.taskId,
    });
  }



  // 业务接口--提交流程
  // 有两种情况：1.提交后接口返回要求选择节点 2.直接提交成功
  submitInfo(params) {

    // 如果是发起流程，设置submitType为：通过
    if (this.baseFlowRequest.actionType == 'start') {
      this.baseFlowRequest.submitType = '通过';
    }

    // 如果有最后校验函数，执行
    if (typeof params.finalValidate == 'function' && !params.finalValidate(params, this.baseFlowRequest)) return;

    // 待办且驳回节点有值
    if (params.rejectNode && params.actionType == 'todo') {
      Object.assign(this.baseFlowRequest, { procActs: { actId: params.rejectNode } });
    }

    let obj = Object.assign({}, params, {
      baseFlowRequest: this.baseFlowRequest
    });

    return $store.dispatch("PaymentApplySubmit", obj);
  }

  // 选择节点后提交流程
  // 有两种情况：1.提交后接口返回要求选择节点 2.直接提交成功
  secondSubmitInfo(params) {

    // 节点人员校验
    let employeeValid = true;

    // 设置流程参数
    for (let key of Object.keys(this.baseFlowRequest)) {
      this.baseFlowRequest[key] = params[key];
    }

    // 如果首次提交返回的结果里面有taskId、todo、done流程
    if ((this.preSubmitResult.baseFlowRequest && this.preSubmitResult.baseFlowRequest.taskId && this.childProps.actionType == 'start')
      || (this.preSubmitResult.baseFlowRequest && this.preSubmitResult.baseFlowRequest.taskId && this.childProps.actionType == 'todo')
      || (this.preSubmitResult.baseFlowRequest && this.preSubmitResult.baseFlowRequest.taskId && this.childProps.actionType == 'done')) {

      if (params.actionType == 'start') {
        let base = this.preSubmitResult.baseFlowRequest;
        this.baseFlowRequest.taskId = base.taskId;
        this.baseFlowRequest.processInstanceId = base.processInstanceId;
        this.baseFlowRequest.formInstId = base.formInstId;
        this.baseFlowRequest.callBackUrl = base.callBackUrl;
        this.baseFlowRequest.actionType = 'todo';
      }

      let choices = this.preSubmitResult.choices;

      // 整理选择的节点信息
      if (choices && choices.length > 0) {

        let procActs = [];

        for (let item of choices) {

          if (!employeeValid) {
            break;
          }
          let temp = {};
          temp.actId = item.actId;

          // 整理选择节点中人员信息
          let nameMap = {
            'id': 'id',
            'ldapId': 'employeeOprid',
            'chnName': 'employeeChnName',
            'engName': 'employeeEngName',
            'mobilePhone': 'employeeMobilePhone',
            'emailAddr': 'employeeEmailAddr',
            'deptId': 'employeeDeptId',
            'deptName': ' employeeDeptDescr',
          };
          if (item.actUsers && item.actUsers.length > 0) {

            // 如果人员只有一个
            if (item.actUsers.length == 1) {
              let assignee = {};
              for (let key of Object.keys(nameMap)) {
                let realKey = nameMap[key];
                assignee[key] = item.actUsers[0][realKey];
              }
              temp.assignee = assignee;

              // 如果人员有多个
            } else if (item.actUsers.length > 1) {
              let candidateUser = [];
              for (let user of item.actUsers) {
                let employee = {};
                for (let key of Object.keys(nameMap)) {
                  let realKey = nameMap[key];
                  employee[key] = user[realKey];
                }
                candidateUser.push(employee);
              }
              temp.candidateUser = candidateUser;
            }
          } else {
            employeeValid = false;
            $app.$Message.warning({
              content: `节点: ${item.actName} 的人员为空，请添加人员`,
              duration: 3
            });
            break;
          }
          procActs.push(temp);
        }
        Object.assign(baseFlowRequest, { procActs: procActs });
      }
    }

    if (!employeeValid) {
      return;
    }

    // 待办且驳回节点有值
    if (params.rejectNode && params.actionType == 'todo') {
      Object.assign(baseFlowRequest, { procActs: { actId: params.rejectNode } });
    }

    let obj = Object.assign({}, params, {
      baseFlowRequest: baseFlowRequest
    });

    return $store.dispatch("PaymentApplySubmit", obj);
  }
};
