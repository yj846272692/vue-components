<template>
  <div class="notice">
    <div class="artinfo">
      <h2 class="title">
        {{noticeTitle}}
      </h2>
      <div class="user"><span v-if="createTime">发布时间：</span>{{createTime}}</div>
      <div class="artcont" v-html="noticeContent"></div>
    </div>
    <div class="attachments" v-if="attachmentList.length">
      <div class="title"><Icon type="flag"></Icon>  附件下载：</div>
      <ol>
        <li v-for="item in attachmentList">
          <a href="javascript:void(0)" @click="downloadAttachment(item.attachId)">
            {{item.fileName}} <Icon type="archive"></Icon>
          </a>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
import Server from './server'
const server = new Server
export default {
  components: {

  },
  props: {
    noticeId: {
      type: String,
      default () {
        return ""
      }
    }
  },
  data() {
    return {
      noticeTitle: "加载中...",
      createUserName: "",
      createTime: "",
      noticeContent: "",
      attachmentList: []
    }
  },
  computed: {

  },
  created: function() {
    this.init();
  },
  beforeMount: function() {

  },
  mounted: function() {
    this.$emit("SetTitle", "查看详情");
    this.$emit('SetPageActions', [
      {
        text: "关闭",
        handle: () => {
          this.$emit('Close');
        }
      }
    ])
  },
  beforeDestroy: function() {

  },
  destroyed: function() {

  },
  methods: {
    init() {
      this.$emit("SetTitle", "");
      server.getNoticeInfo(this.noticeId)
        .then(response => {
          if (response.statusCode !== "-1") {
            const info = response.data.dataResult
            this.noticeTitle = info.noticeTitle;
            this.createUserName = info.createUserName;
            this.createTime = info.createTime;
            this.noticeContent = info.noticeContent;
          } else {
            this.$Message.error(response.msg)
          }
        })

      server.getNoticeAttaList(this.noticeId)
        .then(response => {
          if (response.statusCode !== "-1") {
            this.info = response.data.dataResult
          } else {
            this.$Message.error(response.msg)
          }
        })


    },
    downloadAttachment(attachId) {
      server.downloadAttach({attachId})
        .then(response => {
          if (response.statusCode !== "-1") {
          } else {
            this.$Message.error(response.msg)
          }
        })
    }
  },
  watch: {

  },
  directives: {

  }
}
</script>
<style lang="less" scoped>
.notice{
  min-height: 380px;
  line-height: 1.6;

  .artinfo{
    font-size: 14px;
    color: #888;
    padding-bottom: 20px;

    .title{
      padding-bottom: 5px;
      font-size: 18px;
      text-align: center;
      color: #ffa329;
    }
    .user{
      color: #999;
      font-size: 12px;
      padding-bottom: 15px;
      text-align: center;
    }
    .artcont{
      padding: 0 20px;
    }
  }

  .attachments{
    a:hover{
      text-decoration: underline;
    }

    .title{
      font-weight: bold;
      border-bottom: 1px dotted #eee;
    }

    ol{
      padding: 10px 30px;
    }

    .no{
      padding: 20px;
    }
  }
}
</style>