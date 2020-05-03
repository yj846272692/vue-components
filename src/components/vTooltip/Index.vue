<!-- vTooltip -->
<template>
  <div class="v-tooltip">
    <div 
      class="v-tooltip-popper" 
      :x-placement="xplacement" 
      :style="{'left': `${left}px`,'top': `${top}px`,'display': `${display}`}"
    >
      <div class="v-tooltip-content">
        <div class="v-tooltip-arrow"></div> 
        <div class="v-tooltip-inner">{{content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VTooltip',

  components: {},

  props: {
    content: {
      type: String,
      default: ""
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    display: {
      type: String,
      default: "none"
    },
    xplacement: {
      type: String,
      default: "right"
    },
  },

  data () {
    return {
    }
  },

  computed: {},

  watch: {},

  created() {

  },

  mounted() {

  },

  methods: {}
}
</script>

<style lang='less' scoped>
.v-tooltip{
  display: inline-block;
  
  .v-tooltip-arrow{ 
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  .v-tooltip-popper {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999999;
    min-width: 50px;
    height: 17px;
    line-height: 18px;
    will-change: top, left;

    &[x-placement^="right"] {
      padding: 0 5px 0 8px;

      & .v-tooltip-arrow {
        border-right-color: fade(#000, 70%);
        border-width: 5px 5px 5px 0;
        left: 3px;
        top: 50%;
        margin-top: -5px;
      }
    }

    .v-tooltip-inner {
      background: fade(#000, 70%);
      color: #fff;
      font-size: 11px;
      padding: 0 10px;
      height: 17px;
      border-radius: 2px;
      white-space: nowrap;
      text-align: left;
      text-decoration: none;
    }

  }
}
</style>