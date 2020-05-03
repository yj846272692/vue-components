<!-- 
  NumberRange 数字区间 
  v-model: 返回值{start: x, end: x} 
  事件   ： @input 接收返回值{start: x, end: x}
  属性   ： 查看 InputNumber 组件
-->
<template>
  <div class="number-range">
    <InputNumber v-model="startNum" v-bind="$attrs" @on-blur="handle"></InputNumber>
    <span>—</span>
    <InputNumber v-model="endNum" v-bind="$attrs" @on-blur="handle"></InputNumber>
  </div>
</template>

<script>
export default {
  name: 'NumberRange',

  components: {},

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    value: {
      type: Object
    },
    start: {
      type: String,
      default: ""
    },
    end: {
      type: String,
      default: ""
    },
    // 如果是小数，保留多少位
    tofixed: {
      type: Number,
      default: 2
    }
  },

  data () {
    return {
      startNum: this.start,
      endNum: this.end
    }
  },

  computed: {

  },

  watch: {
    value(newVal, oldVal){
      if (newVal === "") {
        this.clear()
      }
    }
  },

  created() {

  },

  mounted() {

  },

  methods: {
    tofixedNum(num) {
      if(!Number.isInteger(Number(num)) && String(num).split(".")[1].length > this.tofixed) {
        let s = String(num)
        return Number(s.substring(0,s.indexOf(".") + this.tofixed+1))
      } else {
        return num
      }
    },

    output() {
      this.$emit("input", {start: this.startNum, end: this.endNum})
    },

    handle() {
      if(this.endNum !== "" && this.startNum > this.endNum) {
        this.endNum = this.startNum
      }
      this.startNum = this.tofixedNum(this.startNum)
      this.endNum = this.tofixedNum(this.endNum)
      this.output()
    },

    clear() {
      this.startNum = ""
      this.endNum = ""
      this.output()
    }
  }
}
</script>

<style lang='less' scoped>
.number-range{
  display: inline-block;
}
</style>
<style lang='less'>
.number-range{
  .ivu-input-number-handler-wrap{
    display: none;
  }
}
</style>
