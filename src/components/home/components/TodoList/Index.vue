<template>
  <div class="todoList">
    <Tabs v-model="curTab">

        <TabPane label="我的申请" name="mybillofaccount-page" :disabled="disTab1">
          <EMSTable 
            :server="server" 
            :autoFirst="true" 
            action="getMySubmitClaim" 
            :params="initParams1" 
            :columns="columns1"
            :showSizer="false"
            :showElevator="true"
            :isIndexAuto="false"
            :border="false"
          >
          </EMSTable>
        </TabPane>
        <TabPane :label="label2" name="mypending-page" :disabled="disTab2">
          <EMSTable 
            :server="server" 
            :autoFirst="true" 
            action="getMyTodo" 
            :params="initParams2" 
            :columns="columns2"
            :showSizer="false"
            :showElevator="true"
            :isIndexAuto="false"
            :border="false"
            ref="myTodoTable"
          >
            <Button slot="footer-bar" @click="batchApproval">批量审批</Button>
          </EMSTable>
        </TabPane>
        <TabPane :label="label3" name="myhavedone-page" :disabled="disTab3">
          <EMSTable 
            :server="server" 
            :autoFirst="true" 
            action="getMyHistoryTask" 
            :params="initParams3" 
            :columns="columns3"
            :showSizer="false"
            :showElevator="true"
            :isIndexAuto="false"
            :border="false"
            ref="myHistoryTaskTable"
          >
          </EMSTable>
        </TabPane>
<!--         <TabPane label="影像待办" name="name4" :disabled="disTab4">
          <EMSTable 
            :server="server" 
            :autoFirst="true" 
            action="getTodoList" 
            :params="initParams1" 
            :columns="columns1"
            :showSizer="false"
            :showElevator="true"
            :isIndexAuto="false"
          >
          </EMSTable>
        </TabPane> -->
    </Tabs>
    <router-link :to="{name: curTab}" class="more">查看更多</router-link>
  </div>
</template>

<script>
import EMSTable from "../../../emsTablex/EMSTable"
import util from "@/tools/util.js";
import Server from './server'
const server = new Server
const processStateMap = {
  "1": "草稿",
  "2": "审批中",
  "3": "通过",
  "4": "未通过",
  "5": "退回起草",
  "6": "作废"
};
const processStateActionTypeMap = {
  "1": "start",
  "2": "done",
  "3": "done",
  "4": "todo",
  "5": "todo",
  "6": "done"
};

