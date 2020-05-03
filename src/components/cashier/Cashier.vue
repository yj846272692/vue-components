<template>
  <div>
    <div class="cashier-name">
      <RadioGroup v-model="userCode" vertical>
        <Radio v-for="(item, index) in radioData" :label="item.userCode" :key="index">
            <span>{{item.userName}}</span>
        </Radio>
      </RadioGroup>
    </div>
    <div class="submit-button">
      <Button :loading="cashierLoad" type="info" @click="sumbitCashier">提交</Button>
    </div>
  </div>
</template>

<script>
import Server from "./server.js";

let server = new Server();

export default {
  name: "Cashier",
  data() {
    return {
      userCode: "",
      server: server,
      radioData: [],
      cashierLoad:false
    };
  },
  props: {
    title: {
      type: String,
      default() {
        return "选择本地出纳";
      }
    },
    companyCode: {
      type: String,
      default() {
        return "";
      }
    },
    cashierParam: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  created: function() {
    let vm = this;
    this.$emit("SetTitle", this.title);
  },
  mounted: function() {
    this.server
      .queryCashierByCompanyCode({ companyCode: this.cashierParam[0].companyCode })
      .then(response => {
        if (response.statusCode == "-1") {
          this.$Message.error(response.msg);
        } else {
          if(response.length == 0){
            this.$Message.info("本地出纳未配置");
          }
          this.radioData = response;
        }
      });
  },
  methods: {
    sumbitCashier() {
      this.cashierLoad=true;
      this.server.sumbitCashierByCompanyCode({localCashierCode:this.userCode,cashierParam:this.cashierParam}).then(response => {
        this.cashierLoad=false;
        if (response.statusCode == "-1") {
          this.$Message.error(response.msg);
        } else {
          this.$Message.success("提交成功");
          this.$emit("handleSelect");
          this.$emit("Close");
        }
      });
    }
  }
};
</script>
<style>
.cashier-name {
  margin-left: 20%;
  width: 80%;
}
.submit-button {
  margin-top: 20px;
  float: right;
  margin-right: 20px;
}
</style>

