<!-- 公告 -->
<template>
  <div class="board">
    <Tabs v-model="curType">
      <TabPane :label="labels.NEWS" name="NEWS">
        <Notices noticeType="NEWS" />
      </TabPane>
      <TabPane :label="labels.DOCUMENT" name="DOCUMENT">
        <Notices noticeType="DOCUMENT" />
      </TabPane>
    </Tabs>
    <a href="#" class="more" @click.prevent="moreHandle">查看更多</a>
  </div>
</template>
<script>
import Notices from './notices'
import Detail from './detail'
import Server from './server'
const server = new Server

export default {
  name: 'Board',

  components: {
    Notices
  },

  props: {
  },

  data() {
    return {
      labels: {
        NEWS: "信息公告",
        DOCUMENT: "文档下载"
      },
      list: [],
      curType: "NEWS"
    }
  },

  computed: {},

  watch: {},

  created() {
  },

  mounted() {

  },

  methods: {
    moreHandle() {
      new this.$pageModal(
        Notices, {
          props: {
            title: this.labels[this.curType],
            noticeType: this.curType,
            minHeight: "350px"
          }
        }
      )
    }
  }
}
</script>
<style lang='less' scoped>
.board {
  height: 150px;
  line-height: 34px;
  font-size: 12px;
  color: #666;

  a.more {
    position: absolute;
    right: 15px;
    top: 2px;
    text-decoration: underline;

    &:link,
    &:visited {
      color: #666;
    }

    &:hover {
      color: #ffa329;
    }
  }

}
</style>
<style lang='less'>
.board {
  .ivu-tabs-bar {
    border-bottom: none;
  }
  .ivu-tabs-ink-bar {
    height: 1px;
  }
  .ivu-tabs-tab{
    font-weight: bold;
  }
  .ivu-tabs-content{
    padding: 0;
  }
}
</style>