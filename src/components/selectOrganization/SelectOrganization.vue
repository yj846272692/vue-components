<template>
  <div class="close-div">
    <Input :size="size" :value="value" :searchInputPlaceholder="searchInputPlaceholder" :title="title" :len="len" :isShowCheckbox="isShowCheckbox" :isMultiple="isMultiple" @input="handleInput" icon="log-in" @click.native="showOrganizationTree" ref="ipt" readonly></Input>
    <Icon type="close" class="close-btn" @click.native="clean" v-show="isShowCloseIcon"></Icon>
  </div>
</template>
<script>
/**
 * 选择组织机构(部门)
 */
import OrgTree from "../orgTree/OrgTree";
export default {
  name: "SelectOrganization",
  components: {
    OrgTree
  },
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
      default: false
    },
    // 是否多选
    isMultiple: {
      type: Boolean,
      default: false
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
    showOrganizationTree() {
      new this.$pageModal(
        OrgTree,
        {
          props: {
            treeType: "department",
            title: this.title,
            len: this.len,
            searchInputPlaceholder: this.searchInputPlaceholder,
            isShowCheckbox: this.isShowCheckbox,
            isMultiple: this.isMultiple
          }
        },
        data => {
          if (data.length != 0) {
            this.isShowCloseIcon = true;
            this.$emit("handleSelect", data); // 旧的返回值事件 保留着吧
            this.$emit("selected", this.selectesRecombine(data)); // 新增加一个返回的事件
            this.$refs["ipt"].focus();
          }
        }
      );
    },
    selectesRecombine(data){
      const selectes = {
        names: [],
        ids: [],
        obj: []
      }
      const findSubs = (ditem) => {
        ditem.map(item => {
          if(item.children && item.children.length>0){
            findSubs(item.children)
          }else{
            if(selectes.ids.indexOf(item.id) === -1) {
              selectes.names.push(item.title)
              selectes.ids.push(item.id)
              selectes.obj.push(item)
            }
          }
        })
      }

      findSubs(data)
      return selectes
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