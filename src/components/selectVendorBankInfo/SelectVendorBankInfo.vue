<template>
  <Input :size="size" :value="value" @input="handleInput" :buCode="buCode" icon="log-in" @click.native="showVendorBankTable" readonly></Input>
</template>
<script>
/**
 * 根据供应商名称查询供应商银行账号信息
 */
import BankInfoList from "./BankInfoList";
export default {
  name: "SelectVendorBankInfo",
  components: {},
  props: {
    size: {
      type: String,
      default() {
        return "";
      }
    },
    employeeNo: {
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
    title: {
      type: String,
      default() {
        return "请选择银行";
      }
    },
    value: {
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
    // EMPLOYEE--查询对私  VENDOR--查询对公 
    vendorType: {
      type: String,
      default() {
        return "";
      }
    },
    vendorName: {
      type: String,
      default() {
        return "";
      }
    },
  },
  data() {
    return {};
  },
  computed: {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    },
    showVendorBankTable() {
      new this.$pageModal(
        BankInfoList,
        {
          props: {
            title: this.title,
            buCode: this.buCode,
            vendorType: this.vendorType,
            vendorName: this.vendorName,
            companyCode: this.companyCode,
            employeeNo: this.employeeNo,
          }
        },
        data => {
          if (data) {
            this.$emit("handleSelect", data);
          }
        }
      );
    }
  },
  watch: {
    employeeNo: function(newVal, oldVal) {
      this.employeeNo = newVal;
    },
    companyCode: function(newVal, oldVal) {
      this.companyCode = newVal;
    },
  },
  directives: {}
};
</script>
<style lang="less" scoped>
</style>