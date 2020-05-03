<!--
  主要用于表单页面
  展开 / 隐藏 内容区域
-->
<template>
  <Card>
    <p slot="title">
      <slot name="title"></slot>
      <a href="#" class="card-extra" @click.prevent="toggleCard">
        <Icon :type="showCardConent ? 'ios-arrow-up' : 'ios-arrow-down'"></Icon>
      </a>
    </p>
    <div v-show="showCardConent">
      <slot></slot>
    </div>
  </Card>
</template>

<script>
export default {
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showCardConent: this.isShow
    };
  },
  computed: {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    toggleCard() {
      this.showCardConent = !this.showCardConent
    }
  },
  watch: {

  }
};
</script>
