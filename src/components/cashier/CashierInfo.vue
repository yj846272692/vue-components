<template>
  <div>
    <span  @click="showCashier">操作信息</span>
  </div>
</template>

<script>
import Cashier from "./Cashier.vue";

export default {
  name: "CashierInfo",
  components: { Cashier },
  data() {
    return {
      title: "选择本地出纳"
    };
  },
  props: {
    companyCode: {
      type: String,
      default() {
        return "";
      }
    },
    cashierParam: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    showCashier() {
      new this.$pageModal(Cashier, {
        props: {
          title: this.title,
          companyCode:this.companyCode,
          cashierParam:this.cashierParam
        },
        on: {
            "handleSelect":() => {
              this.$emit("handleSelect");
          }
        }
      });
    }
  }
};
</script>
