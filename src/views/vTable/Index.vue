<template>
    <div>
        <EMSTable :server="server" ref="businessBigClassTable" action="QueryaccountControllerList" :params="accountControllerSearchForm" :columnsFn="accountControllerColumns" :highlight-row="true" :onSelectionChange="onSelectionChange">
            <Form :model="accountControllerSearchForm" ref="accountControllerSearchForm" :rules="rule" slot="search-bar" label-position="top" class="ivu-form-no-margin-bottom" inline>
                <Form-item prop="accountItemCode" label="会计科目编码">
                    <Input type="text" maxlength="30" v-model="accountControllerSearchForm.accountItemCode" placeholder="会计科目编码"></Input>
                </Form-item>
                <Form-item prop="accountItemName" label="会计科目名称">
                    <Input type="text" maxlength="30" v-model="accountControllerSearchForm.accountItemName" placeholder="会计科目名称"></Input>
                </Form-item>
                <Form-item prop="childAccountItemCode" label="子目编码">
                    <Input type="text" maxlength="30" v-model="accountControllerSearchForm.childAccountItemCode" placeholder="子目编码"></Input>
                </Form-item>
                <Form-item prop="childAccountItemName" label="子目名称">
                    <Input type="text" maxlength="30" v-model="accountControllerSearchForm.childAccountItemName" placeholder="子目名称"></Input>
                </Form-item>
                <Form-item prop="buCode" label="所属BU">
                    <DataSelect class="" v-model="accountControllerSearchForm.buCode" code="BU" transfer @loadFinish="loadFinishVendorType"></DataSelect>
                </Form-item>
                <Form-item prop="valid" label="ERP有效性">
                    <Select v-model="accountControllerSearchForm.valid" @on-change="setGroupName" transfer clearable>
                        <Option v-for="(option, index) in isERPeffectiveness" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </Form-item>
                <Form-item prop="emsIsValidity" label="EMS有效性">
                    <Select v-model="accountControllerSearchForm.emsIsValidity" @on-change="setGroupName" transfer clearable>
                        <Option v-for="(option, index) in isEMSeffectiveness" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
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
// import { EMSTable, DataSelect } from "ems-components";
import EMSTable from "../../components/emsTablex/EMSTable.vue";
import DataSelect from "../../components/dataSelect/DataSelect.vue";

import { mapState, mapGetters, mapMutations } from "vuex";
import Server from "./server.js";
const server = new Server();
export default {
  // 会计科目管理
  components: { EMSTable, DataSelect },
  data() {
    return {
      resourceData: [],
      isShowBusiness: true,
      server: server,
      isERPeffectiveness: [],
      isEMSeffectiveness: [],
      accountControllerSearchForm: {
        accountItemCode: "",
        accountItemName: "",
        childAccountItemCode: "",
        childAccountItemName: "",
        buCode: "",
        valid: "",
        emsIsValidity: ""
      }
    };
  },
  computed: {},
  created: function() {
    this.isERPeffectiveness = [
      { label: "有效", value: "Y" },
      { label: "无效", value: "N" }
    ];
    this.isEMSeffectiveness = [
      { label: "有效", value: "Y" },
      { label: "无效", value: "N" }
    ];
  },
  beforeMount: function() {},
  mounted: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    search(page) {
      this.$refs["businessBigClassTable"].load(
        this.accountControllerSearchForm,
        page
      );
      // console.log(JSON.stringify(this.accountControllerSearchForm));
    },
    reset() {
      this.$refs["accountControllerSearchForm"].resetFields();
      this.search(1);
    },
    accountControllerColumns() {
      return [
        {
          title: "所属BU编码",
          align: "center",
          key: "buCode  ",
          width: 150,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.buCode
                }
              },
              params.row.buCode
            );
          }
        },

        {
          title: "会计科目编码",
          align: "center",
          key: "accountItemCode ",
          width: 140,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.accountItemCode
                }
              },
              params.row.accountItemCode
            );
          }
        },

        {
          title: "会计科目名称",
          align: "center",
          key: "accountItemName ",
          minWidth: 200,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.accountItemName
                }
              },
              params.row.accountItemName
            );
          }
        },

        {
          title: "层级",
          align: "center",
          key: "accountLevel",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.accountLevel
                }
              },
              params.row.accountLevel
            );
          }
        },
        {
          title: "是否父级",
          align: "center",
          key: "isParentValue ",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.isParentValue === "0" ? "否" : "是"
                }
              },
              params.row.isParentValue === "0" ? "否" : "是"
            );
          }
        },

        {
          title: "ERP有效性",
          align: "center",
          key: "valid ",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: params.row.valid == "Y" ? "blue" : "red"
                }
              },
              params.row.valid == "Y" ? "有效" : "无效"
            );
          }
        },
        {
          title: "EMS有效性",
          align: "center",
          key: "emsIsValidity ",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: params.row.emsIsValidity == "Y" ? "blue" : "red"
                }
              },
              params.row.emsIsValidity == "Y" ? "有效" : "无效"
            );
          }
        }
      ];
    }
  },
  watch: {},
  directives: {}
};
</script>
