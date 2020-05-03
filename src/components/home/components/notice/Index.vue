<!-- 公告 -->
<template>
  <div class="notice">
    <Icon type="ios-volume-high" class="icon"></Icon>
    <Vcarousel :list="list" :lineHeight="34" v-if="list.length>0" />
    <!-- <Carousel autoplay loop dots="none" arrow="never" class="carousel" :autoplay-speed="10000">
        <CarouselItem v-for="(item, index) in list" :key="index">
            <router-link to="">
              <div class="demo-carousel">{{item.title}}</div>
            </router-link>
        </CarouselItem>
    </Carousel> -->
  </div>
</template>

<script>
import Vcarousel from './Vcarousel'
import Server from './server'
const server = new Server

export default {
  name: 'Notice',

  components: {
    Vcarousel
  },

  props: {

  },

  data () {
    return {
      list: []
    }
  },

  computed: {},

  watch: {},

  created() {
    // 拉取公告数据列表
    server.getNoticeList()
      .then(response => {
        if (response.statusCode !== "-1") {
          this.list = response.data
        } else {
          this.$Message.error(response.msg)
        }
      })
  },

  mounted() {

  },

  methods: {}
}
</script>

<style lang='less' scoped>
.notice{
    position: relative;
    height: 34px;
    line-height: 34px;
    font-size: 12px;
    color: #666;
    overflow: hidden;

    .icon{
      font-size: 30px;
      position: absolute;
      left: 15px;
      top: 50%;
      margin-top: -15px;
      color: #ffa329;
    }
}
</style>
<style lang='less'>
.notice{
  .v-carousel{
    padding-left: 52px;
  }
}
</style>