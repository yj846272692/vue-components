<template>
  <div class="close-div">
    <Input v-bind="$attrs" ref="ipt" :value="strValue" v-on="$listeners" @input="handleInput" icon="log-in" @click.native="showBusinessTypeTree" readonly />
    <Icon type="close" class="close-btn" @click.native="clean" v-show="isShowCloseIcon"></Icon>
  </div>
</template>
<script>
/**
 * 选择业务大类
 */
import BusinessTypeTree from "./BusinessTypeTree";
export default {
  name: "SelectBusinessType",
  components: {},
  props: {
    isShowCheckbox: {
      // 是否显示复选框
      type: Boolean,
      default() {
        return true;
      }
    },
    isMultiple: {
      // 是否多选
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default() {
        return "";
      }
    },
    title: {
      type: String,
      default() {
        return "选择费用类别";
      }
    },
    len: {
      type: Number,
      default() {
        return 1;
      }
    }
  },
  data() {
    return { isShowCloseIcon: false };
  },
  computed: {
    strValue() {
      return "" + this.value;
    }
  },
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
    handleInput(value) {
      this.$emit("input", value);
    },
    showBusinessTypeTree() {
      new this.$pageModal(
        BusinessTypeTree,
        {
          props: {
            title: this.title,
            len: this.len,
            isShowCheckbox: this.isShowCheckbox,
            isMultiple: this.isMultiple
          }
        },
        data => {
          if (data) {
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