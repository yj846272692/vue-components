<template>
  <Input :size="size" :value="val" @input="handleInput" :buCode="buCode" icon="log-in" @click.native="showVendorBankTable" readonly></Input>
</template>
<script>
import CityList from "./CityList";
export default {
  name: "SelectCity",
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
        return "请选择银行";
      }
    },
    value: {
      type: String,
      default() {
        return "";
      }
    },
  },
  data() {
    return {
      val : this.value
    };
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
        CityList,
        {
          props: {
            title: this.title,
          }
        },
        data => {
          if (data) {
            this.$emit("handleSelect", data);
            this.val = data.areaName;
          }
        }
      );
    }
  },
  watch: {},
  directives: {}
};
</script>
<style lang="less" scoped>
</style>