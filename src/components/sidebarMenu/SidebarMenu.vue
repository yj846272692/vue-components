<template>
  <ul :class="{'side-menus':level == 1,'side-menus-light':isLight && level == 1}">
    <li 
      v-for="(item,index) in data" 
      :key="index" 
      class="litem" 
      :class="{'expanded': item.expand}"
    >
      <a 
        href="javascript:;" 
        :class="{'active':currentPageName == item.actionUrl}" 
        :style="{'padding-left':level == 1 ? '16px':'25px' , 'padding-right':level == 1 ? '13px':'11px'}" 
        @click.stop="clickHandle(item, $event)"
        @mousemove.stop="mouseOverHandle(item, $event)"
        @mouseout.stop="mouseOutHandle(item, $event)"
      >
        <!-- <Icon :type="item.iconCls || 'gear-a'"></Icon> -->
        <Icon type="ionic" v-if="!item.iconCls"></Icon>
        <Icon class="iconfont" :class="item.iconCls" v-if="item.iconCls"></Icon>
        <span>{{item.menuName}}</span>
        <template v-if="!!item.children && item.children.length > 0">
          <template v-if="level == 1">
            <!-- <i 
              class="ivu-icon arrow" 
              :class="{'ivu-icon-ios-arrow-down':item.expand,'ivu-icon-ios-arrow-right':!item.expand}" 
            > -->
            <Icon type="arrow-down-b" class="arrow"  v-if="item.expand"></Icon>
            <Icon type="arrow-right-b" class="arrow" v-if="!item.expand"></Icon>
            </i>
          </template>
          <template v-if="level > 1">
            <!-- <i class="ivu-icon arrow ivu-icon-ios-arrow-right"></i> -->
            <Icon type="arrow-right-b" class="arrow"></Icon>
          </template>
        </template>
        <div class="active-mark" v-if="currentPageName == item.actionUrl"></div>

        <template v-if="!isLight">
          <VTooltip
            v-if="item.menuDesc && item.tooltip && level >= 4" 
            :left="item.tooltip.left"
            :top="item.tooltip.top"
            :display="item.tooltip.display"
            :content="item.menuDesc"
            xplacement="right"
          />
        </template>
        <template v-if="isLight">
          <VTooltip
            v-if="item.menuName && item.tooltip && level <= 2" 
            :left="item.tooltip.left"
            :top="item.tooltip.top"
            :display="item.tooltip.display"
            :content="item.menuName"
            xplacement="right"
          />
          <VTooltip
            v-if="item.menuDesc && item.tooltip && level >= 4" 
            :left="item.tooltip.left"
            :top="item.tooltip.top"
            :display="item.tooltip.display"
            :content="item.menuDesc"
            xplacement="right"
          />
        </template>

        <div class="open-arrow" v-if="level == 2"></div>
      </a>
      <SidebarMenuv 
        class="menu-show"
        v-if="!!item.children && item.children.length > 0 && level < 2" 
        :data="item.children"
        :expand="item.expand" 
        :isLight="isLight" 
        :level="level + 1" 
        :style="{'height': item.expand ? `${ulHeight}px` : 0}">
      </SidebarMenuv>
      <SidebarMenuv
        class="menu-show" 
        v-if="!!item.children && item.children.length > 0 && level >= 2" 
        :data="item.children"
        :expand="item.expand" 
        :isLight="isLight" 
        :level="level + 1" 
        :style="{'left': `${menuPosi}px`}">
      </SidebarMenuv>
    </li>
  </ul>
</template>  

<script>
import { mapGetters } from 'vuex'
import VTooltip from '../vTooltip/Index.vue'
import SidebarMenuv from './SidebarMenu.vue';
import util from '@/tools/util.js'

