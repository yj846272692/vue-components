<!-- 公告 -->
<template>
  <div :style="{'min-height': minHeight}">
    <template v-if="list.length>0">
      <ul class="list">
        <li v-for="(item, index) in list" :key="index">
          <a href="#" @click.prevent="noticeInfo(item.noticeId)">
            <span>{{item.createTime}}</span>
            <span class="dot">······</span>
            <span>{{item.noticeTitle}}</span>
          </a>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="nomsg">暂无信息</div>
    </template>
  </div>
</template>
<script>
import Detail from './detail'
import Server from './server'
const server = new Server

export default {

  components: {},

  props: {
    title: {
      type: String,
      default: ""
    },
    noticeType: {
      type: String,
      required: true
    },
    minHeight: {
      type: String,
      default: ""
    },
  },

  data() {
    return {
      list: []
    }
  },

  computed: {},

  watch: {},

  created() {
    this.getList()
  },

  mounted() {
    this.$emit("SetTitle", this.title);
    this.$emit('SetPageActions', [
      {
        text: "关闭",
        handle: () => {
          this.$emit('Close');
        }
      }
    ])
  },

  methods: {
    getList() {
      // server.getNewsList(this.noticeType)
      server.getNewsList()
        .then(response => {
          if (response.statusCode !== "-1") {
            this.list = response.data.dataResult
          } else {
            this.$Message.error(response.msg)
          }
        })
    },
    noticeInfo(noticeId) {
      new this.$pageModal(
        Detail, {
          props: {
            noticeId
          }
        }
      )
    },
  }
}
</script>
<style lang='less' scoped>
.list {
  font-size: 13px;
  color: #666;
  line-height: 13px;
  margin: 0;
  padding: 5px 0 0;
  list-style: none;

  >li {
    padding-bottom: 16px;
    padding-left: 22px;
    padding-right: 22px;
    color: inherit;

    a:link,
    a:visited,
    {
      color: inherit;
    }

    a:hover {
      text-decoration: underline;
    }
  }

  .dot {
    font-size: 9px;
  }
}
.nomsg{
  text-align: center;
  color: #666;
}
</style>
