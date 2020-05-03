<template>
  <div class="close-div">
    <Input :size="size" ref="ipt" :value="value" :paymentState="paymentState" :invoiceNo="invoiceNo" :claimNo="claimNo" :buCode="buCode" @input="handleInput" icon="log-in" @click.native="showvendorInfoForm" readonly></Input>
    <Icon type="close" class="close-btn" @click.native="clean" v-show="isShowCloseIcon"></Icon>
  </div>
</template>
<script>
/**
 *编辑供应商信息
 */
import VendorInfoForm from "./VendorInfoForm";
import Server from "./server.js";
const server = new Server();
export default {
  name: "VendorInfo",
  components: {
    VendorInfoForm
  },
  props: {
    size: {
      type: String,
      default() {
        return "";
      }
    },
    value: {
      type: String,
      default() {
        return "";
      }
    },
    // 根据付款状态值判断供应商信息能否保存
    paymentState: {
      type: String,
      default() {
        return "";
      }
    },
    // 根据buCode来请求接口获取供应商银行信息
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
    return { isShowCloseIcon: false };
  },
  computed: {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    // 清空选择按钮，点击后删除code和name
    clean() {
      this.$emit("cleanSelected");
      this.$emit("input", "");
      this.isShowCloseIcon = false;
      this.$refs["ipt"].focus();
    },
    showvendorInfoForm() {
      new this.$pageModal(
        VendorInfoForm,
        {
          props: {
            paymentState: this.paymentState,
            buCode: this.buCode,
            invoiceNo: this.invoiceNo,
            claimNo: this.claimNo
          }
        },
        data => {
          if (data.length != 0) {
            this.isShowCloseIcon = true;
            this.$emit("handleSelect", data);
            this.$refs["ipt"].focus();
          }
        }
      );
    }
  },
  watch: {},
  directives: {}
};
</script>
 <style lang='less' scoped>
.close-div {
  width: 100%;
  position: relative;
  display: inline-block;

  .close-btn {
    position: absolute;
    right: 30px;
    top: 50%;
    margin-top: -7px;
    font-size: 14px;
    color: #ff0000;
    display: none;
    cursor: pointer;
  }

  &:hover {
    .close-btn {
      display: inline-block;
    }
  }
}
</style>