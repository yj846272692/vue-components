<template>
  <Input :size="size" :value="value" :disabled="disabledFlag" @input="handleInput" :buCode="buCode" icon="log-in" @click.native="showVendorBankTable" readonly></Input>
</template>
<script>
/**
 * 根据供应商名称查询供应商银行账号信息
 */
import PayInfoForm from "./PayInfoForm";
export default {
  name: "PayInfo",
  components: { PayInfoForm },
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
        return "付款信息";
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
    payRequestLineId: {
      type: Number,
      default() {
        return "";
      }
    },
    payLineId: {
      type: Number,
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
    disabledFlag: {
      type: Boolean,
      default() {
        return false;
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
      if (this.disabledFlag) {
        return;
      } else {
        new this.$pageModal(
          PayInfoForm,
          {
            props: {
              title: this.title,
              payRequestLineId: this.payRequestLineId,
              showAmount: this.showAmount,
              applyAmount: this.applyAmount,
              payLineId: this.payLineId,
              compName:this.compName,
              companyCode:this.companyCode,
              initFun:this.initFun
            },
            on:{
              "save":()=>{
                this.$emit("save");
              },
              "delete":()=>{
                this.$emit("delete");
              }
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