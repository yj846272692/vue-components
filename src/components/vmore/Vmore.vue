<!--
  任何位置内容 - 展开 / 隐藏
  <Vmore :isShow="">
    <div>....</div>
  </Vmore>
-->
<template>
  <div class="vmore">
    <div class="vmore-handle" v-if="!show"><a href="#" @click.prevent="expandHandle">展开全部 <Icon type="ios-arrow-down" /></a></div>
    <div v-show="show">
      <slot></slot>
    </div>
    <div class="vmore-handle vmore-up" v-if="show"><a href="#" @click.prevent="expandHandle">部分隐藏 <Icon type="ios-arrow-up" /></a></div>
  </div>
</template>
<script>
export default {
  name: "Vmore",
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.isShow
    };
  },
  computed: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    expandHandle() {
      this.show = !this.show
    }
  },
  watch: {},
  directives: {}
};
</script>
<style lang="less" scoped>
.vmore {
  &-handle {
    text-align: right;
    font-size: 13px;
  }
  &-up {
    padding-top: 10px;
  }
}
</style>