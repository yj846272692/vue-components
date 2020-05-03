<template>
    <div>
        <EMSTable :params="searchForm" ref="BankInfoTable" :server="server" action="queryBanks" :columns="columns" :initParams="searchForm" :highlight-row="true" :onSelectionChange="onSelectionChange">
            <Form :model="searchForm" ref="searchForm" slot="search-bar" label-position="top" inline>
                <Form-item prop="compName" label="实际付款公司名称">
                    <Input type="text" v-model="searchForm.compName"></Input>
                </Form-item>

                <Form-item prop="bankName" label="银行名称">
                    <Input type="text" v-model="searchForm.bankName"></Input>
                </Form-item>
            </Form>
            <div slot="handle-bar">
                <!-- <Button @click.native="search" type="warning" icon="search">{{$t('common.search')}}</Button> -->
                <!-- <Button @click.native="reset" type="info" icon="loop">{{$t('common.reset')}}</Button> -->

                <Button @click.native="search" type="warning" icon="search">{{commonSearch}}</Button>
                <Button @click.native="reset" type="info" icon="loop">{{commonReset}}</Button>
            </div>
        </EMSTable>
    </div>
</template>
<script>
import EMSTable from "../emsTablex/EMSTable.vue";
import Server from "./server.js";
export default {
  name: "PaymentCompanyList",
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
    compCode: {
      type: String,
      default() {
        return "";
      }
    },
    compName: {
      type: String,
      default() {
        return "";
      }
    },
    columns: {
      type: Array,
      default() {
        return [
          {
            type: "selection",
            width: 55,
            // fixed: 'left',
            align: "center"
          },
          {
            title: "实际付款公司名称",
            key: "compName",
            width: 160,
            align: "center",
            // sortable: "custom",
            render: (h, params) => {
              return h(
                "div",
                {
                  attrs: {
                    class: "ivu-table-cell ivu-table-cell-ellipsis",
                    title: params.row.compName
                  }
                },
                params.row.compName
              );
            }
          },
          {
            title: "银行名称",
            key: "bankName",
            align: "center",
            // sortable: "custom",
            width: 140,
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
            title: "银行账户名",
            align: "center",
            key: "bankAccountName",
            width: 170,
            render: (h, params) => {
              return h(
                "div",
                {
                  attrs: {
                    class: "ivu-table-cell ivu-table-cell-ellipsis",
                    title: params.row.bankAccountName
                  }
                },
                params.row.bankAccountName
              );
            }
          },
          {
            title: "银行账号",
            align: "center",
            key: "bankAccountNum",
            minWidth: 140,
            render: (h, params) => {
              return h(
                "div",
                {
                  attrs: {
                    class: "ivu-table-cell ivu-table-cell-ellipsis",
                    title: params.row.bankAccountNum
                  }
                },
                params.row.bankAccountNum
              );
            }
          }
        ];
      }
    }
  },
  data() {
    return {
      commonSearch: "搜索",
      commonReset: "重置",
      server: new Server(),
      searchForm: {
        compCode: this.compCode,
        compName: this.compName,
        bankName: ""
      }
    };
  },
  computed: {},
  created: function() {
    this.$emit("SetTitle", this.title);
  },
  beforeMount: function() {},
  mounted: function() {
    this.$emit("SetPageSize", window.innerWidth * 0.5);
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
</style>