export default {
  name: "TodoList",

  components: {
    EMSTable
  },

  props: {},

  data() {
    const that = this
    return {
      server,
      initParams1: {},
      initParams2: {
        "catalogyCodeList":[],
        "claimAountlest":"",
        "claimAountmost":"",
        "startapplyDate":"",
        "endapplyDate":"",
        "result":[{"claimNo":"","getRemark":"","ouCode":"","submitter":"","venderCode":"","venderName":""}]
      },
      initParams3: {
        "catalogyCodeList":[],
        "claimAountlest":"",
        "claimAountmost":"",
        "startapplyDate":"",
        "endapplyDate":"",
        "accountingPeriod":"",
        "result":[{"claimNo":"","getRemark":"","ouCode":"","submitter":"","venderCode":"","venderName":""}]
      },
      initParams4: {},
      disTab1: false,
      disTab2: false,
      disTab3: false,
      disTab4: true,
      label2: (h) => {
        return h('div', [
          h('span', '待审批'),
          h('Badge', {
            props: {
              count: this.$refs.myTodoTable.total
            }
          })
        ])
      },
      label3: (h) => {
        return h('div', [
          h('span', '已审批'),
          h('Badge', {
            props: {
              count: this.$refs.myHistoryTaskTable.total
            }
          })
        ])
      },
      columns1: [
        {
          title: "费用编号",
          key: "claimNo",
          minWidth: 148,
          align: "center",
          render(h, params) {
            return h("RowTools", {
              props: {
                data: [
                  {
                    text: params.row.claimNo,
                    handle: () => {
                      that.openWin(params.row);
                    }
                  }
                ]
              }
            });
          }
        },
        {
          title: "申请日期",
          key: "applDate",
          minWidth: 101,
          align: "center",
          render(h, params){
            return h("span", params.row.applDate && params.row.applDate.split(" ")[0])
          }
        },
        {
          title: "业务类别",
          key: "categoryName",
          minWidth: 116,
          align: "center"
        },
        {
          title: "报账金额",
          key: "claimAmount",
          minWidth: 95,
          align: "center"
        },
        {
          title: "流程状态",
          key: "processState",
          minWidth: 76,
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              processStateMap[params.row.processState]
            );
          }
        },
        {
          title: "当前处理人",
          key: "ldapCode",
          minWidth: 144,
          align: "center"
        },
        {
          title: "费用事由",
          key: "remark",
          minWidth: 224,
          align: "center"
        }
      ],
      columns2: [
        {
          type: "selection",
          width: 45,
          fixed: 'left',
          align: "center"
        },
        {
          title: "费用编号",
          key: "claimNo",
          minWidth: 148,
          align: "center",
          render(h, params) {
            return h("RowTools", {
              props: {
                data: [
                  {
                    text: params.row.claimNo,
                    handle: (e) => {
                      e.stopPropagation()
                      params.row.actionType = "todo";
                      that.openTask(params.row);
                    }
                  }
                ]
              }
            });
          }
        },
        {
          title: "申请人",
          key: "submitter",
          minWidth: 80,
          align: "center"
        },
        {
          title: "申请日期",
          key: "applyDate",
          minWidth: 101,
          align: "center",
          render(h, params){
            return h("span", params.row.applyDate && params.row.applyDate.split(" ")[0])
          }
        },
        {
          title: "业务类别",
          key: "categoryName",
          minWidth: 116,
          align: "center"
        },
        {
          title: "报账金额",
          key: "amount",
          minWidth: 95,
          align: "center"
        },
        {
          title: "供应商名称",
          key: "venderName",
          minWidth: 144,
          align: "center"
        },
        {
          title: "当前环节",
          key: "currentTaskName",
          minWidth: 144,
          align: "center"
        }
      ],
      columns3: [
        {
          title: "费用编号",
          key: "claimNo",
          minWidth: 148,
          align: "center",
          render(h, params) {
            return h("RowTools", {
              props: {
                data: [
                  {
                    text: params.row.claimNo,
                    handle: () => {
                      params.row.actionType = "done";
                      that.openTask(params.row);
                    }
                  }
                ]
              }
            });
          }
        },
        {
          title: "申请人",
          key: "submitter",
          minWidth: 80,
          align: "center"
        },
        {
          title: "申请日期",
          key: "applyDate",
          minWidth: 101,
          align: "center",
          render(h, params){
            return h("span", params.row.applyDate && params.row.applyDate.split(" ")[0])
          }
        },
        {
          title: "业务类别",
          key: "categoryName",
          minWidth: 116,
          align: "center"
        },
        {
          title: "报账金额",
          key: "amount",
          minWidth: 95,
          align: "center"
        },
        {
          title: "供应商",
          key: "venderName",
          minWidth: 128,
          align: "center"
        },
        {
          title: "当前环节",
          key: "currentTaskName",
          minWidth: 160,
          align: "center"
        }
      ],
      columns4: [],
      curTab: "mybillofaccount-page",
      list: []
    };
  },

  computed: {},

  watch: {},

  created() {
  },

  mounted() {},

  methods: {
    rowClickHandle(row, index) {
      console.log("row", row)
    },

    // 表格数据不够时用空白表格填满
    fill(list) {
      if(list.length < 9) {
        const len = 9 - list.length
        for(var i = 0; i <= len; i++) {
          list.push({_disabled: true})
        }
      } 
    },

    rowClassName (row, index) {
      if(row._disabled){
        return "disabled"
      }else{
        return ""
      }
    },

    openWin(data) {
      window.$store
        .dispatch("QueryProcessInfoByClaimNo", {
          claimNo: data.claimNo
        })
        .then(response => {
          let dataResult = response.list[0];
          dataResult.actionType = processStateActionTypeMap[data.processState];
          util.openTaskFromBillOfAccount(dataResult);
        })
        .catch(error => {});
    },
    openTask(data) {
      util.openTaskFromBillOfAccount(data);
    },

    //批量审批
    batchApproval() {
      
    }
  }
};
</script>

<style lang='less'>
@tabs: ivu-tabs;
@table: ivu-table;

.todoList {
  height: 416px;
  font-size: 12px;
  color: #666;

  .@{tabs}{
    
    .@{tabs}-bar {
      margin-bottom: 0;
      border-top: none;
    }

    .@{table}-wrapper{
      border: 0;

      .@{table}{
        overflow: hidden;

        &-body{
          height: 300px;
          overflow: hidden;
        }

        td,
        th{
          border-bottom: none;
        }
      }
      
    }

    .ivu-tabs-tab{
      font-weight: bold;
    }

  }

  a.more{
    position: absolute;
    right: 15px;
    top: 11px;
    text-decoration: underline;

    &:link,
    &:visited {
      color: #666;
    }

    &:hover {
      color: #ffa329;
    }
  }
}
</style>