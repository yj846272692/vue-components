<template>
    <div>
        <EMSTable :params="searchForm" ref="BankInfoTable" :server="server" action="queryBanks" :columns="columns" :initParams="searchForm" :highlight-row="true" @on-selection-change="onSelectionChange">
            <Form :model="searchForm" ref="searchForm" slot="search-bar" label-position="top" inline>
                <Form-item prop="vendorName" label="供应商名称">
                    <Input type="text" v-model="searchForm.vendorName" :disabled="disabledFlag"></Input>
                </Form-item>
                <Form-item prop="bankName" label="开户行">
                    <Input type="text" v-model="searchForm.bankName"></Input>
                </Form-item>
            </Form>
            <div slot="handle-bar">
              <Button @click.native="search" type="warning" icon="search">搜索</Button>
              <Button @click.native="reset" type="info" icon="loop">重置</Button>
            </div>
        </EMSTable>
    </div>
</template>
<script>
import EMSTable from "../emsTablex/EMSTable.vue";
import Server from "./server.js";
export default {
  name: "BankInfoList",
  components: {
    EMSTable: EMSTable
  },
  props: {
    title: {
      type: String,
      default() {
        return "请选择银行";
      }
    },
    companyCode: {
      type: String,
      default() {
        return "";
      }
    },
    employeeNo: {
      type: String,
      default() {
        return "";
      }
    },
    buCode: {
      type: String,
      default() {
        return "";
      }
    },
    vendorType: {
      type: String,
      default() {
        return "";
      }
    },
    vendorName: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      server: new Server(),
      disabledFlag:false,
      searchForm: {
        buCode: this.buCode,
        vendorName: this.vendorName,
        bankName: "",
        vendorType: this.vendorType,
        companyCode: this.companyCode,
        employeeNo: this.employeeNo,
      },
      columns: [
        {
          type: "selection",
          width: 70,
          // fixed: 'left',
          align: "center"
        },
        {
          title: "供应商名称",
          key: "vendorName",
          width: 160,
          align: "center",
          // sortable: "custom",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.vendorName
                }
              },
              params.row.vendorName
            );
          }
        },
        {
          title: "供应商地点名",
          key: "vendorSiteName",
          align: "center",
          // sortable: "custom",
          width: 160,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.vendorSiteName
                }
              },
              params.row.vendorSiteName
            );
          }
        },
        {
          title: "户名",
          align: "center",
          key: "vendorAccountName",
          width: 140,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.vendorAccountName
                }
              },
              params.row.vendorAccountName
            );
          }
        },
        {
          title: "银行账号",
          align: "center",
          key: "vendorAccountNo",
          width: 180,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.vendorAccountNo
                }
              },
              params.row.vendorAccountNo
            );
          }
        },
        {
          title: "开户行",
          align: "center",
          key: "bankName",
          width: 160,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.bankName
                }
              },
              params.row.bankName
            );
          }
        },
        {
          title: "银行描述",
          align: "center",
          key: "accountDes",
          width: 100,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.accountDes
                }
              },
              params.row.accountDes
            );
          }
        },
        {
          title: "银行编码",
          align: "center",
          key: "bankId",
          width: 150,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.bankId
                }
              },
              params.row.bankId
            );
          }
        },
        {
          title: "收款方区域",
          align: "center",
          key: "areaCode ",
          width: 150,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.areaCode
                }
              },
              params.row.areaCode
            );
          }
        },
        {
          title: "人行行号",
          align: "center",
          key: "cbankCode ",
          width: 160,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.cbankCode
                }
              },
              params.row.cbankCode
            );
          }
        },
        {
          title: "账户类型",
          align: "center",
          key: "bankType",
          width: 90,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.bankType
                }
              },
              params.row.bankType
            );
          }
        },
        {
          title: "供应商类型",
          align: "center",
          key: "vendorType ",
          width: 160,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.vendorType
                }
              },
              params.row.vendorType
            );
          }
        }
      ]
    };
  },
  computed: {},
  created: function() {
    this.$emit("SetTitle", this.title);
  },
  beforeMount: function() {},
  mounted: function() {
    this.$emit("SetPageSize", window.innerWidth * 0.6);
    if(this.vendorName != ""){
      this.searchForm.vendorName = this.vendorName;
      this.disabledFlag=true;
    }
    
  },
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    search(page = 1) {
      this.$refs["BankInfoTable"].load(this.searchForm, page);
    },
    reset() {
      this.$refs["searchForm"].resetFields();
      this.search(1);
    },

    // 点击数据行
    onSelectionChange(selected) {
      if (selected.length == 0) {
        return;
      }
      if (selected.length > 1) {
        this.$Message.warning({
          content: `只能选择一条数据`,
          duration: 5
        });
        return;
      }
      this.$emit("Close", selected[0]);
    }
  },
  watch: {},
  directives: {}
};
</script>
<style lang="less" scoped>
// .run-mod-box {
//   display: inline-table;
// }
</style>