export default {
  name: "SidebarMenuv",
  components: {
    VTooltip,
    SidebarMenuv
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    expand: {
      type: Boolean,
      default() {
        return false;
      }
    },
    level: {
      type: Number,
      default() {
        return 1;
      }
    },
    isLight: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      height: "auto",
      originalHeight: "",
      currentPageName: this.$route.name,
      ulHeight: 0
    };
  },
  computed: {
    ...mapGetters(['userMenuCategoryCfg', 'fyMenuLeafs']),
    tagsList() {
      return this.$store.state.tagsList;
    },
    menuPosi() {
      if (this.isLight) {
        if (this.level == 2) {
          return 60
        } else {
          return 172 + 60
        }
      } else {
        return 172 * (this.level-1)
      }
    }
  },
  created: function () { },
  beforeMount: function () { },
  mounted: function () { },
  beforeDestroy: function () { },
  destroyed: function () { },
  methods: {
    clickHandle(item, e) {
      // console.log(item, e)
      if (
        !!item.children &&
        item.children.length > 0 && 
        this.level <= 1
      ) {
        // this.toggleExpand(item, item.children.length, e);
        let ul =
          e.target.nodeName == "A"
            ? e.target.nextElementSibling
            : e.target.parentNode.nextElementSibling
        this.ulHeight = 0
        for (let h of ul.children) {
          this.ulHeight += h.offsetHeight;
        }

        this.data.map(ditem=>{
          if (ditem.menuId !==  item.menuId) {
            ditem.expand = false
          }
        })
        item.expand = !item.expand
        this.$forceUpdate()
        return;
      }


      let active = item.actionUrl.split('?')[0];
      let params = this.getParams(item.actionUrl);
      if (active !== "accesstest_index") {
        // let pageOpenedList = this.$store.state.pageOpenedList;
        // let openedPageLen = pageOpenedList.length;
        // let i = 0;
        // let tagHasOpened = false;
        // while (i < openedPageLen) {
        //   if (active === pageOpenedList[i].name) {
        //     this.$store.commit("moveToSecond", i);
        //     tagHasOpened = true;
        //     break;
        //   }
        //   i++;
        // }
        
        // if (!tagHasOpened) {
        //   let tag = this.tagsList.filter(item => {
        //     if (item.children && item.nest != 'YES') {
        //       return active === item.children[0].name;
        //     } else {
        //       return active === item.name;
        //     }
        //   });
        //   tag = tag[0];
        //   if (!tag) return;
        //   tag = tag.children ? tag.children[0] : tag;
        //   this.$store.commit("increateTag", tag);
        //   localStorage.pageOpenedList = JSON.stringify(
        //     this.$store.state.pageOpenedList
        //   ); // 本地存储已打开页面
        // }


        if(!item.children.length) { // 没有子节点的为叶子
          // 找到二级菜单添加小箭头
          this.openArrowFixed()
          let openArrow = null
          const findOpenArrow = (el) => {
            if (el.parentNode.querySelector(".open-arrow")){
              openArrow = el.parentNode.querySelector(".open-arrow")
            } else {
              findOpenArrow(el.parentNode)
            }
          }
          
          findOpenArrow(e.currentTarget)

          openArrow.className += " open-arrow-show"
          openArrow.style.visibility = 'visible'
          openArrow.style.position = 'fixed'
          openArrow.parentNode.style.background = '#222b41'


          // 点击费用申请叶子节点 带开表单页面
          if(this.fyMenuLeafs){
            let hasOpenProcess = false
            this.fyMenuLeafs.some(fmlItem => {
              if(item.menuCode === fmlItem.menuCode) {
                const hasSetCfg = this.userMenuCategoryCfg.some(umfItem => {
                  if(item.menuCode === umfItem.menuCode){
                    util.startProcess(umfItem)
                    hasOpenProcess = true
                    return true
                  }
                })
                if(!hasSetCfg){
                  this.$Message.error(`${item.menuName} 未配置菜单和业务大类关系，请前往 基础数据->业务大类菜单管理 配置`)
                }
                return true
              }
            })

            if(hasOpenProcess){
              return false
            }
          }

        }
        
        // this.$store.commit("setCurrentPageName", active);
        this.$router.push({
          name: active,
          params: params
        });
      }
    },
    mouseOverHandle(item, e) {
      // show tooltip
      // console.log("move", e)
      this.$set(item, "tooltip", {"display": "block", "left": e.pageX+20, "top": e.pageY})
      this.$forceUpdate();
    },
    mouseOutHandle(item, e) {
      // hide tooltip
      // console.log("out", e)
      this.$set(item, "tooltip", {"display": "none"})
      this.$forceUpdate();
    },
    toggleExpand(item, length, e) {
      let ul =
        e.target.nodeName == "A"
          ? e.target.nextElementSibling
          : e.target.parentNode.nextElementSibling
      let from = 0;
      let to = 0;
      let mode = "ud"
      if (item.level < 2) {
        if (!item.expand) {
          for (let h of ul.children) {
            to += h.offsetHeight;
          }
        } else {
          from = ul.offsetHeight;
        }
      } else {
        mode = "lr"
        if (!item.expand) { 
          to = 172
        } else {
          from = 172
        }
      }

      this.toggleAni(from, to, ul, mode);
      item.expand = !item.expand;

      this.$forceUpdate();
    },
    toggleAni(from, to, ul, mode) {
      Math.animation(
        from,
        to,
        value => {
          this.$nextTick(() => {
            if (mode === "ud") {
              ul.style.height = `${value}px`;
              ul.style.visibility = `visible`;
              if (to == value && to != 0) {
                ul.style.height = `100%`;
              } else if (value == 0) {
                ul.style.visibility = `hidden`;
              }
            } else {
              // console.log("value", value)
              ul.style.width = `${value}px`;
              ul.style.visibility = `visible`;
              if (to == value && to != 0) {
                ul.style.width = `172px`;
              } else if (value == 0) {
                ul.style.visibility = `hidden`;
              }
            }
          });
        },
        "Cubic.easeInOut",
        300
      );
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

    openArrowFixed(type) {
      const openArrows = document.querySelectorAll(".open-arrow")
      Array.prototype.map.call(openArrows, (oaitem)=>{
        if(type==="reset"){
          oaitem.style.visibility = 'hidden'
          oaitem.parentNode.style.background = 'none'
        }else{
          oaitem.style.position = 'absolute'
          oaitem.style.top = oaitem.parentNode.getBoundingClientRect().top + 15 + 'px'
          oaitem.style.visibility = 'hidden'
          oaitem.parentNode.style.background = 'none'
        }
      })
    },
  },
  
  watch: {
    $route(to) {
      this.currentPageName = to.name;
      localStorage.currentPageName = to.name;

      if(to.name === "home_index" || to.name === "home-page"){
        this.openArrowFixed("reset")
      }
    },
    isLight(val) {
      // if (this.level > 1) {
      //   this.$el.style.height = "0";
      // }
      // for (let d of this.data) {
      //   d.expand = false;
      // }
    }
  },
  directives: {}
};
</script>

<style lang="less">
@import "./index.less";
</style>
