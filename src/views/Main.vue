<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // if (!sessionStorage.crctoken) {
    //   this.$Modal.info({
    //     title: "温馨提示",
    //     content: "<p>请先登录，然后再测试组件！</p>"
    //   });
    // }
  }
};
</script>

<style>
/* .wrapper-container {
  margin-top: 15px;
  height: inherit;
}
.wrapper-content {
  background-color: rgb(241, 241, 234);
} */
</style>
