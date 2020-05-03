
<template>
  <div @keydown.enter="orgSearch">
    <Input v-model="formSearch.searchVal" :placeholder="searchInputPlaceholder" v-if="isShowSearchInput">
    <Button slot="append" icon="ios-search" @click="orgSearch()"></Button>
    </Input>
    <Tree :data="orgTree" :load-data="loadData" @on-check-change="checkChange" @on-select-change="checkChange" :show-checkbox="isShowCheckbox" :multiple="isMultiple" ref="orgTree"></Tree>
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
 * 查询组织部门、查询雇员信息
 * 已经应用的功能：员工借款、员工还款流程申请
 */
import Server from "./server.js";
const server = new Server();
export default {
  name: "OrgTree",
  props: {
    //类型有3中   选所有all   选人employee   选部门department
    isShowCheckbox: {
      // 是否显示复选框
      type: Boolean,
      default: true
    },
    isMultiple: {
      // 是否多选
      type: Boolean,
      default: true
    },
    treeType: {
      type: String,
      default: "all"
    },
    len: {
      type: [String, Number],
      default: 99999
    },
    title: {
      type: String,
      default: "标题"
    },
    searchInputPlaceholder: {
      type: String,
      default: "请输入检索内容"
    },
    // 部门ID  如果有传入，则只能选择该部门下的员工
    departmentId: {
      type: String,
      default: ""
    },
    // 是否显示搜索框
    isShowSearchInput: {
      type: Boolean,
      default: true
    },
    // 增加了一个接口用来查人，baseUrl / claimURL
    queryFrom: {
        type: String,
        default: "base"
    },
  },
  data() {
    return {
      server: server,
      isShowLoading: true,
      treeModal: false,
      selectedItem: null,
      curSearchVal: "",
      formSearch: {
        enabled: "",
        searchVal: "",
        orgId: ""
      },
      ismultiple: false,
      isemployee: false,
      // 组织树
      orgTree: [],
      backupsTree: []
    };
  },
  created: function() {
    this.queryInitializationOrgs();
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
    queryInitializationOrgs() {
      this.isShowLoading = true;
      this.server.queryInitializationOrgs().then(response => {
        if (response && response.statusCode == "-1") {
          this.$Message.error({
            content: "查询失败！",
            duration: 3
          });
          this.isShowLoading = false;
          return;
        }
        var orgtree = response;
        this.treeHandle(orgtree);
        this.orgTree = orgtree;
        this.backupsTree = orgtree;
        this.isShowLoading = false;
      });
    },
    extend(obj, obj2) {
      for (let k in obj2) {
        obj[k] = obj2[k];
      }
    },
    checkChange(checkNodes) {
      if (this.ismultiple) {
      }
      this.selectedItem = checkNodes;
      this.$emit("selectedItem", this.selectedItem);
    },
    treeHandle(treeData, setobj) {
      let self = this;
      let o = setobj || {};
      if (treeData.length <= 0) return;
      for (var i = 0; i < treeData.length; i++) {
        var data = treeData[i];
        if (!data) data = {};
        data["show-checkbox"] = false;

        if (data.children && data.children.length > 0) {
          // 如果传入了departmentId，那只能选该departmentId下的人  -针对搜索
          if (
            self.treeType == "employee" &&
            self.departmentId &&
            self.departmentId !== data.id
          ) {
            o.disableCheckbox = true; // 禁止checkbox
          } else {
            o.departmentId = data.id;
            o.disableCheckbox = false;
          }

          data.expand = true;
          this.treeHandle(data.children, o || {});
          this.extend(data, o || {});
        } else {
          data.children = [];
          data.expand = false;
          if (!data.employee) {
            data.loading = false;
          }
          this.extend(data, o || {});
        }
      }
    },
    openModal() {
      this.treeModal = true;
    },

    cancel() {
      this.$emit("Close");
    },
    loadData(currentOrg, callback) {
      // 判断该节点下面是否有子数据
      // 这里要通过2个接口来判断   一个是查人   一个是查组织
      let self = this;
      let department = null;
      let employee = null;
      if (this.treeType == "department") {
        employee = [];
      }

      //查部门
      this.server
        .querySubOrgsByOrgCode({ orgId: currentOrg.id })
        .then(response => {
          if (response && response.statusCode == "-1") {
            self.$Message.error({
              content: "查询失败！",
              duration: 3
            });
            return;
          }
          var orgtree = response;
          self.treeHandle(orgtree);
          department = orgtree;
          if (employee) {
            orgtree = department.concat(employee);
            if (orgtree.length == 0) {
              self.$delete(currentOrg, "loading", true);
              //如果只查员工   灰掉部门
              if (self.treeType == "employee") {
                self.$set(currentOrg, "disableCheckbox", true);
              }
            } else {
              //如果只查部门  灰掉员工
              if (self.treeType == "department") {
                for (let k in orgtree) {
                  let d = orgtree[k];
                  if (d.employee == true) {
                    d.disableCheckbox = true;
                  }
                }
              }
              callback(orgtree);
            }
          }
        });

      //查人
      const actUrl = this.queryFrom === "base" ? "queryEmployeeByOrgCode" : "queryEmployeeByOrgCodeClaim"
      this.treeType != "department" &&
        this.server[actUrl]({
            orgId: currentOrg.id
          })
          .then(response => {
            if (response && response.statusCode == "-1") {
              self.$Message.error({
                content: "查询失败！",
                duration: 3
              });
              return;
            }
            var orgtree = response;
            self.treeHandle(orgtree);
            employee = orgtree;

            employee.map(item => {
              self.$set(item, "departmentId", currentOrg.id);
            });

            // 如果传入了departmentId，那只能选该departmentId下的人
            if (this.departmentId && this.departmentId !== currentOrg.id) {
              self.$set(currentOrg, "disableCheckbox", true);
              employee.map(item => {
                self.$set(item, "disableCheckbox", true);
                self.$set(item, "disabled", true);
              });
            }

            if (department) {
              orgtree = department.concat(employee);
              if (orgtree.length == 0) {
                self.$delete(currentOrg, "loading", true);
                //如果只查员工   灰掉部门
                if (self.treeType == "employee") {
                  self.$set(currentOrg, "disableCheckbox", true);
                }
              } else {
                callback(orgtree);
                //如果只查部门  灰掉员工
                if (self.treeType == "department") {
                  for (let k in orgtree) {
                    let d = orgtree[k];
                    if (d.employee == true) {
                      d.disableCheckbox = true;
                    }
                  }
                }
              }
            }
          });
    },
    orgSearch() {
      if (this.formSearch.searchVal == "") {
        this.queryInitializationOrgs();
        return;
      }
      this.isShowLoading = true;
      let self = this;
      if (this.treeType == "employee") {
        this.server
          .queryEmployeeByName({
            name: this.formSearch.searchVal
          })
          .then(response => {
            if (response && response.statusCode == "-1") {
              self.$Message.error({
                content: "查询失败！",
                duration: 3
              });
              this.isShowLoading = false;
              return;
            }

            self.treeHandle(response, { expand: true });
            self.orgTree = response;
            this.isShowLoading = false;
          });
      }

      if (this.treeType == "department") {
        this.server
          .queryOrgByOrgName({
            name: this.formSearch.searchVal
          })
          .then(response => {
            if (response && response.statusCode == "-1") {
              this.$Message.error({
                content: "查询失败！",
                duration: 3
              });
              this.isShowLoading = false;
              return;
            }

            this.treeHandle(response, { expand: true });
            this.orgTree = response;
            this.isShowLoading = false;
          });
      }
    },
    saveSelect() {
      //类型有3中   选所有all   选人employee   选部门department
      let data = this.selectedItem || [];
      if (this.treeType == "employee") {
        data = data.filter(function(obj) {
          if (obj.employee) {
            return true;
          }
          return false;
        });
      }
      if (this.treeType == "department") {
        data = data.filter(function(obj) {
          if (obj.employee) {
            return false;
          }
          return true;
        });
      }

      if (this.len < data.length) {
        this.$Message.error(`最多选择${this.len}项`);
        return;
      }
      this.$emit("Close", data);
    }
  }
};
</script>