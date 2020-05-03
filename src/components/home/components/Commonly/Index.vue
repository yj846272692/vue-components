<!-- 常用 / 快捷 功能 -->
<template>
  <div class="commonly">
    <Card :bordered="false">
        <p slot="title">{{title}}</p>
        <a 
          href="javascript:" 
          class="more" 
          :class="{'showMore' :layer.show}"
          slot="extra"
          @mouseover.stop="showMore"
          @mouseout.stop="hideMore(0.5)"
        >
          添加更多
        </a>
        <div class="nodata" v-if="list.length <= 0">
          <div class="nodata-arrow">
            <img src="../../../../asset/images/commonly-arrow.jpg">
          </div>
          <div class="nodata-tip">
            <slot name="nodata"></slot>
          </div>
        </div>

        <div class="apps">
          <Draggable v-model="list" @start="onDragStart" @end="onDragEnd" :options="{animation: 300}">
            <transition-group name="list-complete" tag="div">
              <div 
                class="app list-complete-item" 
                :class="{'animate': !draging}" v-for="(item, index) in list" :key="item.menuId"
                @mousemove.stop="mouseOverHandle(item, $event)"
                @mouseout.stop="mouseOutHandle(item, $event)"
              >
                <div class="app-inner">
                  <a href="#" @click.prevent="actionUrlHandle(item)">
                    <div class="icon"><img v-if="item.iconCls" :src="require(`../../../../asset/menus/${item.iconCls}.png`)" /></div>
                    <div class="title">{{item.menuName}}</div>
                  </a>
                  <Icon type="close-circled" @click="remove(index, item)"></Icon>
                </div>
                <VTooltip
                  v-if="item.favoriteDesc && item.tooltip" 
                  :left="item.tooltip.left"
                  :top="item.tooltip.top"
                  :display="item.tooltip.display"
                  :content="item.favoriteDesc"
                  xplacement="right"
                />
              </div>
            </transition-group>
          </Draggable>
        </div>

    </Card>

    <Layer 
      :datas="menus"
      :action="source"
      :show="layer.show" 
      style="right: 95px"
      :style="layerStyle" 
      :arrowTop="arrowTop"
      @add="item => add(item)"
      @mouseover.native="showMore"
      @mouseout.native="hideMore()"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VTooltip from '../../../vTooltip/Index.vue'
import Draggable from "vuedraggable";
import Layer from "./Layer";
import util from '@/tools/util.js'
import Server from "./server";
const server = new Server();

export default {
  name: "Commonly",

  components: {
    Draggable,
    Layer,
    VTooltip
  },

  props: {
    title: {
      type: String
    },
    layerStyle: {
      type: Object
    },
    arrowTop: {
      type: Number
    },
    action: {
      type: String
    },
    source: {
      type: String
    },
    menus: {
      type: Array,
      default: []
    },
  },

  data() {
    return {
      layer: {
        show: false
      },
      list: [],
      moreTimer: null,
      draging: false
    };
  },

  computed: {
    ...mapGetters(['userMenuCategoryCfg']),
  },

  watch: {},

  created() {
    // 拉取已选择列表
    server.getList({homeType: this.action}).then(response => {
      if (response.statusCode !== "-1") {
        this.list = response.dataResult.userHomeMenuList;
      } else {
        this.$Message.error(response.msg);
      }
    });
  },

  mounted() {
    //为了防止火狐浏览器拖拽的时候以新标签打开
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
  },

  methods: {
    showMore() {
      if (this.moreTimer !== null) {
        clearTimeout(this.moreTimer);
      }
      this.layer.show = true;
    },

    hideMore(delay) {
      const hide = () => {
        this.layer.show = false;
      };
      if (delay) {
        this.moreTimer = setTimeout(hide, delay * 1000);
      } else {
        hide();
      }
    },

    add(item) {
      const has = this.list.some(app => {
        return app.menuCode === item.menuCode;
      });
      if (has) {
        return this.$Message.warning("已经添加过了");
      }


      server.add({homeType: this.action, menuId: item.menuId}).then(response => {
        if (response.statusCode !== "-1") {

          this.list.unshift(item);
          if (this.list.length > 6) {
            this.list.pop();
          }
          this.hideMore(); // 选择后关闭 浮层

          this.$Message.success("添加成功");
        } else {
          this.$Message.error(response.msg);
        }
      });
    },

    remove(index, item) {
      
      server.del({homeType: this.action, menuId: item.menuId}).then(response => {
        if (response.statusCode !== "-1") {
          
          this.list.splice(index, 1);

        } else {
          this.$Message.error(response.msg);
        }
      });
    },

    onDragStart(event) {
      event.preventDefault();
      this.draging = true
    },

    onDragEnd(event) {
      event.preventDefault();
      console.log("拖动前的索引 :" + event.oldIndex);
      console.log("拖动后的索引 :" + event.newIndex);
      // console.log(this.list);

      this.draging = false

      server.sort({homeType: this.action, menuId: this.list[event.newIndex].menuId, sort: event.newIndex+1}).then(response => {
        if (response.statusCode !== "-1") {

        } else {
          this.$Message.error(response.msg);
        }
      });
    },
    mouseOverHandle(item, e) {
      this.$set(item, "tooltip", {"display": "block", "left": e.pageX+20, "top": e.pageY})
      // this.$forceUpdate();
    },
    mouseOutHandle(item, e) {
      this.$set(item, "tooltip", {"display": "none"})
      // this.$forceUpdate();
    },
    actionUrlHandle(item) {
      if(this.action == "1"){ // 常用申请
        const hasSetCfg = this.userMenuCategoryCfg.some(umfItem => {
          if(item.menuCode === umfItem.menuCode){
            util.startProcess(umfItem)
            return true
          }
        })
        if(!hasSetCfg){
          this.$Message.error(`${item.menuName} 未配置菜单和业务大类关系，请前往 基础数据->业务大类菜单管理 配置`)
        }
      }else{
        let active = item.actionUrl.split('?')[0];
        let params = this.getParams(item.actionUrl);
        if(active){
          this.$router.push({
            name: active,
            params: params
          });
        }else{
          this.$Message.error(`${item.menuName} 未配置跳转地址，请前往 系统管理->功能管理 设置`)
        }
      }
    },
    getParams(url) {
      let params = {};
      let paramStr = url.split("?")[1];
      if(!paramStr) {
        // 没有参数时
        return params;
      }
      let paramArr = paramStr.split('&');
      paramArr.forEach(element => {
        var str = element.split('=');
        params[str[0]] = str[1];
      });
      return params;
    },
  }
};
</script>

