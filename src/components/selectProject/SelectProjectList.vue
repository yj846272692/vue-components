<template>
  <div>
    <EMSTable :params="searchForm" ref="projectTable" :server="server" action="queryCompanys" :columns="columns" :highlight-row="true" :onSelectionChange="onSelectionChange" :onRowDblclick="onRowDblclick">
      <Form ref="searchForm" slot="search-bar" label-position="top" inline>
        <Form-item label="项目编码">
          <Input type="text" v-model="searchForm.projectCode"></Input>
        </Form-item>
        <Form-item label="项目名称">
          <Input type="text" v-model="searchForm.projectName"></Input>
        </Form-item>
      </Form>
      <div slot="handle-bar">
        <Button  @click.native="search" type="warning" icon="search">{{$t('common.search')}}</Button>
        <Button  @click.native="reset" type="info" icon="loop">{{$t('common.reset')}}</Button>
      </div>
    </EMSTable>
  </div>
</template>
<script>
import EMSTable from "../emsTablex/EMSTable.vue";
import Server from "./server.js";
const POST_FLAG_MAP = {'Y': '允许过账', 'N': '不允许过账'};
const VALID_FLAG_MAP = {'Y': '有效', 'N': '无效'};
export default {
  name: 'SelectProjectList',
  components: {
    EMSTable: EMSTable
  },
  props: {

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

    // 归属公司
    companyCode: {
      type: String,
      default() {
        return '';
      }
    },
  },
  data() {
    return {
      server: new Server(),
      searchForm: {
        projectName: "",
        projectCode: "",
        isValidity: this.isValidity,
        isPost: this.isPost,
        ouCode: this.companyCode
      },
      columns: [
        {
          type: "selection",
          width: 45,
          align: "center"
        },
        {
          title: "BU编码",
          key: "buCode",
          width: 180
        },
        {
          title: "项目名称",
          minWidth: 180,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.projectName
                }
              },
              params.row.projectName
            );
          }
        },
        {
          title: "项目编码",
          key: "projectCode",
          width: 180
        },
        {
          title: "是否有效",
          width: 110,
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: params.row.isValidity == "Y" ? "blue" : "red"
                }
              },
              params.row.isValidity == "Y" ? "有效" : "无效"
            );
          }
        },
        {
          title: "是否允许过账",
          width: 130,
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: params.row.isPost == "Y" ? "blue" : "red"
                }
              },
              params.row.isPost == "Y" ? "允许过账" : "不允许过账"
            );
          }
        }
      ]
    };
  },
  computed: {
  },
  created: function() {
    this.$emit("SetTitle", this.title);
  },
  beforeMount: function() {},
  mounted: function() {
    this.$emit("SetPageSize", window.innerWidth * 0.85);
  },
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    search(page = 1) {
      this.$refs["projectTable"].load(this.searchForm, page);
    },
    reset() {
      this.searchForm.projectName = '';
      this.searchForm.projectCode = '';
      this.search();
    },

    // 点击数据行
    onSelectionChange(selected) {
      if (selected.length > 1) {
        this.$Message.warning({
          content: `只能选择一条数据`,
          duration: 5
        });
        return;
      }
      this.$emit("Close", selected[0]);
    },
    //双击
    onRowDblclick(selected,index){
      this.$emit("Close", selected);
    }
  },
  watch: {},
  directives: {}
};
</script>
<style lang="less" scoped>

</style>


