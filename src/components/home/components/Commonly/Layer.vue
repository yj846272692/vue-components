<!-- 浮层显示分类 -->
<template>
  <div class="layer" :class="{'show': isShow == true}">
    <div class="layer-popper" x-placement="left">
      <div class="layer-content">
        <div class="layer-arrow" :style="{'top': `${arrowTop}px`}"></div> 
        <div class="layer-inner">
          
          <div class="v-tabs">
            <div class="v-tabs-bar">
              <div 
                class="v-tabs-tab" 
                v-for="(item, index) in list" 
                :key="index" 
                :class="{'v-tabs-tab-active': item.selected}"
                @mouseover="tabSelHandle(item)"
              >
                {{item.menuName}}
              </div>
            </div>
            <div class="v-tabs-content">
              <template v-if="list.length>0">
                <div class="v-tabs-tabpane" v-for="(item, index) in list" :key="index" v-show="item.selected">
                  
                  <div class="group" v-for="(groupArr, index) in item.childrenArr" :key="index">
                    <template v-for="(groupItem, gindex) in groupArr">

                      <template v-if="groupItem.children.length>0">
                        <div class="group-item">
                          <div class="title">{{groupItem.menuName}}</div>
                          <ul class="list">
                            <li v-for="(child, index) in groupItem.children" :key="index">
                              <a href="javascript:;" @click="add(child)">
                                <span>{{child.menuName}}</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </template>
                      <template v-else>
                        <ul class="list">
                          <li>
                            <a href="javascript:;" @click="add(groupItem)">
                              <span>{{groupItem.menuName}}</span>
                            </a>
                          </li>
                        </ul>
                      </template>

                    </template>
   
                  </div>
                  
                </div>
              </template>
              <template v-else>
                暂无可添加功能
              </template>
            </div>
          </div>

          <!-- <Tabs>
            <TabPane v-for="(item, index) in list" :key="index" :label="item.title" :name="item.id">
              <div class="group" v-for="(group, index) in item.children" :key="index">
                <div class="title">{{group.title}}</div>
                <ul class="list">
                  <li v-for="(child, index) in group.children" :key="index">
                    <a href="javascript:;" @click="add(child)">
                      <span>{{child.title}}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </TabPane>
          </Tabs> -->
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Server from "./server";
const server = new Server();

export default {
  name: "Layer",

  components: {},

  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    arrowTop: {
      type: Number,
      required: false
    },
    action: {
      type: Array
    },
    datas: {
      type: Array,
      default: []
    },
  },

  data() {
    return {
      // label: (h, item) => {
      //   return h('div', {
      //     on: {
      //       'mouseover': (e) => {
      //         console.log(e)
      //       }
      //     }
      //   }, 'item.title')
      // },
      // list: []
    };
  },

  computed: {
    isShow() {
      return this.show;
    },
    list() {
      return this.datas || []
    }
  },

  watch: {
    list(val, oldval) {
      if(val){
        this.list.map((item, index) => {
          this.$set(item, "selected", false);
          index === 0 && this.$set(item, "selected", true);

          // 重新组合
          this.groupMaker(item)
        });
      }
    }
  },

  created() {
    // 拉取被选择列表
    // server[this.action]().then(response => {
    //   if (response.statusCode !== "-1") {
    //     this.list = response.data;
    //     this.list.map((item, index) => {
    //       this.$set(item, "selected", false);
    //       index === 0 && this.$set(item, "selected", true);

    //       // 重新组合
    //       this.groupMaker(item)
    //     });
    //   } else {
    //     this.$Message.error(response.msg);
    //   }
    // });
  },

  mounted() {},

  methods: {
    add(item) {
      this.$emit("add", item);
    },

    tabSelHandle(tab) {
      this.list.map(item => {
        item.selected = false;
      });
      tab.selected = true;
    },

    groupMaker(item){
      // ---- 组合算法 start ----
      this.$set(item, "childrenArr", []); // 新建一个对象用于存放处理后的列表数据 [[], [] ...]

      const carr = []; // 前4个坑的长度占位
      item.children.map((citem, cindex) => {
        let citemLen = citem.children.length;
        citem.childrenCount = citemLen;

        if (cindex <= 3) {
          carr.push(citemLen); // 记录前面4个坑的列表长度
          item.childrenArr.push([citem]); // 前4个先进坑位
        }
        if (cindex > 3) {
          // 后面的依次进入列表短的那个坑
          let minCindex = carr.indexOf(Math.min(...carr)); // 找到列表最短的坑的索引
          item.childrenArr[minCindex].push(citem); // 推入前面站好的坑
          carr[minCindex] += item.childrenArr[minCindex].length
          carr[minCindex] += citemLen; // 重新统计坑里列表总长度
        }
      });
      // ---- 组合算法 end ----
    }
  }
};
</script>

<style lang='less' scoped>
.layer {
  display: none;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 11111;

  &.show {
    display: block;
  }

  &-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  &-popper {
    position: relative;
    min-width: 50px;
    will-change: top, left;

    &[x-placement^="left"] {
      padding: 0 15px 0 0;

      & .layer-arrow {
        border-left-color: fade(#2d3d63, 90%);
        border-width: 15px 0 15px 15px;
        right: 0;
        top: 50%;
      }
    }

    &[x-placement^="right"] {
      padding: 0 0 0 15px;

      & .layer-arrow {
        border-right-color: fade(#2d3d63, 90%);
        border-width: 15px 15px 15px 0;
        left: 0;
        top: 50%;
      }
    }
  }

  &-inner {
    background: fade(#2d3d63, 90%);
    color: #fff;
    font-size: 12px;
    min-height: 100px;
    border-radius: 2px;
    white-space: nowrap;
    text-align: left;
    text-decoration: none;
  }

  .v-tabs {
    max-width: 756px;
    overflow: hidden;

    .v-tabs-bar {
      color: #fff;
      font-size: 14px;
      height: 50px;
      line-height: 50px;
      border-bottom: 0;
      margin-bottom: 0;

      .v-tabs-tab {
        padding: 0 26px;
        display: inline-block;
        cursor: pointer;
        border-bottom: 2px solid transparent;
      }

      .v-tabs-tab-active {
        color: inherit;
        background: fade(#222b41, 70%);
        border-bottom: 2px solid #ffa329;
      }
    }

    .v-tabs-content {
      padding: 26px 0 14px 52px;
      min-height: 200px;
      max-height: 595px;
      overflow-y: auto;
      margin-right: -10px;
      overflow-x: hidden;

      .v-tabs-tabpane {
        color: #fff;
        font-size: 12px;
        white-space: normal;

        &:after {
          content: " ";
          display: table;
          clear: both;
        }

        > .group {
          display: inline-block;
          vertical-align: top;

          .group-item:before {
              content: " ";
              height: 1px;
              background: #a0a0a0;
              width: 126px;
              display: block;
              margin: 20px 0 25px;
              opacity: 0.7;
          }

          .group-item:nth-child(1):before {
            display: none;
          }

          .title {
            font-size: 14px;
            padding-left: 8px;
            margin-bottom: 16px;
            line-height: 14px;
          }

          ul.list {
            list-style: none;
            min-width: 164px;

            > li {
              margin-right: 12px;

              > a {
                width: 164px;
                height: 26px;
                line-height: 26px;
                display: block;
                margin-bottom: 4px;
                padding: 0 8px;
                box-sizing: border-box;
                color: #fff;
                text-decoration: none;

                &:hover {
                  background: fade(#f2f2f2, 15%);
                  color: #ffa329;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>