<style lang='less'>
.commonly {
  min-width: 230px;
  height: 283px;
  font-size: 12px;
  color: #666;

  .ivu-card {
    &:hover {
      box-shadow: none;
    }

    // a.more:hover {
    //   .layer {
    //     display: block;
    //   }
    // }

    .ivu-card-head {
      border-bottom: 0;
      padding: 8px 15px 0;

      p {
        font-size: 14px;
      }
    }

    .ivu-card-head p,
    .ivu-card-head-inner {
      color: #333;
    }

    .ivu-card-extra {
      top: 0;
      right: 0;

      a {
        font-size: 12px;
        text-decoration: underline;
        padding: 8px 16px 10px 0;
        display: inline-block;
        color: #666;
      }

      a:hover,
      a.showMore {
        color: #ffa329;
      }
    }

    .ivu-card-body {
      padding: 10px 20px 10px;

      .ivu-row {
        margin-bottom: 0;
      }
    }

    .nodata {
      text-align: center;

      &-arrow {
        position: absolute;
        right: 24px;
        top: 35px;
      }

      &-tip {
        margin-top: 25px;
      }
    }
  }

  .apps {
    line-height: 0;
  }

  .app {
    width: 50%;
    height: 74px;
    display: inline-block;

    &-inner {
      position: relative;
    }

    a {
      color: #333;
      height: inherit;
      display: block;
      padding-top: 10px;
    }

    a:hover {
      text-decoration: underline;
    }

    .icon {
      width: 32px;
      height: 32px;
      line-height: 32px;
      display: block;
      margin: 0 auto;
      text-align: center;
      font-size: 0;

      > img {
        display: inline-block;
        vertical-align: middle;
      }
    }

    .title {
      text-align: center;
      padding: 0 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 26px;
    }

    .ivu-icon {
      color: #ffa329;

      &-close-circled {
        position: absolute;
        right: -5px;
        top: -5px;
        z-index: 9;
        display: none;
        cursor: pointer;
      }
    }

    &:hover {
      background: #f3f3f3;

      .ivu-icon-close-circled {
        display: inline-block;
      }
    }
  }

  .list-complete-item {
    
    &.animate {
      transition: all 0.3s;
    }

    &[draggable=true]{
      box-shadow: 0 0 4px #eee;

      .app-inner{
        opacity: 0.5;
      }
      
    }

  }
  .list-complete-enter,
  .list-complete-leave-to {
    opacity: 0;
    transform: scale(0);
  }
  .list-complete-leave-active {
    position: absolute;
  }

  .sortable-ghost {
    opacity: 0;
  }
}
</style>