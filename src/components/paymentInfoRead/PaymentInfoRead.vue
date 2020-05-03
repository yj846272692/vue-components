<!-- 付款信息 
    <PaymentInfoRead>
      <div>title</div>
      <div slot="content"></div>
    </PaymentInfoRead>
-->
<template>
  <div class="pyrd-wrap" @mouseover="handleMsOver">
    <Poptip v-bind="$attrs" v-on="$listeners">
      <div class="title">
        <slot></slot>
        <!-- <Icon type="android-apps" class="iconv"></Icon> -->
      </div>
      <div slot="content">
        <Table :columns="columns" :data="list"></Table>
      </div>
    </Poptip>
  </div>
</template>

<script>
import Server from "./server.js";
const server = new Server();
let vm;
export default {
  name: "PaymentInfoRead",

  components: {},

  props: {
    payLineId: {
      type: String,
      default: ""
    },
    payRequestLineId: {
      type: String,
      default: ""
    },
    payMentModeData: {
      type: Array,
      default: []
    },
    capitalPlanData: {
      type: Array,
      default: []
    },
    transfersTypeData: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
      list: [],
      columns: [
        {
          title: "序号",
          type: "index",
          width: 35,
          align: "center"
        },
        {
          title: "付款方式",
          key: "paymentMode",
          width: 70,
          align: "center",
          render: (h, params) => {
            let text = "";
            for (let i = 0; i < vm.payMentModeData.valueList.length; i++) {
              if (vm.payMentModeData.valueList[i].value == params.row.paymentMode) {
                text = vm.payMentModeData.valueList[i].label;
              }
            }
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.paymentMode
                }
              },
              text
            );
          }
        },
        {
          title: "付款账号",
          key: "accountNo",
          width: 140,
          align: "center"
        },
        {
          title: "金额",
          key: "amount",
          width: 75,
          align: "center"
        },
        {
          title: "资金计划",
          key: "fundPlan",
          width: 140,
          align: "center",
          render: (h, params) => {
            let text = "";
            for (let i = 0; i < vm.capitalPlanData.valueList.length; i++) {
              if (vm.capitalPlanData.valueList[i].value == params.row.fundPlan) {
                text = vm.capitalPlanData.valueList[i].label;
              }
            }
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.fundPlan
                }
              },
              text
            );
          }
        },
        {
          title: "付款通道",
          key: "transfersType",
          align: "center",
          render: (h, params) => {
            let text = "";
            for (let i = 0; i < vm.transfersTypeData.valueList.length; i++) {
              if (vm.transfersTypeData.valueList[i].value == params.row.transfersType) {
                text = vm.transfersTypeData.valueList[i].label;
              }
            }
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.transfersType
                }
              },
              text
            );
          }
        }
      ],
      loaded: false
    };
  },

  computed: {},

  watch: {
    loaded(newVal, oldVal){
      if(newVal && newVal !== oldVal){
        this.loadata()
      }
    }
  },

  created() {

  },

  mounted() {
    vm=this;
  },

  methods: {
    loadata(){
      if (this.payLineId != "") {
        server.queryCreatePaymentInfo({payLineId: parseInt(this.payLineId)}).then(response => {
          if (response.statusCode !== "-1") {
            this.list = response.data;
          } else {
            this.$Message.error(response.msg);
          }
        });
      } else {
        server.queryPaymentInfo({payRequestLineId: parseInt(this.payRequestLineId)}).then(response => {
          if (response.statusCode !== "-1") {
            this.list = response.data;
          } else {
            this.$Message.error(response.msg);
          }
        });
      }

    },

    handleMsOver(){
      this.loaded = true
    }
  }
};
</script>

<style lang='less' scoped>
.pyrd-wrap {
  &:hover {
    .iconv {
      color: #ffa329;
      border: 1px solid #ffa329;
    }
  }

  .iconv {
    padding: 0;
    transform: translateY(1px);
    color: #555;
    height: 12px;
    width: 13px;
    border: 1px solid #555;
  }
}
</style>

<style lang='less'>
.pyrd-wrap {
  .ivu-poptip-popper{

    &[x-placement^="bottom"] .ivu-poptip-arrow {
      border-bottom-color: #fcb040;

      &:after{
        border-bottom-color: #fcb040;
      }
    }
    &[x-placement^="right"] {
      margin-top: -5px;
      margin-left: 5px;

      .ivu-poptip-arrow{
        border-right-color: #fcb040;

        &:after{
          border-right-color: #fcb040;
        }
      }
    }
    &[x-placement^="left"] {
      margin-top: -5px;
      margin-right: 5px;

      .ivu-poptip-arrow{
        border-left-color: #fcb040;

        &:after{
          border-left-color: #fcb040;
        }
      }
    }
  }
  .ivu-poptip-arrow{
    z-index: 9;
  }
  .ivu-poptip-body {
    padding: 0;
  }
  .ivu-poptip-inner{
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1)
  }
  .ivu-table-wrapper{
    .ivu-table {
      th.ivu-table-column-center,
      td.ivu-table-column-center {
        height: 22px !important;
        background: #fff !important;
        font-size: 12px;
        color: #555;
        border-bottom: 1px solid #f2f2f2;
        border-right: 0;
      }
      tr:nth-child(2n) td.ivu-table-column-center{
        background: #f2f5fa !important;
      }
      th.ivu-table-column-center {
        background: #fcb040 !important;
        color: #fff;
      }
    }
  }
}
</style>