
<template>
  <div @keydown.enter="orgSearch">
    <Input v-model="formSearch.searchVal" :placeholder="searchInputPlaceholder">
    <Button slot="append" icon="ios-search" @click="orgSearch()"></Button>
    </Input>
    <Tree :data="treeData" @on-check-change="checkChange" @on-select-change="checkChange" :show-checkbox="isShowCheckbox" :multiple="isMultiple" ref="treeData"></Tree>
    <Spin fix v-show="isShowLoading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>正在加载...</div>
    </Spin>
  </div>
</template>
<style lang="less" scoped>
.ivu-tree ul li {
  height: 24px;
  line-height: 24px;
}
</style>
<script>
/**
 * 业务大类(费用类别)树组件
 */
import Server from "./server.js";
import treeDatas from "./treeData.js"
const server = new Server();
export default {
  name: "BusinessTypeTree",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    searchInputPlaceholder: {
      type: String,
      default: "请输入检索内容"
    },
    len: {
      type: [String, Number],
      default: 99999
    },
    isShowCheckbox: {
      // 是否显示复选框
      type: Boolean,
      default: true
    },
    isMultiple: {
      // 是否多选
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      server: server,
      isShowLoading: true,
      treeModal: false,
      selectedItem: null,
      curSearchVal: "",
      formSearch: {
        searchVal: ""
      },
      treeData: []
    };
  },
  created: function() {
    this.queryAllBusinessType();
    this.$emit("SetTitle", this.title);
    this.$emit("SetPageActions", [
      {
        text: "确定",
        theme: "primary",
        icon: "add",
        handle: this.saveSelect
      },
      {
        text: "关闭",
        theme: "primary",
        icon: "close",
        handle: this.cancel
      }
    ]);
  },
  methods: {
    queryAllBusinessType() {
      this.treeHandle(treeDatas);
        this.treeData = treeDatas;
        this.isShowLoading = false;


      // this.server.queryAllBusinessType().then(response => {
      //   if (response && response.statusCode == "-1") {
      //     this.$Message.error({
      //       content: "查询失败！",
      //       duration: 3
      //     });
      //     this.isShowLoading = false;
      //     return;
      //   }
      //   var treeData = response;
      //   this.treeHandle(treeData);
      //   this.treeData = treeData;
      //   this.isShowLoading = false;
      // });
    },
    checkChange(checkNodes) {
      if (this.ismultiple) {
      }
      this.selectedItem = checkNodes;
      this.$emit("selectedItem", this.selectedItem);
    },
    treeHandle(treeData) {
      let self = this;
      if (treeData.length <= 0) return;
      for (var i = 0; i < treeData.length; i++) {
        var data = treeData[i];
        if (!data) data = {};
        data["show-checkbox"] = false;
        if (data.children && data.children.length > 0) {
          data.expand = false;
          this.treeHandle(data.children);
        } else {
          data.children = [];
          delete data.children;
        }
      }
    },
    openModal() {
      this.treeModal = true;
    },
    cancel() {
      // this.$Message.info('Clicked cancel');
      this.$emit("Close");
    },
    // 模糊查询
    orgSearch() {
      this.server
        .queryBusinessCategorys({
          categoryName: this.formSearch.searchVal
        })
        .then(response => {
          if (response && response.statusCode == "-1") {
            this.$Message.error({
              content: "查询失败！",
              duration: 3
            });
            return response;
          }
          let treeData = response;
          this.treeHandle(treeData);
          this.treeData = treeData;
          this.isShowLoading = false;
        });
    },
    saveSelect() {
      let data = this.selectedItem || [];
      if (this.len < data.length) {
        this.$Message.error(`最多选择${this.len}项`);
        return;
      }

      this.$emit("Close", this.categorysRecombine(data));
    },
    categorysRecombine(data) {
      const category = {
        names: [],
        codes: [],
        cates: []
      };
      const findSubs = cates => {
        cates.map(item => {
          if (item.children && item.children.length > 0) {
            findSubs(item.children);
          } else {
            if (category.codes.indexOf(item.code) === -1) {
              category.names.push(item.title);
              category.codes.push(item.code);
              category.cates.push({ name: item.title, code: item.code });
            }
          }
        });
      };

      findSubs(data);
      return category;
    }
  }
};
</script>