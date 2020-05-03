<template>
  <div>
    <div class="pay-table">
      <Form  :model="tableData">
        <Table :data="tableData" :columns="columns" @on-selection-change="onSelectChange" border stripe></Table>
      </Form>
    </div>
  </div>
</template>
<script>
import SelectRealPaymentCompany from "../selectRealPaymentCompany/SelectRealPaymentCompany.vue";
import SelectVendorBankInfo from "../selectVendorBankInfo/SelectVendorBankInfo.vue";
import DataSelect from "../dataSelect/DataSelect.vue";
import accounting from "accounting";
import Server from "./server.js";

let server = new Server();
let vm;
export default {
  name: "PayInfoForm",
  components: {
    SelectRealPaymentCompany: SelectRealPaymentCompany,
    SelectVendorBankInfo,
    DataSelect
  },
  data() {
    return {
      disabledFlag: false,
      buttons: [],
      text: "",
      selections: [],
      showAdd: false,
      server: server,
      tableData: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          type: "index",
          title: "序号",
          width: 70,
          align: "center"
        },
        {
          align: "center",
          width: 200,
          key: "paymentMode",
          renderHeader: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "asterisk",
                  color: "red",
                  size: "5px"
                },
                style: {
                  marginRight: "5px"
                }
              }),
              h("strong", "付款方式")
            ]);
          },
          render: (h, params) => {
            return h(DataSelect, {
              props: {
                value: params.row.paymentMode,
                code: "PAYMENT_MODE",
              },
              attrs: {
                transfer: true,
                disabled: vm.disabledFlag
              },
              style: {
                width: "160px"
              },
              on: {
                "on-change": data => {
                  this.tableData[params.index].paymentMode = data;
                }
              }
            });
          }
        },
        {
          title: "实际付款公司",
          align: "center",
          width: 200,
          renderHeader: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "asterisk",
                  color: "red",
                  size: "5px"
                },
                style: {
                  marginRight: "5px"
                }
              }),
              h("strong", "实际付款公司")
            ]);
          },
          render: (h, params) => {
            if (params.row.prepareStatus == "1") {
              return h("strong", "实际付款公司");
            } else {
              return h(SelectRealPaymentCompany, {
                props: {
                  title: "付款银行账号列表",
                  value: vm.tableData[params.index].ouName,
                  columns: [
                    {
                      type: "selection",
                      width: 55,
                      // fixed: 'left',
                      align: "center"
                    },
                    {
                      title: "实际付款公司名称",
                      key: "compName",
                      width: 160,
                      align: "center",
                      // sortable: "custom",
                      render: (h, params) => {
                        return h(
                          "div",
                          {
                            attrs: {
                              class: "ivu-table-cell ivu-table-cell-ellipsis",
                              title: params.row.compName
                            }
                          },
                          params.row.compName
                        );
                      }
                    },
                    {
                      title: "银行名称",
                      key: "bankName",
                      align: "center",
                      // sortable: "custom",
                      width: 140,
                      render: (h, params) => {
                        return h(
                          "div",
                          {
                            attrs: {
                              class: "ivu-table-cell ivu-table-cell-ellipsis",
                              title: params.row.bankName
                            }
                          },
                          params.row.bankName
                        );
                      }
                    },
                    {
                      title: "银行账户名",
                      align: "center",
                      key: "bankAccountName",
                      width: 170,
                      render: (h, params) => {
                        return h(
                          "div",
                          {
                            attrs: {
                              class: "ivu-table-cell ivu-table-cell-ellipsis",
                              title: params.row.bankAccountName
                            }
                          },
                          params.row.bankAccountName
                        );
                      }
                    },
                    {
                      title: "银行账号",
                      align: "center",
                      key: "bankAccountNum",
                      minWidth: 140,
                      render: (h, params) => {
                        return h(
                          "div",
                          {
                            attrs: {
                              class: "ivu-table-cell ivu-table-cell-ellipsis",
                              title: params.row.bankAccountNum
                            }
                          },
                          params.row.bankAccountNum
                        );
                      }
                    }
                  ],
                  compName: vm.compName,
                  compCode: vm.companyCode
                },
                on: {
                  handleSelect: d => {
                    vm.tableData[params.index].ouName = d.compName;
                    vm.tableData[params.index].accountName = d.bankAccountName;
                    vm.tableData[params.index].accountNo = d.bankAccountNum;
                    vm.tableData[params.index].ouCode = d.compCode;
                    // vm.tableData[params.index].payWay = d.payMode
                  }
                }
              });
            }
          }
        },
        {
          title: "银行账户名称",
          align: "center",
          width: 200,
          key: "accountName",
          renderHeader: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "asterisk",
                  color: "red",
                  size: "5px"
                },
                style: {
                  marginRight: "5px"
                }
              }),
              h("strong", "银行账户名称")
            ]);
          }
        },
        {
          title: "银行账号",
          align: "center",
          width: 200,
          key: "accountNo",
          renderHeader: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "asterisk",
                  color: "red",
                  size: "5px"
                },
                style: {
                  marginRight: "5px"
                }
              }),
              h("strong", "银行账号")
            ]);
          }
        },
        {
          title: "金额",
          align: "center",
          width: 140,
          key: "amount",
          renderHeader: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "asterisk",
                  color: "red",
                  size: "5px"
                },
                style: {
                  marginRight: "5px"
                }
              }),
              h("strong", "金额")
            ]);
          },
          render: (h, params) => {
            let flag = false;
            if (vm.payLineId != "") {
              flag = true;
            } else {
              flag = false;
            }
            return h(
              "Input",
              {
                props: {
                  value: vm.tableData[params.index].amount,
                  disabled: flag
                },
                on: {
                  "on-blur": event => {
                    vm.tableData[params.index].amount = event.target.value;
                    if (event.target.value === "") {
                      vm.$Message.info("不能为空");
                      vm.tableData[params.index].amount = params.row.amount;
                      return;
                    }
                    if (!/^\-?(\d+|\d+\.\d{1,2})$/.test(event.target.value)) {
                      vm.$Message.info("必须为数字");
                      vm.tableData[params.index].amount = params.row.amount;
                      return;
                    }
                    if (event.target.value < 0) {
                      vm.$Message.info("金额必须大于等于0");
                      vm.tableData[params.index].amount = params.row.amount;
                      return;
                    }
                    if (vm.applyAmount - vm.money < 0) {
                      vm.$Message.info("已拆分金额必须小于等于申请金额");
                      vm.tableData[params.index].amount = params.row.amount;
                      return;
                    }
                    vm.buttons = [];
                    vm.text =
                      "申请总金额：" +
                      `${accounting.formatNumber(vm.applyAmount, 2)}` +
                      // vm.applyAmount +
                      ";已拆分金额：" +
                      `${accounting.formatNumber(vm.money, 2)}` +
                      // vm.money +
                      ";待拆分金额：" +
                      `${accounting.formatNumber(
                        vm.applyAmount - vm.money,
                        2
                      )}`;
                    // (vm.applyAmount - vm.money);
                    vm.changeButtons(vm.text);
                  }
                }
              },
              "是"
            );
          }
        },
        {
          title: "资金计划",
          align: "center",
          width: 200,
          key: "fundPlan",
          renderHeader: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "asterisk",
                  color: "red",
                  size: "5px"
                },
                style: {
                  marginRight: "5px"
                }
              }),
              h("strong", "资金计划")
            ]);
          },
          render: (h, params) => {
            return h(DataSelect, {
              props: {
                value: params.row.fundPlan,
                code: "capitalPlan",
              },
              attrs: {
                transfer: true,
                disabled: vm.disabledFlag
              },
              style: {
                width: "170px"
              },
              on: {
                input: data => {
                  vm.tableData[params.index].fundPlan = data;
                }
              }
            });
          }
        },
        {
          title: "汇款速度",
          align: "center",
          width: 110,
          key: "remittanceSpeed",
          render: (h, params) => {
            return h(DataSelect, {
              props: {
                value: params.row.remittanceSpeed,
                code: "remittanceSpeed",
              },
              attrs: {
                transfer: true,
                disabled: vm.disabledFlag
              },
              style: {
                width: "90px"
              },
              on: {
                input: data => {
                  vm.tableData[params.index].remittanceSpeed = data;
                }
              }
            });
          }
        },
        {
          title: "摘要",
          align: "center",
          width: 170,
          key: "summary",
          renderHeader: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "asterisk",
                  color: "red",
                  size: "5px"
                },
                style: {
                  marginRight: "5px"
                }
              }),
              h("strong", "摘要")
            ]);
          },
          render: (h, params) => {
            return h("Input", {
              props: {
                value: vm.tableData[params.index].summary,
                disabled: vm.disabledFlag,
                maxlength: 7,
                placeholder: "最多只能输入七个字符"
              },
              on: {
                "on-blur": event => {
                  vm.tableData[params.index].summary = event.target.value;
                }
              },
              attrs: {
                placeholder: "摘要"
              }
            });
          }
        },
        {
          title: "用途",
          align: "center",
          width: 170,
          key: "purpose",
          renderHeader: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "asterisk",
                  color: "red",
                  size: "5px"
                },
                style: {
                  marginRight: "5px"
                }
              }),
              h("strong", "用途")
            ]);
          },
          render: (h, params) => {
            return h("Input", {
              props: {
                value: vm.tableData[params.index].purpose,
                maxlength: 7,
                disabled: vm.disabledFlag,
                placeholder: "最多只能输入七个字符"
              },
              on: {
                "on-blur": event => {
                  vm.tableData[params.index].purpose = event.target.value;
                }
              },
              attrs: {
                placeholder: "用途",
                
              }
            });
          }
        },
        {
          title: "数据处理配置文件",
          align: "center",
          width: 150,
          key: "configFileCode",
          renderHeader: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "asterisk",
                  color: "red",
                  size: "5px"
                },
                style: {
                  marginRight: "5px"
                }
              }),
              h("strong", "数据处理配置文件")
            ]);
          },
          render: (h, params) => {
            return h(DataSelect, {
              props: {
                value: params.row.configFileCode,
                code: "configFileCode",
              },
              attrs: {
                transfer: true,
                disabled: vm.disabledFlag
              },
              style: {
                width: "120px"
              },
              on: {
                input: data => {
                  vm.tableData[params.index].configFileCode = data;
                }
              }
            });
          }
        },
        {
          title: "付款单据",
          align: "center",
          width: 150,
          key: "payTp",
          render: (h, params) => {
            return h(DataSelect, {
              props: {
                value: params.row.payTp,
                code: "payTp",
              },
              attrs: {
                transfer: true,
                disabled: vm.disabledFlag
              },
              style: {
                width: "120px"
              },
              on: {
                input: data => {
                  vm.tableData[params.index].payTp = data;
                }
              }
            });
          }
        },
        {
          title: "单据类型",
          align: "center",
          width: 180,
          key: "tpCode",
          render: (h, params) => {
            return h(DataSelect, {
              props: {
                value: params.row.tpCode,
                code: "tpCode"
              },
              attrs: {
                transfer: true,
                disabled: vm.disabledFlag
              },
              style: {
                width: "150px"
              },
              on: {
                input: data => {
                  vm.tableData[params.index].tpCode = data;
                }
              }
            });
          }
        },
        {
          title: "结算方式",
          align: "center",
          width: 140,
          key: "settleType",
          render: (h, params) => {
            return h(DataSelect, {
              props: {
                value: params.row.settleType,
                code: "settleType"
              },
              attrs: {
                transfer: true,
                disabled: vm.disabledFlag
              },
              style: {
                width: "110px"
              },
              on: {
                input: data => {
                  vm.tableData[params.index].settleType = data;
                }
              }
            });
          }
        },
        {
          title: "转账类型",
          align: "center",
          width: 140,
          key: "transfersType",
          render: (h, params) => {
            return h(DataSelect, {
              props: {
                value: params.row.transfersType,
                code: "transfersType"
              },
              attrs: {
                transfer: true,
                disabled: vm.disabledFlag
              },
              style: {
                width: "110px"
              },
              on: {
                input: data => {
                  vm.tableData[params.index].transfersType = data;
                }
              }
            });
          }
        }
      ]
    };
  },
  computed: {
    money: function() {
      let self = this;
      let useMoney = 0;
      for (let i = 0; i < self.tableData.length; i++) {
        useMoney += parseFloat(self.tableData[i].amount);
      }
      return useMoney;
    }
  },
  watch: {
    tableData(newVal, oldVal) {
      let self = this;
      self.money = 0;
      for (let i = 0; i < newVal.length; i++) {
        self.money += parseFloat(newVal[i].amount);
      }
      vm.buttons = [];
      vm.text =
        "申请总金额：" +
        `${accounting.formatNumber(vm.applyAmount, 2)}` +
        // vm.applyAmount +
        ";已拆分金额：" +
        `${accounting.formatNumber(vm.money, 2)}` +
        // vm.money +
        ";待拆分金额：" +
        `${accounting.formatNumber(vm.applyAmount - vm.money, 2)}`;
      // (vm.applyAmount - vm.money);
      vm.changeButtons(vm.text);
    }
  },
  props: {
    title: {
      type: String,
      default() {
        return "付款信息";
      }
    },
    payRequestLineId: {
      type: String,
      default() {
        return "";
      }
    },
    payLineId: {
      type: String,
      default() {
        return "";
      }
    },
    showAmount: {
      type: Boolean,
      default() {
        return false;
      }
    },
    applyAmount: {
      type: Number,
      default() {
        return 0;
      }
    },
    compName: {
      type: String,
      default() {
        return "";
      }
    },
    companyCode: {
      type: String,
      default() {
        return "";
      }
    },
    initFun: {
      type: Function,
      default() {
        return function(){};
      }
    },
  },
  created: function() {
    vm = this;
    this.$emit("SetTitle", this.title);
  },
  mounted: function() {
    this.$emit("SetPageSize", window.innerWidth * 0.6);
    if (this.payLineId != "") {
      this.disabledFlag = true;
      this.showAdd = false;
      this.server
        .queryCreatePaymentInfo({ payLineId: parseInt(this.payLineId) })
        .then(response => {
          if (response.statusCode == "-1") {
            this.$Message.error(response.msg);
          } else {
            for(let i=0;i<response.length;i++){
              if(response[i].prepareStatus == "1"){
                response[i]._disabled=true;
              }
            }
            this.tableData = response;
            vm.buttons=[];
            vm.text =
              "申请行总金额：" +
              this.applyAmount +
              ";已拆分金额：" +
              this.money +
              ";待拆分金额：" +
              (this.applyAmount - this.money);
            this.changeButtons(vm.text);
          }
        });
    } else {
      this.showAdd = true;
      this.server
        .queryPaymentInfo({ payRequestLineId: this.payRequestLineId })
        .then(response => {
          if (response.statusCode == "-1") {
            this.$Message.error(response.msg);
          } else {
            this.tableData = response;
            vm.buttons=[];
            vm.text =
              "申请行总金额：" +
              this.applyAmount +
              ";已拆分金额：" +
              this.money +
              ";待拆分金额：" +
              (this.applyAmount - this.money);
            this.changeButtons(vm.text);
          }
        });
    }
  },
  methods: {
    onSelectChange(d) {
      this.selections = d;
      if (d.length == 0) {
        this.money = "";
        return;
      }
    },
    deletePaymentInfo() {
      if (this.selections.length == 0) {
        this.$Message.info("至少勾选一条付款信息");
      } else {
        let ids = "";
        let deleteData = this.tableData;
        for (let m = this.selections.length - 1; m >= 0; m--) {
          if (this.selections[m].payRequestLinePayInfoId != undefined) {
            if (ids.length == 0) {
              ids = this.selections[m].payRequestLinePayInfoId;
            } else {
              ids += "," + this.selections[m].payRequestLinePayInfoId;
            }
          } else {
            for (let i = this.selections.length - 1; i >= 0; i--) {
              for (let j = 0; j < deleteData.length; j++) {
                if (this.selections[i].payRequestLinePayInfoId != undefined) {
                } else {
                  if (this.selections[i].random == deleteData[j].random) {
                    this.$nextTick(() => {
                      deleteData.splice(j, 1);
                      this.tableData = deleteData;
                      this.selections.splice(i, 1);
                    });
                  }
                }
              }
            }
          }
        }
        if (ids != "") {
          let self = this;
          self.server.deletePaymentInfo(ids).then(response => {
            if (response.statusCode == "-1") {
              self.$Message.error(response.msg);
            } else {
              for (let n = self.selections.length - 1; n >= 0; n--) {
                for (let k = 0; k < self.tableData.length; k++) {
                  if (
                    self.selections[n].payRequestLinePayInfoId ==
                    self.tableData[k].payRequestLinePayInfoId
                  ) {
                    this.$nextTick(() => {
                      deleteData.splice(k, 1);
                      this.tableData = deleteData;
                      this.selections.splice(n, 1);
                    });
                    // self.tableData.splice(k, 1);
                    // vm.tableData=self.tableData;
                    // self.selections.splice(n, 1);
                  }
                }
              }
              self.$Message.success("删除成功");
              this.$emit("delete");
            }
          });
        }
      }
    },
    savePaymentInfo() {
      //首先校验金额是否拆分完成
      if (this.applyAmount > this.money) {
        this.$Message.info("金额未拆分完成不能保存");
      } else {
        //先校验金额
        for (let i = 0; i < this.tableData.length; i++) {
          if (
            this.tableData[i].amount === "" ||
            this.tableData[i].amount == null
          ) {
            this.$Message.info("保存金额不能为空");
            return;
          }
          if (
            this.tableData[i].paymentMode == "" ||
            this.tableData[i].paymentMode == null
          ) {
            this.$Message.info("付款方式不能为空");
            return;
          }
          if (
            this.tableData[i].ouName == "" ||
            this.tableData[i].ouName == null
          ) {
            this.$Message.info("实际付款公司不能为空");
            return;
          }
          if (
            this.tableData[i].accountName == "" ||
            this.tableData[i].accountName == null
          ) {
            this.$Message.info("银行账户名称不能为空");
            return;
          }
          if (
            this.tableData[i].accountNo == "" ||
            this.tableData[i].accountNo == null
          ) {
            this.$Message.info("银行账号不能为空");
            return;
          }
          if (
            this.tableData[i].fundPlan == "" ||
            this.tableData[i].fundPlan == null
          ) {
            this.$Message.info("资金计划不能为空");
            return;
          }
          if (
            this.tableData[i].summary == "" ||
            this.tableData[i].summary == null
          ) {
            this.$Message.info("摘要不能为空");
            return;
          }
          if (
            this.tableData[i].purpose == "" ||
            this.tableData[i].purpose == null
          ) {
            this.$Message.info("用途不能为空");
            return;
          }
          if (
            this.tableData[i].configFileCode == "" ||
            this.tableData[i].configFileCode == null
          ) {
            this.$Message.info("数据处理配置文件不能为空");
            return;
          }
        }
       
        if (this.payLineId != "") {
          vm.buttons=[];
          vm.buttons.push({
            text: "保存",
            theme: "primary",
            icon: "ios-checkmark-outline",
            loading:true,
            handle: () => {
              vm.savePaymentInfo();
            }
          });
          vm.buttons.push({
            text: vm.text,
            theme: "text",
            handle: () => {}
          });
          vm.$emit("SetPageActions", vm.buttons);
          if(this.selections.length == 0){
            this.$Message.info("请至少勾选一条付款信息");
          }else{
            this.server
            .saveCreatePaymentInfo({
              payLineId: parseInt(this.payLineId),
              payLinePayInfoList: this.selections
            })
            .then(response => {
              vm.buttons=[];
              vm.buttons.push({
                text: "保存",
                theme: "primary",
                icon: "ios-checkmark-outline",
                loading:false,
                handle: () => {
                  vm.savePaymentInfo();
                }
              });
              vm.buttons.push({
                text: vm.text,
                theme: "text",
                handle: () => {}
              });
              vm.$emit("SetPageActions", vm.buttons);
              if (response.statusCode == "-1") {
                this.$Message.error(response.msg);
              } else {
                this.$Message.success("保存成功");
                this.$emit("save");
                this.$emit("Close");
              }
            });
          }
          
        } else {
            vm.buttons=[];
            vm.buttons.push({
              text: "保存",
              theme: "primary",
              icon: "ios-checkmark-outline",
              loading:true,
              handle: () => {
                vm.savePaymentInfo();
              }
            });
            vm.buttons.push({
              text: "新增",
              theme: "primary",
              icon: "ios-plus-outline",
              handle: () => {
                vm.addPaymentInfo();
              }
            });
            vm.buttons.push({
              text: "删除",
              theme: "primary",
              icon: "ios-minus-outline",
              loading:true,
              handle: () => {
                vm.deletePaymentInfo();
              }
            });
            vm.buttons.push({
              text: vm.text,
              theme: "text",
              handle: () => {}
            });
          vm.$emit("SetPageActions", vm.buttons);
          this.server.savePaymentInfo(this.tableData).then(response => {
            vm.buttons=[];
            vm.buttons.push({
              text: "保存",
              theme: "primary",
              icon: "ios-checkmark-outline",
              loading:false,
              handle: () => {
                vm.savePaymentInfo();
              }
            });
            vm.buttons.push({
              text: "新增",
              theme: "primary",
              icon: "ios-plus-outline",
              handle: () => {
                vm.addPaymentInfo();
              }
            });
            vm.buttons.push({
              text: "删除",
              theme: "primary",
              loading:false,
              icon: "ios-minus-outline",
              handle: () => {
                vm.deletePaymentInfo();
              }
            });
            vm.buttons.push({
              text: vm.text,
              theme: "text",
              handle: () => {}
            });
            if (response.statusCode == "-1") {
              this.$Message.error(response.msg);
            } else {
              this.$Message.success("保存成功");
              this.initFun();
              this.$emit("save");
              this.$emit("Close");
            }
          });
        }
      }
    },
    changeButtons(text) {
      if (vm.payLineId != "") {
        vm.buttons.push({
          text: "保存",
          theme: "primary",
          icon: "ios-checkmark-outline",
          loading:false,
          handle: () => {
            vm.savePaymentInfo();
          }
        });
        vm.buttons.push({
          text: text,
          theme: "text",
          handle: () => {}
        });
      } else {
        vm.buttons.push({
          text: "保存",
          theme: "primary",
          icon: "ios-checkmark-outline",
          loading:false,
          handle: () => {
            vm.savePaymentInfo();
          }
        });
        vm.buttons.push({
          text: "新增",
          theme: "primary",
          icon: "ios-plus-outline",
          handle: () => {
            vm.addPaymentInfo();
          }
        });
        vm.buttons.push({
          text: "删除",
          theme: "primary",
          icon: "ios-minus-outline",
          handle: () => {
            vm.deletePaymentInfo();
          }
        });
        vm.buttons.push({
          text: text,
          theme: "text",
          handle: () => {}
        });
      }
      vm.$emit("SetPageActions", vm.buttons);
    },
    addPaymentInfo() {
      this.tableData.push({
        random: Math.random(),
        payRequestLineId: this.payRequestLineId,
        addFlag: true,
        paymentMode: "",
        ouName: "",
        accountName: "",
        accountNo: "",
        amount: 0,
        fundPlan: "",
        remittanceSpeed: "",
        summary: "",
        purpose: "",
        configFileCode: "",
        payTp: "",
        tpCode: "",
        settleType: "",
        transfersType: ""
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
