<template>
    <div>
        <Input v-if="!showEdit" :size="size" :value="value" @input="handleInput" icon="log-in" :compCode="compCode" @click.native="showPaymentCompanyTable" readonly></Input>
        <Input v-if="showEdit"  :size="size" :value="value" @input="handleInput"  :compCode="compCode" @click.native="showPaymentCompanyTable" readonly></Input>
    </div>
</template>
<script>
/**
 * 根据付款方公司信息查询银行信息组件
 */
import BankInfoList from "./PaymentCompanyList";
export default {
  name: "SelectRealPaymentCompany",
  components: {},
  props: {
    size: {
      type: String,
      default() {
        return "";
      }
    },
    title: {
      type: String,
      default() {
        return "请选择实际付款公司";
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: String,
      default() {
        return "";
      }
    },
    compCode: {
      type: String,
      default() {
        return "";
      }
    },
    compName: {
      type: String,
      default() {
        return "";
      }
    },
    showSave: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    showEdit() {
      if (this.showSave == 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  created: function() {},
  beforeMount: function() {},
  mounted: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    },
    showPaymentCompanyTable() {
      if (this.columns.length != 0) {
        new this.$pageModal(
          BankInfoList,
          {
            props: {
              title: this.title,
              compCode: this.compCode,
              columns: this.columns,
              compName:this.compName
            }
          },
          data => {
            if (data) {
              this.$emit("handleSelect", data);
            }
          }
        );
      } else {
        new this.$pageModal(
          BankInfoList,
          {
            props: {
              title: this.title,
              compCode: this.compCode
            }
          },
          data => {
            if (data) {
              this.$emit("handleSelect", data);
            }
          }
        );
      }
    }
  },
  watch: {},
  directives: {}
};
</script>
<style lang="less" scoped>
</style>