<template>

  <div class="close-div">
    <Input :size="size" ref="ipt" :value="value" @input="handleInput" icon="log-in" @click.native="showProjectTable" readonly></Input>
    <Icon type="close" class="close-btn" @click.native="clean" v-show="isShowCloseIcon"></Icon>
  </div>

</template>
<script>
/**
 * 选择项目，报账信息不同的功能使用主要区别在于对于项目是否有效、是否可以过账进行过滤
 * 例如员工借款、还款流程的项目是否有效--Y，是否允许过账--Y
 * 在付款申请中作为查询条件，项目是否有效--''，是否允许过账--Y
 */
import SelectProjectList from "./SelectProjectList";
export default {
  name: "SelectProject",
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
        return "请选择项目";
      }
    },

    // 是否有效 Y-有效，N-无效
    isValidity: {
      type: String,
      default() {
        return "Y";
      }
    },

    // 是否允许过账 Y-允许，N-不允许
    isPost: {
      type: String,
      default() {
        return "Y";
      }
    },

    value: {
      type: String,
      default() {
        return "";
      }
    },

    // 归属公司
    // todo ：除了0.6版本，其他版本都没有传入此参数
    companyCode: {
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
    handleInput(value) {
      this.$emit("input", value);
    },
    showProjectTable() {
      new this.$pageModal(
        SelectProjectList,
        {
          props: {
            title: this.title,
            isValidity: this.isValidity,
            isPost: this.isPost,
            companyCode: this.companyCode
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