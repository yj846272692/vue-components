<!-- 
  全局样式
  这个组件只是为了让全局样式能够以组件方式引入从而实现只维护一处让不同项目能够共享
 -->
<template>
  <div></div>
</template>
<script>
export default {
  name: 'GlobalStyles'
}
</script>

<style>
@import "./iconfont/iconfont.css";
</style>

<style lang="less">
@import "./index.less";
</style>
