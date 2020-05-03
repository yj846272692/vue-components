<template>
    <div class="emstable-wrap" :class="{'noSearchbar': !slots['search-bar']}" ref="emstable-wrap">
        <div class="search-bar" v-if="slots['search-bar']">
            <div class="search-form" :class="{'expand': expandMore}">
                <slot name="search-bar"></slot>
            </div>
            <div class="handle-bar">
                <slot name="handle-bar"></slot>
                <div class="search-form-more" @click="expandMoreSearch" v-if="isShowSearchMore">
                    <a href="javascript:;">{{!expandMore ? "更多条件" : "隐藏条件"}}</a>
                    <Icon type="chevron-down" v-if="!expandMore"></Icon>
                    <Icon type="chevron-up" v-if="expandMore"></Icon>
                </div>
            </div>
        </div>
        <div class="single-table-con">

            <Table ref="table" :border="border" stripe :loading="loading" :highlight-row="highlightRow" :data="tableData" :columns="tableColumns" :row-class-name="rowClassName" :height="tableHeight" @on-current-change="onCurrentChange" @on-selection-change="selectionChange" @on-sort-change="sortHandle" @on-row-click="rowClickMt" @on-expand="rowClickExpand" :class="{'rowclick': !!rowClickHandle, 'nodatas': !loading && !total, 'fullFill': !expandMore && !!slots['search-bar']}">
                <div slot="footer">
                    <Row class="footer-tools">
                        <Col :span="12" class="footer-tools-col" :class="{
                      'table-tools-btns': !!slots['table-bar'], 
                      'footer-tools-btns': !!slots['footer-bar']}">
                        <slot name="table-bar"></slot>
                        <slot name="footer-bar"></slot>
                        </Col>
                        <Col :span="12" class="footer-tools-pages">
                        <Page :placement="placement" :total="total" :show-total="showTotal" :page-size-opts="pageSizeOpts" :page-size="param.page.pageSize" :current="param.page.currentPage" :show-sizer="showSizer" :show-elevator="showElevator" @on-change="changePage" @on-page-size-change="changePageSize" v-if="isPage">
                            <span>共{{total}}条/每页{{param.page.pageSize}}条</span>
                        </Page>
                        </Col>
                    </Row>

                    <div class="ivu-table-nodata" v-if="!loading && !total">
                        <Icon type="information-circled" />
                        <span style="vertical-align: middle">暂无信息</span>
                    </div>
                </div>
            </Table>
            <!-- <div style="margin: 10px;overflow: hidden" v-if="isPage">
                <div style="float: right;">
                    <Page 
                      :placement="placement" 
                      :total="total" 
                      :show-total="showTotal" 
                      :page-size-opts="pageSizeOpts" 
                      :show-sizer="showSizer" 
                      :page-size="param.page.pageSize" 
                      :current="param.page.currentPage" 
                      @on-change="changePage" 
                      @on-page-size-change="changePageSize"
                    >
                    </Page>
                </div>
            </div> -->
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
    changePageFun: {
      type: Function,
      default() {
        return function() {};
      }
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
        return function(data) {};
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
        return [10, 20, 50, 100, 150, 200, 300];
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
    },
    showElevator: {
      type: Boolean,
      default: false
    },
    // 是否给行自动 加 序号
    isIndexAuto: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    autoFill: {
      type: Boolean,
      default: true
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
      currentRow: undefined,
      expandMore: false,
      slots: this.$slots,
      tableHeight: "",
      isShowSearchMore: false
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
    },
    // 是否开启了复选框
    isOpenSel() {
      return this.tableColumns.some(item => {
        return item.type === "selection";
      });
    },
    // 是否开启了展开行
    isOpenExpand() {
      return this.tableColumns.some(item => {
        return item.type === "expand";
      });
    }
  },
  created: function() {
    if (!!this.action && this.autoFirst) {
      this.load(this.initParam);
    } else if (!this.action) {
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
  mounted: function() {
    this.tableHeightComputed();
    this.showSearchMore();
  },
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

      // 加上序号列
      if (this.isIndexAuto) {
        this.tableColumns.unshift({
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        });
      }

      return this.tableColumns;
    },
    refresh() {
      this.param.page.currentPage = 1;
      this.$nextTick(() => {
        this.load();
      });
    },
    load(param = {}, page, cb = function() {}) {
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
      this.changePageFun();
      cb(this.tableData);
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    loadAjax(cb) {
      if (this.server[this.action]) {
        this.server[this.action](this.param).then(res => {
          this.loading = false;

          // 若返回的数据不符合要求
          if (!res || !res.data || res.data.pageNum === undefined) {
            return this.$Message.error((res && res.msg) || "数据加载失败");
          }
          this.currentPage = res.data.pageNum;
          this.total = res.data.total;
          this.tableData = [];
          let _list = [];
          this.loadCallback(res.data.list);
          for (let item of res.data.list) {
            this.tableData.push(item);
          }
          this.changePageFun();
          cb(this.tableData);
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
          this.changePageFun();
          cb(this.tableData);
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

      // 选中的背景高亮
      this.tableData.map(row => {
        this.$set(this.tableData[row.__INDEX], "_checked", false);
        this.$set(this.tableData[row.__INDEX], "_highlight", false);
      });
      selection.map(row => {
        this.$set(this.tableData[row.__INDEX], "_checked", true);
        this.$set(this.tableData[row.__INDEX], "_highlight", true);
      });

      // 回调
      if (typeof this.onSelectionChange == "function") {
        this.onSelectionChange(selection);
      }
      this.$emit("on-selection-change", selection);
    },
    rowDblclick(selection, index) {
      if (typeof this.onRowDblclick == "function") {
        this.onRowDblclick(selection, index);
      }
      this.$emit("on-row-dblclick", selection);
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
    },

    // 展开更多搜索选项
    expandMoreSearch() {
      this.expandMore = !this.expandMore;
    },
    rowClickMt(row, index) {
      // 如果开启了复选框 点击行也要勾选/取消复选框
      // 行点击和展开行type="expand"会互相影响，造成无法展开行，所以如果有展开行，则不能进行点击行选中

      // ###--先去掉
      // if(this.isOpenSel && !row._disabled && !this.isOpenExpand){
      //   this.$set(this.tableData[index], '_checked', !row._checked)
      //   // this.$set(this.tableData[index], '_highlight', !row._highlight)

      //   const selections = this.tableData.filter(item => {
      //     return item._checked
      //   })
      //   this.selectionChange(selections)
      // }
      // --先去掉---###

      // 回掉方法
      this.rowClickHandle && this.rowClickHandle(row, index);
    },

    // 表格数据不够时用空白表格填满
    fill(list) {
      const pageSize = this.param.page.pageSize;
      if (list.length < pageSize) {
        const len = pageSize - list.length;
        for (var i = 0; i < len; i++) {
          this.tableData.push({ _disabled: true, _blank: true });
        }
      }
    },

    // 给空行添加样式
    rowClassName(row, index) {
      let cls = "";
      if (row._disabled) {
        cls += "disabled ";
      }
      if (row._blank) {
        cls += "blank ";
      }
      if (row._checked) {
        cls += "checked ";
      }
      return cls;
    },

    // 表格高度计算
    tableHeightComputed() {
      if (!!this.$slots["search-bar"]) {
        const winH = window.innerHeight;
        let emstableWrap = this.$refs["emstable-wrap"];
        let searchBar = emstableWrap.querySelector(".search-bar");
        const searchBarH = searchBar.getBoundingClientRect().height;

        const tabsbar = document.querySelector(".ivu-tabs-bar");
        const tabsbarH = tabsbar ? tabsbar.getBoundingClientRect().height : 0;

        let coreModal = null;

        const findCoreModal = el => {
          if (el.parentNode) {
            if (el.parentNode.querySelector(".core-modal-body")) {
              coreModal = el.parentNode;
            } else {
              findCoreModal(el.parentNode);
            }
          }
        };

        findCoreModal(emstableWrap);

        if (coreModal) {
          // 如果表格是嵌套在pageModal里面的
          coreModal.parentNode.className += " width-emstable";
          const coreModalFooterH = coreModal
            .querySelector(".core-modal-footer")
            .getBoundingClientRect().height;
          this.tableHeight =
            winH - searchBarH - 78 - 38 - coreModalFooterH - 13;
        } else {
          this.tableHeight = winH - searchBarH - tabsbarH - 78 - 35;
        }
      }
    },
    showSearchMore() {
      if (this.$slots["search-bar"]) {
        // const items = this.$slots['search-bar'][0].componentInstance.$el.querySelectorAll(".ivu-form-item")
        // if(items && items.length > 5) {
        //   this.isShowSearchMore = true
        // }
        const h = this.$slots["search-bar"][0].elm.getBoundingClientRect()
          .height;
        if (h > 55) {
          this.isShowSearchMore = true;
        }
      }
    }
  },
  watch: {
    lang() {
      this.getColumns();
    },

    resource(newVal, oldVal) {
      this.resource = newVal;
    },

    tableData: {
      handler(newVal, oldVal) {
        // 填充序号 方便后面其他操作
        newVal.map((item, index) => {
          item.__INDEX = index;
        });

        // 填充空行
        if (this.autoFill) {
          this.fill(newVal);
        }
      },
      immediate: true
    },

    expandMore(newVal, oldVal) {
      this.$nextTick(this.tableHeightComputed);
    }
  },
  directives: {}
};
</script>
<style lang="less">
@import "./EMSTable.less";
</style>
