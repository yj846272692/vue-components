<template>
  <Button 
    v-bind="$attrs"
    v-on="$listeners" :ouCode="ouCode" :payRequestClaimNo="payRequestClaimNo" :showSave="showSave" :payType="payType" :payRequestLineIds="payRequestLineIds" @click="showPayWayInfoForm">{{buttonText}}</Button>
</template>
<script>
/**
 * 转账、票据、其它付款信息
 */
import PayWayInfoForm from './PayWayInfoForm'
import Server from './server.js'
const server = new Server();
export default {
  name: 'PayWayInfo',
  components: {
  },
  props: {
    // 转账--transfer;票据--bill;其它--other
    payType: {
      type: String,
      default() {
        return "transfer";
      }
    },

    buttonText: {
      type: String,
      default() {
        return "转账付款信息";
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
  data() {
    return {

    }
  },
  computed: {

  },
  created: function () {

  },
  beforeMount: function () {

  },
  mounted: function () {

  },
  beforeDestroy: function () {

  },
  destroyed: function () {

  },
  methods: {
    getPayWay() {
      if(this.payType == 'transfer') {
        return "1";
      }else if(this.payType == 'bill') {
        return "3";
      }else if(this.payType == 'other') {
        return "5";
      }
    },
    showPayWayInfoForm() {
      new this.$pageModal(
        PayWayInfoForm,
        {
          props: {
            title: this.buttonText,
            payWay: this.getPayWay(),
            payRequestLineIds: this.payRequestLineIds,
            ouCode: this.ouCode,
            claimId: this.claimId,
            showSave: this.showSave,
          }
        }, (data) => {
          if(data) {
            this.$emit("handleClick", data);
          }
        }
      );
    },
  },
  watch: {

  },
  directives: {

  }
}
</script>
<style lang="less" scoped>
</style>