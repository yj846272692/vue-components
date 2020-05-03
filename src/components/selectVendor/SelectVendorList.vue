<template>
    <div>
        <EMSTable ref="vendorTable" :server="server" action="getVendors" :params="initParams" :columns="columns" :highlight-row="true" @on-selection-change="onSelectionChange">
            <Form :model="searchForm" ref="searchForm" slot="search-bar" label-position="top" inline>
                <Form-item prop="vendorCode" :label="`${typeName}编码`" v-if="typeName === '供应商'">
                    <Input type="text" maxlength="30" v-model="searchForm.vendorCode" :placeholder="`请输入${typeName}编码`"></Input>
                </Form-item>
                <Form-item prop="vendorName" :label="`${typeName}名称`">
                    <Input type="text" maxlength="30" v-model="searchForm.vendorName" :placeholder="`请输入${typeName}名称`"></Input>
                </Form-item>
            </Form>
            <div slot="handle-bar">
                <Button @click.native="search" type="warning" icon="search">查询</Button>
                <Button @click.native="reset" type="info" icon="loop">重置</Button>
            </div>
        </EMSTable>
    </div>
</template>

<script>
import EMSTable from "../emsTablex/EMSTable.vue";
import Server from "./Server";
const server = new Server();

export default {
  components: {
    EMSTable
  },
  props: {
    //
    buCode: {
      type: String,
      default: ""
    },
    vendorType: {
      type: String,
      default: "EMPLOYEE"
    },
    employeeNo: {
      type: String,
      default: ""
    },
    // 归属公司
    companyCode: {
      type: String,
      default: ""
    },
    // 供应商code
    vendorCode: {
      type: String,
      default: ""
    },
    // 对公 、 对私？
    isPublic: {
      type: Boolean,
      default: false
    },
    // 供应商 / 收款人
    typeName: {
      type: String,
      default: "供应商"
    }
  },
  data() {
    return {
      server,
      searchForm: {
        vendorName: "",
        vendorCode: this.vendorCode,
        vendorType: "EMPLOYEE",
        companyCode: this.companyCode
      },
      columns: [
        {
          type: "selection",
          width: 55,
          // fixed: 'left',
          align: "center"
        },
        {
          title: `${this.typeName}名称`,
          key: "vendorName",
          minWidth: 180,
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
          title: `${this.typeName}地点名`,
          key: "vendorSiteName",
          align: "center",
          // sortable: "custom",
          width: 200,
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
          title: `${this.typeName}银行户名`,
          align: "center",
          key: "vendorAccountName",
          width: 200,
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
          title: `${this.typeName}银行账号`,
          align: "center",
          key: "vendorAccountNo",
          width: 200,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis"
                }
              },
              (() => {
                if (this.isPublic) {
                  return params.row.vendorAccountNo;
                } else {
                  return this.formatAccountNo(params.row.vendorAccountNo);
                }
              })()
            );
          }
        },
        {
          title: `${this.typeName}开户行`,
          align: "center",
          key: "bankName",
          width: 200,
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
          title: `${this.typeName}银行描述`,
          align: "center",
          key: "accountDes",
          width: 300,
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
        }
      ]
    };
  },
  computed: {
    initParams() {
      return JSON.parse(JSON.stringify(this.searchForm));
    }
  },
  created: function() {
    this.$emit("SetTitle", `${this.typeName}单选`);
    // this.$emit("SetPageSize", 780);
    this.$emit("SetPageSize", window.innerWidth * 0.85);
    if (this.isPublic) {
      this.vendorType = "VENDOR";
    }
  },
  beforeMount: function() {},
  mounted: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    search(page = 1) {
      this.$refs["vendorTable"].load(this.searchForm, page);
    },
    reset() {
      this.$refs["searchForm"].resetFields();
      this.search(1);
    },
    // 确定
    onOk() {
      let selected = this.$refs["vendorTable"].getSelectioned() || [];
      this.$emit("Close", selected[0]);
    },
    // 清空
    clear() {
      this.$emit("Close", []);
    },
    onSelectionChange(selection) {
      this.$emit("Close", selection[0]);
    },
    // 银行账号 隐私 只展示前后4位，中间用****代替
    formatAccountNo(accountNo) {
      if (!accountNo) {
        return;
      }
      return String(accountNo).replace(/^(.{4}).+(.{4})$/g, "$1****$2");
    }
  },
  watch: {},
  directives: {}
};
</script>
<style scoped>
/* .run-search-bar > div:first-child {
  float: right;
  margin: 1px 110px 1px 1px;
} */
</style>

