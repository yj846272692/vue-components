<template>
    <div>
        <EMSTable :params="searchForm" ref="cityInfoTable" :server="server" action="queryCitys" :columns="columns" :initParams="searchForm" :highlight-row="true" @on-selection-change="onSelectionChange">
            <Form :model="searchForm" ref="searchForm" slot="search-bar" label-position="top" class="ivu-form-no-margin-bottom" inline>
                <Form-item prop="areaName" label="城市名称">
                    <Input type="text" v-model="searchForm.areaName" ></Input>
                </Form-item>
                <Form-item prop="areaCode" label="城市编码">
                    <Input type="text" v-model="searchForm.areaCode" ></Input>
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
        return "请选择城市";
      }
    },
  },
  data() {
    return {
      server: new Server(),
      searchForm: {
        areaName: "",
        areaCode: "",
      },
      columns: [
        {
          type: "selection",
          width: 70,
          align: "center"
        },
        {
          title: "城市名称",
          key: "areaName",
          minWidth: 200,
          align: "center",
          // sortable: "custom",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.areaName
                }
              },
              params.row.areaName
            );
          }
        },
        {
          title: "城市编码",
          key: "areaCode",
          align: "center",
          width: 160,
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
      ]
    };
  },
  computed: {},
  created: function() {
    this.$emit("SetTitle", this.title);
  },
  beforeMount: function() {},
  mounted: function() {
    this.$emit("SetPageSize", 800);
  },
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    search(page = 1) {
      this.$refs["cityInfoTable"].load(this.searchForm, page);
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
.run-mod-box {
  display: inline-table;
}
</style>