<!-- 公告 -->
<template>
  <div class="convenient">Convenient</div>
</template>

<script>
export default {
  name: 'Convenient',

  components: {},

  props: {
    total: {
      type: Number,
      required: true,
      default: 0
    }
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
.convenient{
    height: 289px;
    line-height: 34px;
    font-size: 12px;
    color: #666;
}
</style>