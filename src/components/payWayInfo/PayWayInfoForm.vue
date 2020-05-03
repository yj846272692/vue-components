<template>
  <div>
    <Form :model="modelForm" ref="payWayInfoForm" :rules="rule" :label-width="120">
      <Row :gutter="20" >
        <Col span="12" >
          <Form-item prop="paymentMode" label="付款方式" >
            <DataSelect v-if="!editShow"  :parentVal="payWay" code='payWay' :value="modelForm.payWay" v-model="modelForm.payWay"></DataSelect>
            <DataSelect v-if="editShow" disabled  :parentVal="payWay" code='payWay' :value="modelForm.payWay" v-model="modelForm.payWay"></DataSelect>
          </Form-item>
        </Col>
        <Col span="12" >
          <Form-item prop="amount" label="金额">
            <Input v-if="!editShow"  v-model="modelForm.amount" placeholder="" ></Input>
            <Input v-if="editShow" disabled v-model="modelForm.amount" placeholder="" ></Input>
          </Form-item>
        </Col>
      </Row>
      <Row :gutter="20" >
        <Col span="12" >
          <Form-item prop="ouName" label="实际付款公司">
            <SelectRealPaymentCompany :showSave="showSave" :compCode="ouCode"  v-model="modelForm.ouName"  @handleSelect="handleSelectCom"></SelectRealPaymentCompany>
          </Form-item>
        </Col>
        <Col span="12" >
          <Form-item prop="accountName" label="银行账户名称">
            <Input placeholder="" v-model="modelForm.accountName" maxlength="50" disabled></Input>
          </Form-item>
        </Col>
      </Row>
      <Row :gutter="20"  v-if="isDisplay">
        <Col span="12" >
          <Form-item prop="accountNo" label="银行账号">
            <Input placeholder="" v-model="modelForm.accountNo" maxlength="50" disabled></Input>
          </Form-item>
        </Col>
        <Col span="12" >
          <Form-item prop="configFileCode" label="单据处理配置文件">
            <DataSelect v-if="!editShow" :code='allCode.configFileCode' :value="modelForm.configFileCode" v-model="modelForm.configFileCode"></DataSelect>
            <DataSelect v-if="editShow" disabled :code='allCode.configFileCode' :value="modelForm.configFileCode" v-model="modelForm.configFileCode"></DataSelect>
          </Form-item>
        </Col>
      </Row>
      <Row :gutter="20"  v-if="isDisplay">
        <Col span="12" >
          <Form-item prop="payTp" label="付款单据">
            <DataSelect v-if="!editShow" :code='allCode.payTpCode' :value="modelForm.payTp" v-model="modelForm.payTp"></DataSelect>
            <DataSelect v-if="editShow" disabled :code='allCode.payTpCode' :value="modelForm.payTp" v-model="modelForm.payTp"></DataSelect>
          </Form-item>
        </Col>
        <Col span="12" >
          <Form-item prop="tpCode" label="单据类型">
            <DataSelect v-if="!editShow" :code='allCode.tpCode' :value="modelForm.tpCode" v-model="modelForm.tpCode" ></DataSelect>
            <DataSelect v-if="editShow" disabled :code='allCode.tpCode' :value="modelForm.tpCode" v-model="modelForm.tpCode" ></DataSelect>
          </Form-item>
        </Col>
      </Row>
      <Row :gutter="20"  v-if="isDisplay">
        <Col span="12" >
          <Form-item prop="settleType" label="结算方式">
            <DataSelect v-if="!editShow" :code='allCode.settleTypeCode' :value="modelForm.settleType" v-model="modelForm.settleType"></DataSelect>
            <DataSelect v-if="editShow" disabled :code='allCode.settleTypeCode' :value="modelForm.settleType" v-model="modelForm.settleType"></DataSelect>
          </Form-item>
        </Col>
        <Col span="12" >
          <Form-item prop="remittanceSpeed" label="汇款速度">
            <DataSelect v-if="!editShow" :code='allCode.remittanceSpeedCode' :value="modelForm.remittanceSpeed" v-model="modelForm.remittanceSpeed"></DataSelect>
            <DataSelect v-if="editShow" disabled :code='allCode.remittanceSpeedCode' :value="modelForm.remittanceSpeed" v-model="modelForm.remittanceSpeed"></DataSelect>
          </Form-item>
        </Col>
      </Row>
      <Row :gutter="20"  v-if="isDisplay">
        <Col span="12" >
          <Form-item prop="transfersType" label="转账类型">
            <DataSelect v-if="!editShow" :code='allCode.transfersTypeCode' :value="modelForm.transfersType" v-model="modelForm.transfersType"></DataSelect>
            <DataSelect v-if="editShow" disabled :code='allCode.transfersTypeCode' :value="modelForm.transfersType" v-model="modelForm.transfersType"></DataSelect>
          </Form-item>
        </Col>
        <Col span="12" >
          <Form-item prop="fundPlan" label="资金计划">
            <DataSelect v-if="!editShow" :code='allCode.fundPlanCode' :value="modelForm.fundPlan" filterable v-model="modelForm.fundPlan"></DataSelect>
            <DataSelect v-if="editShow" disabled :code='allCode.fundPlanCode' :value="modelForm.fundPlan" filterable v-model="modelForm.fundPlan"></DataSelect>
          </Form-item>
        </Col>
      </Row>
      <Form-item prop="summary" label="摘要">
        <Input v-if="!editShow" placeholder="" type="textarea" :rows="1" v-model="modelForm.summary" maxlength="100" style="width:75%"></Input>
        <Input v-if="editShow" disabled placeholder="" type="textarea" :rows="1" v-model="modelForm.summary" maxlength="100" style="width:75%"></Input>
        <span style='color: red;'>长度尽量在7个字以内</span>
      </Form-item>
      <Form-item prop="purpose" label="用途">
        <Input v-if="!editShow" placeholder="" type="textarea" :rows="1" v-model="modelForm.purpose" maxlength="100" style="width:75%"></Input>
        <Input disabled v-if="editShow" placeholder="" type="textarea" :rows="1" v-model="modelForm.purpose" maxlength="100" style="width:75%"></Input>
        <span style='color: red;'>长度尽量在7个字以内</span>
      </Form-item>
    </Form>
  </div>
