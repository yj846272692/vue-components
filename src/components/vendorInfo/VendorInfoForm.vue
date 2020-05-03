<template>
    <div>
        <Form :model="modelForm" ref="payWayInfoForm"  :label-width="120">
            <Row :gutter="20" >
                <Col span="12" style="border:none;">
                <Form-item prop="bankAccount" label="收款方账号">
                    <SelectVendorBankInfo :value="modelForm.bankAccount" :buCode="buCode" @handleSelect="handleSelect"></SelectVendorBankInfo>
                </Form-item>
                </Col>
                <Col span="12" style="border:none;">
                <Form-item prop="accountName" label="收款方户名">
                    <Input placeholder="" v-model="modelForm.accountName" maxlength="50" readonly></Input>
                </Form-item>
                </Col>
            </Row>
            <Row :gutter="20" >
                <Col span="12" style="border:none;">
                <Form-item prop="vendorCode" label="供应商编码">
                    <Input placeholder="" v-model="modelForm.vendorCode" maxlength="50" readonly></Input>
                </Form-item>
                </Col>
                <Col span="12" style="border:none;">
                <Form-item prop="vendorName" label="供应商名称">
                    <Input placeholder="" v-model="modelForm.vendorName" maxlength="50" readonly></Input>
                </Form-item>
                </Col>
            </Row>
            <Row :gutter="20" >
                <Col span="12" style="border:none;">
                <Form-item prop="bankId" label="银行编码">
                    <Input placeholder="" v-model="modelForm.bankId" maxlength="50" readonly></Input>
                </Form-item>
                </Col>
                <Col span="12" style="border:none;">
                <Form-item prop="vendorSite " label="收款方地点">
                    <Input placeholder="" v-model="modelForm.vendorSite" maxlength="50" readonly></Input>
                </Form-item>
                </Col>
            </Row>
            <Row :gutter="20" >
                <Col span="12" style="border:none;">
                <Form-item prop="areaCode" label="收款方区域">
                    <Input placeholder="" v-model="modelForm.areaCode" maxlength="50" readonly></Input>
                </Form-item>
                </Col>
                <Col span="12" style="border:none;">
                <Form-item prop="todo8" label="是否启用委托付款">
                    <Select v-model="modelForm.todo8" disabled>
                        <Option value="1">是</Option>
                        <Option value="2">否</Option>
                    </Select>
                </Form-item>
                </Col>
            </Row>
            <Row :gutter="20" >
                <Col span="12" style="border:none;">
                <Form-item prop="cbankCode" label="人行行号">
                    <Input placeholder="" v-model="modelForm.cbankCode" maxlength="50" readonly></Input>
                </Form-item>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import Server from "./server";
