<template>
  <div class="home-main">
    <Row style="margin-bottom: 0">
      <Col span="19">
        <Row style="margin-right: 15px; margin-bottom: 0">
          <!-- <Col>
            <Notice class="colbox" />
          </Col> -->
          <Col>
            <TodoList class="colbox" />
          </Col>
          <Col>
            <Board class="colbox" style="margin-top: 15px" />
          </Col>
      </Row>
      </Col>

      <Col span="5">
        <Row style="margin-bottom: 0">
          <Col>
            <Commonly 
              class="colbox" 
              title="常用申请" 
              :layerStyle="{'width': '771px'}" 
              :arrowTop="67" 
              action="1" 
              source="getCommonList"
              :menus="commonList"
            >
              <template slot="nodata">
                <img src="../../asset/images/commonly-no-data.jpg">
              </template>
            </Commonly>
          </Col>
          <Col>
            <Commonly 
              class="colbox" 
              title="快捷功能" 
              style="margin-top: 15px" 
              :layerStyle="{'width': '595px','top': '250px'}" 
              :arrowTop="122" 
              action="2" 
              source="getQuickList"
              :menus="quickList"
            >
              <template slot="nodata">
                <img src="../../asset/images/quick-no-data.jpg">
              </template>
            </Commonly>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import Notice from "./components/notice";
import TodoList from "./components/TodoList/Index.vue";
import Board from "./components/Board/Index.vue";
import Commonly from "./components/Commonly/Index.vue";

export default {
  components: {
    // Notice,
    TodoList,
    Board,
    Commonly
  },
  created: function() {
    this.GetUserMenuCategoryCfg()
  },
  data() {
    return {
    };
  },
  computed: {
    avatorPath() {
      return this.$store.state.avatar;
    },
    user() {
      return this.$store.state.userInfo;
    },
    menuList() {
      return this.$store.state.userMenuTree;
    },
    commonList() {
      let list = null
      this.menuList.some(item => {
        
        if(item.menuCode === "feiyongshenqing") {
          list = item.children
          return true
        }
      })
      return list
    },
    quickList() {
      let list = []
      const codes = ["shenpiliucheng", "dianziyingxiang", "huijichuli", "fukuangongzuotain", "chaxuntongji", ]
      codes.map(code => {
        this.menuList.map(item => {
          if(item.menuCode === code) {
            list.push(item)
          }
        })
      })
      return list
    }
  },
  methods: {
    ...mapActions(['GetUserMenuCategoryCfg']),
  }
};
</script>

<style lang="less">
@import "./home.less";
</style>
