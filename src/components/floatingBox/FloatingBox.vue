<!--
  表单页面 浮动到右边的小窗口
  可以打开、可以按住标题区域拖动窗口
  <FloatingBox>
    <template slot="title"></template>
    ...内容...
  </FloatingBox>
-->
<template>
    <div
      class="money-container" 
      v-bind:class="{hidden: !showFlag, draging: drag>0}"
      :style="{'top': mTop,'left': mLeft}" 
    >
      <div class="shrink" @click="toogle">
        <Icon class="icon iconfont" :class="showFlag ? 'icon-shuangjiantou reversalX' : 'icon-jinefuchuangicon'" type="none" :size="showFlag ? 12 : 18" />
        <Icon class="icon iconfont icon-shuangjiantou floati" type="none" size="14" v-if="!showFlag" />
      </div>
      <Card class="money-content">
        <p 
          slot="title"
          @mousedown="handelMD($event)"
          @mouseup="handelMU($event)"
        >
          <slot name="title"></slot>
        </p>

        <slot></slot>

      </Card>
    </div>
 
</template>
<script>
export default {
  name: "FloatingBox",
  props: {},
  components: {},
  data() {
    return {
      showFlag: false,
      drag: -1,
      mTop: "50%",
      mLeft: "auto",
      initTop: 0,
      initLeft: 0
    };
  },
  computed: {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {
    window.addEventListener("mousemove", this.handelMV);
  },
  beforeDestroy: function() {
    window.removeEventListener("mousemove", this.handelMV);
  },
  destroyed: function() {},
  methods: {
    toogle() {
      this.showFlag = !this.showFlag;
      this.mLeft = "auto";
      this.mTop = "50%";
      this.drag = -1;
    },
    handelMD(e) {
      this.drag = 1;
      this.initTop = e.offsetY;
      this.initLeft = e.offsetX;
      this.handelMV(e);
    },
    handelMU(e) {
      this.drag = 2;
    },
    handelMV(e) {
      if (this.drag === 1) {
        this.mTop = `${e.clientY - this.initTop}px`;
        this.mLeft = `${e.clientX - this.initLeft}px`;
      }
    }
  },
  watch: {},
  directives: {}
};
</script>