import SelectVendorBankInfo from "../selectVendorBankInfo/SelectVendorBankInfo";
const server = new Server();
export default {
  name: "VendorInfoForm",
  components: {
    SelectVendorBankInfo
  },
  props: {
    paymentState: {
      type: String,
      default() {
        return "";
      }
    },
    buCode: {
      type: String,
      default() {
        return "";
      }
    },
    // 根据invoiceNo(发票编号)来请求接口获取供应商信息明细
    invoiceNo: {
      type: String,
      default() {
        return "";
      }
    },
    // 根据claimNo(付款申请单号)来请求接口获取供应商信息明细
    claimNo: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      server: server,
      isDisplay: true,
      modelForm: {
        bankAccount: "", // 收款方账号
        accountName: "", // 收款方户名
        vendorCode: "", // 供应商编号 ,
        vendorName: "", // 供应商名称 ,
        bankId: "", // 银行编码
        vendorSite: "", // 收款方地点
        areaCode: "", // 收款方区域
        todo8: "1", // 是否启用委托付款（此字段后端还在确认）
        cbankCode: "", // 人行行号

        invoiceNo: this.invoiceNo, // 发票编号
        claimNo: this.claimNo // 付款申请单号
      }
    };
  },
  computed: {},
  created: function() {
    // 查询供应商明细
    this.server
      .queryVendorInfo({
        invoiceNo: this.invoiceNo,
        claimNo: this.claimNo
      })
      .then(response => {
        //  bankAccount: "", // 收款方账号
        // accountName: "", // 收款方户名
        // vendorCode: "", // 供应商编号 ,
        // vendorName: "", // 供应商名称 ,
        // bankId: "", // 银行编码
        // vendorSite: "", // 收款方地点
        // areaCode: "", // 收款方区域
        // todo8: "1", // 是否启用委托付款
        // cbankCode: "", // 人行行号
        // this.modelForm = response.dataResult;
        this.modelForm = {
          bankAccount: response.bankAccount, // 收款方账号
          accountName: response.accountName, // 收款方户名
          vendorCode: response.vendorCode, // 供应商编号 ,
          vendorName: response.vendorName, // 供应商名称 ,
          bankId: response.bankId, // 银行编码
          vendorSite: response.vendorSite, // 收款方地点
          areaCode: response.areaCode, // 收款方区域
          todo8: "1", // 是否启用委托付款
          cbankCode: response.cbankCode, // 人行行号

          invoiceNo: this.invoiceNo, // 发票编号
          claimNo: this.claimNo // 付款申请单号
        };
      });
    this.$emit("SetTitle", "供应商信息");
    this.$emit("SetPageSize", 750);
    let buttons = [];
    if (this.paymentState == "prepareForPayment") {
      buttons.push({
        text: "保存",
        theme: "primary",
        handle: () => {
          this.save();
        }
      });
    }
    buttons.push({
      text: "关闭",
      theme: "primary",
      handle: () => {
        this.$emit("Close");
      }
    });
    this.$emit("SetPageActions", buttons);
  },
  beforeMount: function() {},
  mounted: function() {
    this.init();
  },
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    init() {},
    // 保存供应商明细
    save() {
      let postModelForm = {};
      postModelForm = {
        bankAccount: this.modelForm.bankAccount, //（此字段需要后端改为string类型，而且长度不够，需要扩大数据库此字段的长度）
        accountName: this.modelForm.accountName,
        vendorCode: this.modelForm.vendorCode,
        vendorName: this.modelForm.vendorName,
        bankId: this.modelForm.bankId, //（此字段需要后端改为string类型）
        vendorSite: this.modelForm.vendorSite,
        areaCode: this.modelForm.areaCode,
        cbankCode: this.modelForm.cbankCode,

        invoiceNo: this.invoiceNo, // 发票编号
        claimNo: this.claimNo // 付款申请单号
      };
      this.server.saveVendorInfo(postModelForm).then(response => {
        if (response.statusCode == "-1") {
          this.$Message.error("保存失败!");
          this.$emit("Close", this.modelForm);
        } else {
          this.$Message.success("保存成功");
          this.$emit("Close", this.modelForm);
        }
      });
    },
    handleSelect(data) {
      //  bankAccount: "", // 收款方账号
      // accountName: "", // 收款方户名
      // vendorCode: "", // 供应商编号 ,
      // vendorName: "", // 供应商名称 ,
      // bankId: "", // 银行编码
      // vendorSite: "", // 收款方地点
      // areaCode: "", // 收款方区域
      // todo8: "1", // 是否启用委托付款
      // cbankCode: "", // 人行行号
      this.modelForm = {
        bankAccount: data.vendorAccountNo, // 收款方账号
        accountName: data.vendorAccountName, // 收款方户名
        vendorCode: data.vendorCode, // 供应商编号 ,
        vendorName: data.vendorName, // 供应商名称 ,
        bankId: data.bkInfCode, // 银行编码
        vendorSite: data.vendorSiteName, // 收款方地点
        areaCode: data.areaCode, // 收款方区域
        todo8: "1", // 是否启用委托付款
        cbankCode: data.cbankCode, // 人行行号

        invoiceNo: this.invoiceNo, // 发票编号
        claimNo: this.claimNo // 付款申请单号
      };
    }
  },
  watch: {},
  directives: {}
};
</script>
