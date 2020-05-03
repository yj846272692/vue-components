<template>
  <div class="close-div">
    <Input :size="size" :value="value" :searchInputPlaceholder="searchInputPlaceholder" :title="title" :len="len" :isShowCheckbox="isShowCheckbox" :isMultiple="isMultiple" @input="handleInput" icon="log-in" @click.native="showEmployeeTree" readonly ref="ipt" />
    <Icon type="close" class="close-btn" @click.native="clean" v-show="isShowCloseIcon"></Icon>
  </div>
</template>
<script>
/**
 * 选择员工
 */
import OrgTree from "../orgTree/OrgTree";
export default {
  name: "SelectEmployee",
  components: {},
  props: {
    size: {
      type: String,
      default() {
        return "";
      }
    },
    //弹出框标题
    title: {
      type: String,
      default() {
        return "请选择";
      }
    },
    value: {
      type: String,
      default() {
        return "";
      }
    },
    // 搜索框默认显示字段
    searchInputPlaceholder: {
      type: String,
      default() {
        return "请输入";
      }
    },
    // 限制选择几个(用于可以多选但是限制选择个数)
    len: {
      type: [String, Number],
      default: 99999
    },
    // 是否显示checkbox
    isShowCheckbox: {
      type: Boolean,
      default: true
    },
    // 是否多选
    isMultiple: {
      type: Boolean,
      default: true
    },
    // 部门ID  如果有传入，则只能选择该部门下的员工
    departmentId: {
      type: String,
      default: ""
    },
    // 增加了一个接口用来查人，baseUrl / claimURL
    queryFrom: {
        type: String,
        default: "base"
    },
  },
  data() {
    return {
      isShowCloseIcon: false
    };
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
    showEmployeeTree() {
      new this.$pageModal(
        OrgTree,
        {
          props: {
            treeType: "employee",
            title: this.title,
            len: this.len,
            searchInputPlaceholder: this.searchInputPlaceholder,
            isShowCheckbox: this.isShowCheckbox,
            isMultiple: this.isMultiple,
            departmentId: this.departmentId,
            queryFrom: this.queryFrom
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