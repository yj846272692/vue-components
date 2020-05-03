<template>
  <div class="close-div">
    <Input v-model="venName" ref="vendorNameInput" icon="search" :placeholder="`请选择${typeName}`" @click.native="select()"></Input>
    <Icon type="close" class="close-btn" @click.native="clean" v-show="isShowCloseIcon"></Icon>
  </div>
</template>

<script>
import SelectVendorList from "./SelectVendorList.vue";
export default {
  name: "SelectVendor",

  components: {},

  model: {
    prop: "vendorName",
    event: "input"
  },

  props: {
    size: {
      type: String,
      default() {
        return "";
      }
    },
    employeeNo: {
      type: String,
      default() {
        return "";
      }
    },
    vendorName: {
      type: String,
      default: ""
    },
    // 供应商code
    vendorCode: {
      type: String,
      default: ""
    },
    // 归属公司code
    companyCode: {
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
    },
    buCode: {
      type: String,
      default() {
        return "";
      }
    },
    vendorType: {
      type: String,
      default() {
        return "";
      }
    }
  },

  data() {
    return {
      isShowCloseIcon: false,
      venName: this.vendorName,
      reimburseInfo: {}
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    //选择供应商
    select() {
      if (!this.companyCode) {
        console.warn("companyCode 是必传参数！");
      }
      new this.$pageModal(
        SelectVendorList,
        {
          props: {
            companyCode: this.companyCode,
            vendorCode: this.vendorCode,
            typeName: this.typeName,
            isPublic: this.isPublic,
            buCode: this.buCode,
            vendorType: this.vendorType,
            employeeNo: this.employeeNo
          }
        },
        data => {
          this.reimburseInfo = JSON.parse(JSON.stringify(data));
          this.venName = data.vendorName;
          this.$emit("selected", this.reimburseInfo);
          this.$emit("input", data.vendorName);
          this.$refs["vendorNameInput"].focus();
          this.isShowCloseIcon = true;
        }
      );
    },

    // clean() {
    //   this.reimburseInfo = {};
    //   this.venName = ""
    //   this.$emit("selected", this.reimburseInfo);
    //   this.$emit("input", "");
    // }
    // 清空选择按钮，点击后删除code和name
    clean() {
      this.reimburseInfo = {};
      this.venName = "";
      this.$emit("cleanSelected");
      this.$emit("input", "");
      this.isShowCloseIcon = false;
      this.$refs["ipt"].focus();
    }
  }
};
</script>

 <style lang='less' scoped>
.close-div {
  width: 100%;
  position: relative;
  display: inline-block;

  .close-btn {
    position: absolute;
    right: 30px;
    top: 50%;
    margin-top: -7px;
    font-size: 14px;
    color: #ff0000;
    display: none;
    cursor: pointer;
  }

  &:hover {
    .close-btn {
      display: inline-block;
    }
  }
}
</style>