<template>
    <div style="">
        <div class="search-bar run-search-bar" style="background:none;">
            <div>
                <!-- align="right" style="margin:5px" -->
                <slot name="handle-bar"></slot>
            </div>
            <div>
                <slot name="search-bar"></slot>
            </div>
        </div>
        <div class="single-table-con">
            <div class="table-bar">
                <slot name="table-bar"></slot>
            </div>
            <Table size="small" ref="table" :loading="loading" @on-current-change="onCurrentChange" :highlight-row="highlightRow" :data="tableData" :columns="tableColumns" @on-selection-change="selectionChange" @on-sort-change="sortHandle" @on-row-click="rowClickHandle" @on-expand="rowClickExpand" @on-row-dblclick="onRowDblclick"  stripe></Table>
            <div style="margin: 10px;overflow: hidden" v-if="isPage">
                <div style="float: right;">
                    <Page :placement="placement" :total="total" :show-total="showTotal" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" :page-size="param.page.pageSize" :current="param.page.currentPage" @on-change="changePage" size="small" @on-page-size-change="changePageSize"></Page>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "EMSTable",
  components: {},
  props: {
    rowClickExpand: {
      type: Function
    },
    resource: {
      type: Array,
      default() {
        return [];
      }
    },
    useCatch: {
      type: Boolean,
      default() {
        return false;
      }
    },
    catchParams: {
      type: Object,
      default() {
        return {};
      }
    },
    highlightRow: {
      type: Boolean,
      default() {
        return false;
      }
    },
    action: {
      type: String,
      default() {
        return "";
      }
    },
    params: {
      type: Object,
      default() {
        return {};
      }
    },
    server: {
      type: Object,
      default() {
        return {};
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    columnsFn: {
      type: Function
    },
    initParam: {
      type: Object,
      default() {
        return {};
      }
    },
    loadCallback: {
      type: Function,
      default() {
        return function(data) {
        };
      }
    },
    autoFirst: {
      type: Boolean,
      default() {
        return true;
      }
    },
    pageSize: {
      type: Number,
      default() {
        return 10;
      }
    },
    showTotal: {
      type: Boolean,
      default() {
        return true;
      }
    },
    showSizer: {
      type: Boolean,
      default() {
        return true;
      }
    },
    pageSizeOpts: {
      type: Array,
      default() {
        return [10, 20, 50, 100];
      }
    },
    isPage: {
      type: Boolean,
      default() {
        return true;
      }
    },
    onSelectionChange: {
      type: Function
    },
    onRowDblclick: {
      type: Function
    },
    rowClickHandle: {
      type: Function
    }
  },
  data() {
    return {
      tableData: [],
      tableColumns: [],
      total: 0,
      currentPage: 1,
      selection: [],
      loading: false,
      param: {
        page: {
          currentPage: 1,
          // pageNum: 0,
          pageSize: this.pageSize
        },
        params: this.params,
        sortDTO: {
          fieldName: "",
          orderBy: ""
        }
      },
      messageJob: undefined,
      isSelectionChange: false,
      currentRow: undefined
    };
  },
  computed: {
    placement() {
      let pageTotal = 0;
      if (this.total % this.pageSize == 0) {
        pageTotal = this.total / this.pageSize;
      } else {
        pageTotal = this.total / this.pageSize + 1;
      }
      pageTotal = parseInt(pageTotal);
      return this.total % this.pageSize < 3 && this.currentPage == pageTotal
        ? "bottom"
        : "top";
    },
    lang() {
      return $store.state.lang;
    }
  },
  created: function() {
    if (!!this.action && this.autoFirst) {
      this.load(this.initParam);
    } else if(!this.action) {
      this.loadLocal();
    }
    for (let c of this.columns) {
      if (!~"selection".indexOf(c.type)) {
        c.ellipsis = true;
      }
    }
    this.getColumns();
  },
  beforeMount: function() {},
  mounted: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    onCurrentChange(currentRow, oldCurrentRow) {
      this.currentRow = Object.assign({}, currentRow);
    },
    getHighlightRow() {
      return this.currentRow;
    },
    getColumns() {
      if (typeof this.columnsFn == "function") {
        this.tableColumns = [].concat(this.columnsFn());
      } else {
        this.tableColumns = [].concat(this.columns);
      }
    },
    refresh() {
      this.param.page.currentPage = 1;
      this.$nextTick(() => {
        this.load();
      });
    },
    load(param = {}, page, cb=function(){}) {
      this.selection = [];
      for (let p in param) {
        this.param.params[p] = param[p];
      }
      this.loading = true;
      if (!!page && typeof page == "number") {
        this.param.page.currentPage = page;
      }
      this.param.page.recordCount = this.total;
      !!this.action ? this.loadAjax(cb) : this.loadLocal(cb);
    },
    loadLocal(cb) {
      this.loadCallback(this.resource);
      if (!this.isPage) {
        this.$nextTick(() => {
          this.tableData = [].concat(this.resource);
          this.loading = false;
        });
        return;
      }
      this.total = this.resource.length;
      let start = (this.param.page.currentPage - 1) * this.param.page.pageSize;
      let end = start + this.param.page.pageSize;
      end = this.resource.length > end ? end : this.resource.length;
      this.tableData = [];
      for (let i = start; i < end; i++) {
        this.tableData.push(this.resource[i]);
      }
      cb(this.tableData)
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    loadAjax(cb) {
      if (this.server[this.action]) {
        this.server[this.action](this.param).then(res => {
          this.loading = false;

          // 若返回的数据不符合要求
          if(!res || !res.data || res.data.pageNum === undefined) {
            return this.$Message.error((res && res.msg ) || "数据加载失败")
          }

          this.currentPage = res.data.pageNum;
          this.total = res.data.total;
          this.tableData = [];
          let _list = [];
          this.loadCallback(res.data.list);
          for (let item of res.data.list) {
            this.tableData.push(item);
          }
          cb(this.tableData)
        });
      } else {
        $store.dispatch(this.action, this.param).then(res => {
          this.loading = false;
          if (!res) return;
          this.currentPage = res.data.pageNum;
          this.total = res.data.total;
          this.tableData = [];
          let _list = [];
          this.loadCallback(res.data.list);
          for (let item of res.data.list) {
            this.tableData.push(item);
          }
          cb(this.tableData)
        });
      }
    },
    changePage(page) {
      this.param.page.currentPage = page;
      this.load();
    },
    changePageSize(page) {
      this.param.page.pageSize = page;
      this.load();
    },
    selectionChange(selection) {
      this.isSelectionChange = true;
      this.selection = selection;
      if (typeof this.onSelectionChange == "function") {
        this.onSelectionChange(selection);
      }
      this.$emit("on-selection-change",selection);
    },
    rowDblclick(selection,index){
      if (typeof this.onRowDblclick == "function") {
        this.onRowDblclick(selection,index);
      }
      this.$emit("on-row-dblclick",selection);
    },
    getSelectioned() {
      return this.isSelectionChange ? this.selection : undefined;
    },
    sortHandle(obj) {
      this.param.sortDTO.fieldName = obj.key;
      this.param.sortDTO.orderBy = obj.order;
      if (this.param.sortDTO.orderBy == "normal") {
        this.param.sortDTO = {
          fieldName: "",
          orderBy: ""
        };
      }
      this.refresh();
    },
    getSortData() {
      return this.param.sortDTO;
    },
    getTableObj() {
      return this.$refs["table"];
    }
  },
  watch: {
    lang() {
      this.getColumns();
    },

    resource(newVal, oldVal) {
      this.resource = newVal;
    }
  },
  directives: {}
};
</script>
<style lang="less" scoped>

</style>