</template>
<script>
import DataSelect from './../dataSelect/DataSelect.vue'
import SelectRealPaymentCompany from './../selectRealPaymentCompany/SelectRealPaymentCompany.vue'
import Server from './server';
const server = new Server;
export default{
  name: 'payWayInfoForm',
  components:{
    DataSelect,
    SelectRealPaymentCompany
  },
  props:{
    title:{
      type: String,
      default(){
        return '付款信息';
      }
    },
    payWay:{
      type: String,
      default(){
        return '';
      }
    },
    payRequestLineIds:{
      type: Array,
      default(){
        return [];
      }
    },
    ouCode:{
      type: String,
      default(){
        return '';
      }
    },
    claimId:{
      type: String,
      default(){
        return '';
      }
    },
    showSave:{
      type: Number,
      default(){
        return 0;
      }
    },
  },
  data(){
    return{
      allCode:{
        remittanceSpeedCode:'remittanceSpeed',
        fundPlanCode:'capitalPlan-2',
        transfersTypeCode:'transfersType',
        settleTypeCode:'settleType',
        tpCode:'tpCode',
        payTpCode:'payTp',
        configFileCode:'configFileCode'
      },
      server: server,
      modelForm: {
        amount: '',
        payWay: this.payWay,//付款方式
        paymentMode: this.payWay,
        payRequestLineIds: this.payRequestLineIds,
        ouCode: this.ouCode,
        ouName: "",
        accountName: "",//银行账户名称
        accountNo: "",//银行账户
        configFileCode: "",//单据处理配置文件
        payTp: "",//付款单据
        tpCode: "",//单据类型
        settleType: "",//结算方式
        remittanceSpeed: "",//汇款速度
        transfersType: "",//转账类型
        fundPlan: "",//资金计划
        summary: "",
        purpose: "",
      },
      rule: {
        paymentMode: [{ required: true, message: "请选择付款方式", trigger: "blur" }],
        ouName: [{ required: true, message: "请选择实际付款公司", trigger: "blur" }],
        summary: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        purpose: [{ required: true, message: "请输入用途", trigger: "blur" }],
      },
      paymentModeList: [],
      fundPlanList: [],
      transfersTypeList: [],
      isDisplay: true,
      inputValueCom:""
    }
  },
  computed:{
    editShow(){
      if(this.showSave == 0){
        return true
      }else{
        return false
      }
    }
  },
  created:function(){
    // 转账付款显示部分字段
    if(this.payWay == "1"){
      this.isDisplay = true;
      this.rule.configFileCode = [{ required: true, message: "请选择单据处理配置文件", trigger: "blur" }];
      this.rule.payTp = [{ required: true, message: "请选择付款单据", trigger: "blur" }];
      this.rule.tpCode = [{ required: true, message: "请选择单据类型", trigger: "blur" }];
      this.rule.settleType = [{ required: true, message: "请选择结算方式", trigger: "blur" }];
      this.rule.remittanceSpeed = [{ required: true, message: "请选择汇款速度", trigger: "blur" }];
      this.rule.transfersType = [{ required: true, message: "请选择转账类型", trigger: "blur" }];
      this.rule.fundPlan = [{ required: true, message: "请选择资金计划", trigger: "blur" }];
    }else{
      this.isDisplay = false;
    }

    this.$emit('SetTitle', this.title);
    this.$emit('SetPageSize', 750);
    let buttons = [];
    if(this.showSave == 1){
      buttons.push(
        {
          text: "保存",
          theme: "primary",
          handle: () => {
            this.save();
          }
        }
      );
    }
    buttons.push(
      {
        text: "关闭",
        theme: "primary",
        handle: () => {
          this.$emit('Close');
        }
      }
    );
    this.$emit('SetPageActions', buttons);
  },
  beforeMount:function() {

  },
  mounted:function() {
    this.init();
  },
  beforeDestroy:function() {

  },
  destroyed:function() {

  },
  methods:{
    init(){
      if(this.payRequestLineIds.length == 1){
        let param = {};
        param.payWay = this.payWay;
        param.payRequestLineId = this.payRequestLineIds[0];
        this.server.queryPayTypes(param).then(response => {
          // if(response.accountNo == null){
            // 未保存过设置默认值
            // this.setDefaultValue(param);
          // }else{
            // 保存过
            this.responseToModelForm(response);
          // }
        });
      }
      // // 付款方式
      // this.server.QueryValueSetByCodeAndParentKey({ "parentKey": this.payWay, code: 'todo' }).then(response => {
      //   this.paymentModeList = response.dataResult;
      // });
      // // 资金计划
      // this.server.QueryValueSetByCode({ code: 'todo' }).then(response => {
      //   this.fundPlanList = response.dataResult;
      // });
      // // 转账类型
      // this.server.QueryValueSetByCode({ code: 'transfersType' }).then(response => {
      //   this.transfersTypeList = response.dataResult;
      // });
    },
    onBankChange(bank) {
      this.modelForm.ouCode = bank.compCode;
      this.modelForm.ouName = bank.compName;
      this.modelForm.accountName = bank.bankAccountName;
      this.modelForm.accountNo = bank.bankAccountNum;
    },
    save(){
      this.$refs["payWayInfoForm"].validate(valid => {
        if (valid) {
          this.server.savePayWayInfo(this.modelForm).then(response => {
            if (response.statusCode == "-1") {
              this.$Message.warning({
                content: response.msg,
                duration: 3
              });
            } else {
              this.$Message.success({
                content: '操作成功',
                duration: 3
              });
              this.$emit('Close', this.modelForm);
            }
          });
        }
      });
    },
    setDefaultValue(param){
      // 银行默认信息
      this.server.queryBankDefault({compCode:this.ouCode}).then(response => {
        this.onBankChange(response)
      });
      // 付款信息默认信息
      this.server.queryPayinfoDefault({claimId:this.claimId}).then(response => {
        if(response){
          this.modelForm.configFileCode = response.configFileCode;
          this.modelForm.payTp = response.payTp;
          this.modelForm.tpCode = response.tpCode;
          this.modelForm.settleType = response.settleType;
          this.modelForm.remittanceSpeed = response.remittanceSpeed;
          this.modelForm.transfersType = response.transfersType;
          this.modelForm.fundPlan = response.fundPlan;
          this.modelForm.summary = response.summary;
          this.modelForm.purpose = response.purpose;
          if(this.payWay == "1"){
            this.modelForm.amount = response.transAmount;
          }else if(this.payWay == "3"){
            this.modelForm.amount = response.draftAmount;
          }else if(this.payWay == "5"){
            this.modelForm.amount = response.otherAmount;
          }
        }else{
          this.modelForm.configFileCode = "0";
          this.modelForm.payTp = "0";
          this.modelForm.tpCode = "F5-12";
          this.modelForm.settleType = "101";
          this.modelForm.remittanceSpeed = "加急";
          this.modelForm.transfersType = this.transfersTypeList[0].vsiKey;
          // this.modelForm.fundPlan = this.fundPlanList[0].vsiKey;
          this.modelForm.summary = "付款申请";
          this.modelForm.purpose = "付款申请";
        }
      });
    },
    responseToModelForm(response){
      this.modelForm.paymentMode = response.paymentMode;
      this.modelForm.ouCode = response.ouCode;
      this.modelForm.ouName = response.ouName;
      this.modelForm.accountName = response.accountName;
      this.modelForm.accountNo = response.accountNo;
      this.modelForm.configFileCode = response.configFileCode;
      this.modelForm.payTp = response.payTp;
      this.modelForm.tpCode = response.tpCode;
      this.modelForm.settleType = response.settleType;
      this.modelForm.remittanceSpeed = response.remittanceSpeed;
      this.modelForm.transfersType = response.transfersType;
      this.modelForm.fundPlan = response.fundPlan;
      this.modelForm.summary = response.summary;
      this.modelForm.purpose = response.purpose;
      this.modelForm.amount = response.amount;
    },
    handleSelectCom(data) {
      this.modelForm.ouName = data.bankName;
      this.modelForm.ouCode = data.buCode;
      this.modelForm.accountName = data.bankAccountName;
      this.modelForm.accountNo = data.bankAccountNum;
    },
    getDataSelectValue(data,obj){
      console.log(obj)
      console.log(data)
    }
  },
  watch:{

  },
  directives:{

  }
}
</script>
