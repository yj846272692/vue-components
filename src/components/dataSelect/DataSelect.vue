<template>
  <Select ref="select" v-bind="$attrs" :value="strValue" v-on="$listeners" :parentVal="parentVal" :code="code" @input="handleInput">
    <Option v-for="item in dataList" :value="item.value" :key="item.value+item.label">{{ item.label }}</Option>
  </Select>
</template>
<script>
/**
 * 反显值集信息下拉框组件  
 * 该组件需要返回数据严格为：[{label: 'xxx', value: 'xxx'}]格式
 * 其它props和event请参考iview select组件
 */
import Server from "./server.js";
import miment from "miment";
const server = new Server();
export default {
  name: "DataSelect",
  components: {},
  props: {
    value: {
      type: String,
      default() {
        return "";
      }
    },
    datas: {
      type: Array,
      default() {
        return [];
      }
    },
    // 值集code
    code: {
      type: String,
      default() {
        return "";
      }
    },
    // 父值集value
    parentVal: {
      type: String,
      default() {
        return "";
      }
    },
  },
  data() {
    return {
      server: server,
      dataList: [],
      dataMap: {},
    };
  },
  computed: {
    strValue() {
      return ''+this.value;
    }
  },
  created: function() {
    if(!sessionStorage.getItem('valueSet')) {
      sessionStorage.setItem('valueSet', JSON.stringify({}));
    }
  },
  beforeMount: function() {},
  mounted: function() {
    this.loadData();
  },
  beforeDestroy: function() {

  },
  destroyed: function() {
    
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
      this.$emit("dataSelectChange", value,this.dataMap[value]);
    },
    loadData() {
      let valueSet = JSON.parse(sessionStorage.getItem('valueSet'));
      if (!this.code) {
        this.dataList = this.datas;
      }else if(this.parentVal && this.code) {
        if(valueSet[this.parentVal+'$'+this.code]) {
          this.dataList = valueSet[this.parentVal+'$'+this.code];
          return;
        }
        this.server.queryValueSetByCodeAndParentKey({
          parentKey: this.parentVal,
          code: this.code,
        }).then((response) => {
          if(response.statusCode != '-1') {
            this.dataList = response;
          }else {
            this.$Message.error('查询值集失败');
          }
        })
      }else if(!this.parentVal && this.code) {
        if(valueSet[this.parentVal+'$'+this.code]) {
          this.dataList = valueSet[this.parentVal+'$'+this.code];
          return;
        }
        this.server.queryValueSetByCode({
          code: this.code,
        }).then((response) => {
          if(response.statusCode != '-1') {
            this.dataList = response;
          }else {
            this.$Message.error('查询值集失败');
          }
        })
      }
    },
    loadFinish() {
      let valueSet = JSON.parse(sessionStorage.getItem('valueSet'));
      this.$emit('loadFinish', {
        valueList: this.dataList,
        valueMap: this.dataMap,
      });
      if(this.dataList && this.dataList.length > 0) {
        valueSet[this.parentVal+'$'+this.code] = this.dataList;
        sessionStorage.setItem('valueSet', JSON.stringify(valueSet));
      }
    }
  },
  watch: {
    datas: function(newVal, oldVal) {
      this.dataList = newVal;
    },
    dataList: function(newVal, oldVal) {
      this.dataMap = {};
      for(let item of this.dataList) {
        this.dataMap[item.value] = item.label;
      }
      this.loadFinish();
    },
    parentVal: function(newVal, oldVal) {
      this.$refs.select.clearSingleSelect();
      this.loadData();
    },
  },
  directives: {}
};
</script>
