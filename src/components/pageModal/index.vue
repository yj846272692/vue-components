<template>
  <div>
    <div class="core-modal-mask"></div>
    <div class="core-modal-wrap">
      <transition :name="'sidelip-down-modal'" @after-leave="afterLeave" @after-enter="afterEnter">
        <div class="core-modal" :style="{'width':width+'px'}" v-if="state > -99" style="height: calc(100% - 110px);">
          <a class="ivu-modal-close" @click="hide">
            <i class="ivu-icon ivu-icon-ios-close-empty"></i>
          </a>
          <div class="core-modal-header">
            <h2>{{title}}</h2>
          </div>
          <div class="core-modal-body" style="max-height: calc(100% - 96px);" >
            <slot></slot>
          </div>
          <div class="core-modal-footer">
            <Button class="page-modal-btn" :loading="item.loading" @click.native="item.handle()" v-for="(item,index) in actions" :key="index" :type="item.theme" :icon="item.icon" >{{item.text}}</Button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<style lang="less">
@import "./index.less";
</style>
<script>
export default {
  name: 'PageModal',
  components: {

  },
  props: {

  },
  data() {
    return {
      state: -99,
      actions: [],
      title: '',
      width: 600
    }
  },
  computed: {

  },
  created: function () {

  },
  beforeMount: function () {

  },
  mounted: function () {
    this.state = -1;
  },
  beforeDestroy: function () {

  },
  destroyed: function () {
    document.body.removeChild(this.$el);
  },
  methods: {
    hide() {
      this.state = -99;
    },
    setTitle(title) {
      this.title = title
    },
    setPageActions(actions) {
      this.actions = actions;
    },
    setSize(width) {
      this.width = width;
    },
    afterLeave() {
      this.$destroy();
    },
    afterEnter() {
        this.state = 0;
    }
  },
  watch: {

  },
  directives: {

  }
}
</script>
