<template>
  <Select v-bind="$attrs" v-on="$listeners" :value="value" @input="handleInput" @on-open-change="handleQuery" ref="selcom">
    <Option v-for="item in dataList" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
</template>
<script>
/**
 * 选择归属公司--付款计划行查询
 */
import Server from "./server.js";
const server = new Server();
export default {
  name: "SelectCompany",
  components: {},
  props: {
    value: {
      type: String,
      default() {
        return "";
      }
    },
    flag: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      dataList: [],
      dataMap: {},
      server: server
    };
  },
  computed: {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {
    if (this.flag) {
      this.server.paymentQueryCompanys().then(response => {
        this.dataList = [];
        for (let item of response || []) {
          this.dataList.push({
            label: item.ouName,
            value: item.companyCode
          });
        }
      });
    } else {
      this.server.queryCompanys().then(response => {
        this.dataList = [];
        for (let item of response || []) {
          this.dataList.push({
            label: item.ouName,
            value: item.companyCode
          });
        }
      });
    }
  },
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    handleInput(value) {
      if (value !== undefined) {
        this.$emit("input", value);
      } else {
        this.$emit("input", "");
      }
    },
    loadFinish() {
      this.$emit("loadFinish", {
        valueList: this.dataList,
        valueMap: this.dataMap
      });
    },
    handleQuery(open) {
      if (this.value === "" && !open) {
        this.$refs["selcom"].clearSingleSelect();
      }
    }
  },
  watch: {
    dataList: function(newVal, oldVal) {
      this.dataMap = {};
      for (let item of this.dataList) {
        this.dataMap[item.value] = item.label;
      }
      this.loadFinish();
    }
  },
  directives: {}
};
</script>
<style lang="less" scoped>
</style>