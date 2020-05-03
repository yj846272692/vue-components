<template>
  <div id="main" class="mains" :class="{'mains-hide-text': hideMenuText}">
    <!-- 左侧导航 -->
    <div 
      class="sidebar-menu-con" 
      :style="{width: hideMenuText?'60px':'172px', height: `${WIN.height}px`}">
      <!-- logo -->
      <div class="logo-con">
        <div class="show-logo" v-show="!hideMenuText">
          <img :src="logo" v-if="logo">
          <img src="../../asset/images/logo.png" v-else>
        </div>
        <div v-show="hideMenuText">
          <img :src="logoMain" v-if="logoMain" style="width:40px;height:40px;margin:10px 9px 3px 10px">
          <img src="../../asset/images/logo-min.jpg" v-else style="width:40px;height:40px;margin:10px 9px 3px 10px">
        </div>
      </div>
      <div class="sidebar-wrapper" :style="{height: `${WIN.height - 80}px`}">
        <SidebarMenus :isLight="hideMenuText" :data="menuList" :iconSize="14" />
      </div>
    </div>

    <div class="mains-wrap">

      <!-- 头部 -->
      <div class="mains-header-con" :style="{paddingLeft: hideMenuText?'0px':'0px'}">
        <!-- 横向导航add：“show-Hnav-mains” -->
        <div class="mains-header">
          <!-- 横向导航按钮 -->
          <!-- <div class="show-Hnav"><span></span></div> -->
          <!-- 面包屑 -->
          <!-- <div class="header-middle-con">
            <div class="mains-breadcrumb">
              <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
            </div>
          </div> -->

          <div class="navicon-con navibtn">
            <Button style="padding:0;" :style="{transform: 'rotateZ(' + (this.hideMenuText ? '180' : '0') + 'deg)', transition: 'transform 0.3s', 'margin-top': (this.hideMenuText ? '-6px' : '0')}" type="text" @click="toggleClick">
              <Icon class="iconfont icon-dingbudaohang-shousuo" size="18"></Icon>
            </Button>
          </div>
          <div class="navicon-con home-navi" style="width:auto">
            <Button type="text" @click="HandleToHome">
              <router-link to="/home">
                <Icon class="iconfont icon-dingbudaohang-shouye" size="22" style="vertical-align: middle"></Icon>
                <span style="vertical-align: middle">财务报账系统</span>
              </router-link>
            </Button>
          </div>

          <!-- 用户头像名称 -->
          <div class="header-avator-con" v-if="user">

            <div class="user-dropdown-menu-con">
              <Row justify="end" align="middle" class="user-dropdown-innercon">
                <Avatar :src="avatorPath" class="avatar"></Avatar>
                <!-- <Avatar src="http://img2.imgtn.bdimg.com/it/u=382977776,1919891652&fm=26&gp=0.jpg" class="avatar"></Avatar> -->
                <Dropdown @on-click="onRoleChange">
                  <a href="javascript:void(0)">
                    <span class="mains-user-name" :class="{'underline': roleList.length > 1}" :title="user.userName">{{roleName}} - {{ user.userName }}</span>
                  </a>
                  <DropdownMenu slot="list">
                    <!-- <DropdownItem name="ownSpace">{{$t('module.main.personalCenter')}}</DropdownItem>
                    <DropdownItem name="loginout">{{$t('module.main.logout')}}</DropdownItem> -->
                    <DropdownItem :name="item.roleId" v-for="item in roleList" :key="item.roleId">{{ item.roleName }}</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Row>
            </div>

            <!-- 建议反馈 -->
            <Dropdown class="icon-btn" @on-click="handleClickUserDropdown">
              <Icon class="iconfont icon-dingbudaohang-bangzhusvg" :size="20"></Icon>
              <DropdownMenu slot="list">
                <DropdownItem name="">操作手册</DropdownItem>
                <DropdownItem name="feedback">反馈建议</DropdownItem>
                <DropdownItem name="">联系电话</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <!-- <div class="icon-btn" @click="feedback">
              <Tooltip :content="$t('module.main.feedback')" placement="bottom">
                <Icon class="iconfont icon-dingbudaohang-bangzhusvg" :size="20"></Icon>
              </Tooltip>
            </div> -->
            <!-- <div @click="handleFullScreen" v-if="showFullScreenBtn" class="icon-btn">
              <Tooltip :content="isFullScreen ? $t('module.main.exitFullScreen') : $t('module.main.fullScreen')" placement="bottom">
                <Icon :type="isFullScreen ? 'arrow-shrink' : 'arrow-expand'" :size="20"></Icon>
              </Tooltip>
            </div> -->
            <!-- <div @click="lockScreen" class="lock-screen-btn-con">
              <Tooltip content="锁屏" placement="bottom">
                <Icon type="locked" :size="18"></Icon>
              </Tooltip>
            </div> -->

            <Dropdown class="icon-btn" @on-click="langChange">
              <Icon class="iconfont icon-dingbudaohang-jiantizhongwen" :size="20" v-if="$lang === 'zh-CN'"></Icon>
              <Icon class="iconfont icon-dingbudaohang-fantizhongwen" :size="20" v-if="$lang === 'zh-TW'"></Icon>
              <Icon class="iconfont icon-dingbudaohang-yingwen" :size="20" v-if="$lang === 'en-US'"></Icon>
              <DropdownMenu slot="list">
                <DropdownItem :name="item.langCode" v-for="item in languageList" :key="item.langCode">{{ item.langDesc }}</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown class="icon-btn" @on-click="handleClickUserDropdown">
              <Icon class="iconfont icon-dingbudaohang-tuichuxitong" :size="20"></Icon>
              <DropdownMenu slot="list">
                <DropdownItem name="loginout">{{$t('module.main.logout')}}</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <!-- <div class="choose-admin">
              <Select size="small" v-model="roleModel" @on-change="onRoleChange" style="min-width:auto;">
                <Option v-for="item in roleList" :title="item.roleName" :value="item.roleId" :key="item.roleId">{{ item.roleName }}</Option>
              </Select>
            </div>
            <Select size="small" v-model="lang" @on-change="langChange" style="min-width:auto;">
              <Option v-for="item in languageList" :title="item.langDesc" :value="item.langCode" :key="item.langCode">{{item.langDesc}}</Option>
            </Select> -->

          </div>

        </div>

      </div>

      <div class="single-pages-con" :style="{height: `${WIN.height-48}px`}">
        <!-- tags -->
        <!-- <div class="tags-con">
          <Button class="left carousel-arrow" type="ghost" size="small" @click.native="tagsPageSlide(0)">
            <Icon type="chevron-left"></Icon>
          </Button>
          <tags-page-opened ref="tagsPageOpened" :pageTagsList="pageTagsList"></tags-page-opened>
          <Button class="right carousel-arrow" type="ghost" size="small" @click.native="tagsPageSlide(1)">
            <Icon type="chevron-right"></Icon>
          </Button>
        </div> -->
        <div class="single-pages">
          <!-- <div class="single-wrapper"> -->
          <!-- <ActionBar></ActionBar> -->
          <keep-alive :include="cachePage">
            <router-view class="single-wrappers"></router-view>
          </keep-alive>
          <!-- </div> -->
        </div>
        <div class="single-page"></div>
      </div>

    </div>
    <!-- 版权信息 -->
    <!--<div class="copyright">{{$t('module.main.copyright')}}</div>-->

    <div>{{menuToolTip.title}}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SidebarMenus from '../sidebarMenu/SidebarMenu.vue';
// import tagsPageOpened from "../components/tagsPageOpened.vue";
// import breadcrumbNav from "../components/breadcrumbNav.vue";
// import themeDropdownMenu from "../components/themeDropdownMenu.vue";
import Cookies from "js-cookie";
import util from "@/tools/util.js";
// import ActionBar from "../components/ActionBar.vue";

// import MenuList from "./menulist"


const getWinSize = () => {
  const docEl = window.document.documentElement
  return {
    width: docEl.clientWidth,
    height: docEl.clientHeight
  }
}

export default {
  components: {
    SidebarMenus,
    // ActionBar,
    // tagsPageOpened,
    // breadcrumbNav,
    // themeDropdownMenu
  },
  data() {
    return {
      WIN: getWinSize(),
      theme1: 'dark',
      spanLeft: 4,
      spanRight: 20,
      currentPageName: "",
      hideMenuText: false,
      userName: "",
      showFullScreenBtn: window.navigator.userAgent.indexOf("MSIE") < 0,
      isFullScreen: false,
      messageCount: 0,
      lockScreenSize: 0,
      roleList: [],
      roleName: "",
      languageList: [],
      lang: '',
      currentLang: "",
      menuToolTip: {}
    };
  },
  computed: {
    logoMain() {
      return this.$App.logoMain
    },
    logo() {
      return this.$App.logo
    },
    menuList() {
      return this.$store.state.userMenuTree;
      // return MenuList // 测试菜单
    },
    tagsList() {
      return this.$store.state.tagsList; // 所有页面的页面对象
    },
    cachePage() {
      return this.$store.state.cachePage;
    },
    pageTagsList() {
      return this.$store.state.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.currentPath; // 当前面包屑数组
    },
    menuIconColor() {
      return this.$store.state.menuTheme === "dark" ? "white" : "#495060";
    },
    avatorPath() {
      return this.$store.state.avatar;
    },
    user() {
      return this.$store.state.userInfo;
    },
    userEmpInfo() {
      return this.$store.state.userEmpInfo;
    }
  },
  methods: {
    ...mapActions(['FindCurrentEmployee']),
    langChange(langCode) {
      this.lang = langCode
      this.$nextTick(() => {
        $store.dispatch("ChangeLang", { language: this.lang }).then(response => {
          this.onRoleChange(this.roleModel);
        })
        this.$store.commit('setLang', this.lang);
        window.localStorage["language"] = this.lang;
      })
    },
    init() {
      this.$store.commit("setCurrentPageName", this.$route.name);
      let pathArr = util.setCurrentPath(this, this.$route.name);
      if (pathArr && pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      let messageCount = 3;
      this.messageCount = messageCount.toString();
    },
    toggleClick() {
      this.hideMenuText = !this.hideMenuText;
      $channel.$emit("ToggleSidebarMenu");
    },
    feedback() {
      util.openPage(this, "feedback", this.$t('module.main.feedback'));
    },
    handleClickUserDropdown(name) {
      switch (name) {
        case "ownSpace":
          util.openPage(this, "ownspace_index", this.$t('module.main.personalCenter'));
          break;
        case "loginout":
          this.loginout();
          break;
        case "feedback":
          util.openPage(this, "feedback", this.$t('module.main.feedback'));
          break;
      }
    },
    loginout() {
      this.$Spin.show({
        render: (h) => {
          return h('div', [
            h('Icon', {
              'class': 'demo-spin-icon-load',
              props: {
                type: 'load-c',
                size: 18
              }
            }),
            h('div', this.$t('module.main.islogout'))
          ])
        }
      });
      this.$store.dispatch('Logout').then(() => {
        //登出时清除localStorage中语言值
        window.localStorage.language = "";
        this.$Spin.hide();
        this.$store.commit("clearOpenedSubmenu");
        if (!!process.env.API.sso) {
          window.location.href = `http://portaluat.crc.com.cn/oamsso/logout.html`
          return;
        }
        this.$router.push({
          name: "login"
        });
      })
    },
    handleFullScreen() {
      let main = document.getElementById("main");
      if (this.isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen();
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen();
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen();
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen();
        }
      }

      // setTimeout(()=>{
      //   this.WIN = getWinSize()
      // }, 600)
    },
    lockScreen() {
      let lockScreenBack = document.getElementById("lock_screen_back");
      lockScreenBack.style.transition = "all 3s";
      lockScreenBack.style.zIndex = 10000;
      lockScreenBack.style.boxShadow =
        "0 0 0 " + this.lockScreenSize + "px #667aa6 inset";
      this.showUnlock = true;
      this.$store.commit("lock");
      Cookies.set("last_page_name", this.$route.name); // 本地存储锁屏之前打开的页面以便解锁后打开
      setTimeout(() => {
        lockScreenBack.style.transition = "all 0s";
        this.$router.push({
          name: "locking"
        });
      }, 800);
    },
    getUrl(list, data) {
      list.push(data);
      if (!!data.children && data.children.length > 0) {
        for (let c of data.children) {
          this.getUrl(list, c);
        }
      }
    },
    tagsPageSlide(type) {
      // this.$refs["tagsPageOpened"].tagsPageSlide(type == 0 ? 120 : -120);
    },
    showUserRoleMenus(data) {
      if (!data) return;
      $store.commit("setUserInfo", data.userInfo);
      $store.commit("setUserMenuTree", data.userMenuList);
      let menus = [];
      let actionUrl = [];
      for (let m of data.userMenuList) {
        this.getUrl(menus, m);
      }
      for (let u of menus) {
        if(u.actionUrl != null && u.actionUrl != " ")
          actionUrl.push(u.actionUrl);
      }
      $store.commit("setScopeUrl", actionUrl.join(","));
      $store.commit("setUserMenu", menus);
      $store.commit("setOpenedList");
      // 用户操作权限
      $store.commit("setOptionRight", data.rightBtnList);
      // 维度操作类型
      $store.commit("setDimensionOperationType", data.dimensionObjectType);
    },
    onRoleChange(roleId) {
      $store.dispatch("ChangeRole", { "roleId": roleId }).then(response => {
        if (response.statusCode == "0") {
          // 展现用户当前角色的功能
          this.showUserRoleMenus(response.dataResult);
          // 关闭当前功能
          //localStorage.removeItem('pageOpenedList');
          $store.commit('setOpenedList');
          $store.commit('clearCachePage');
          //全局通知角色切换
          $store.commit('setRoleModule',roleId);
          // this.$router.push({
          //   name: $store.getters.homePage.name
          // });

          this.getRoleName(roleId)

        }
      });
    },
    getRoleName(roleId) {
      this.roleList.map(item => {
        if(item.roleId === roleId){
          this.roleName = item.roleName
        }
      })
    },
    HandleToHome() {
      const openArrowShow = document.querySelector(".open-arrow-show")
      if(openArrowShow){
        openArrowShow.style.visibility = "hidden"
        openArrowShow.parentNode.style.background = "none"
      }
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
    },
    hideMenuText(val, oldVal){
      // 菜单缩起来后添加一个class
      let cls = document.body.className
      if(val){
        document.body.className += " app-main-big"
      }else{
        if(cls.indexOf("app-main-big") > -1){
          document.body.className = cls.replace("app-main-big", "")
        }
      }
    }
  },
  mounted() {
    this.init();
    // 全屏相关
    document.addEventListener("fullscreenchange", () => {
      this.isFullScreen = !this.isFullScreen;
    });
    document.addEventListener("mozfullscreenchange", () => {
      this.isFullScreen = !this.isFullScreen;
    });
    document.addEventListener("webkitfullscreenchange", () => {
      this.isFullScreen = !this.isFullScreen;
    });

    // IE监听全屏事件的事件名称需要大写
    document.addEventListener("MSFullscreenChange", () => {
      this.isFullScreen = !this.isFullScreen;
    });
    // 锁屏相关
    let lockScreenBack = document.getElementById("lock_screen_back");
    let x = document.body.clientWidth;
    let y = document.body.clientHeight;
    let r = Math.sqrt(x * x + y * y);
    let size = parseInt(r);
    this.lockScreenSize = size;
    window.addEventListener("resize", () => {
      let x = document.body.clientWidth;
      let y = document.body.clientHeight;
      let r = Math.sqrt(x * x + y * y);
      let size = parseInt(r);
      this.lockScreenSize = size;
      lockScreenBack.style.transition = "all 0s";
      lockScreenBack.style.width = lockScreenBack.style.height = size + "px";

      //------window 宽高-------
      this.WIN = getWinSize()
    });
    lockScreenBack.style.width = lockScreenBack.style.height = size + "px";
  },
  created() {

    $store.dispatch("GetUserMenus").then(res => {
      // 展现用户当前角色的功能
      this.showUserRoleMenus(res);
      // 加载用户角色列表
      this.lang = res.userLocale;
      this.currentLang = res.userLocale;
      for (const key in res.userRoleList) {
        if (res.userRoleList.hasOwnProperty(key)) {
          const value = res.userRoleList[key];
          this.roleList.push({ "roleId": key, "roleName": value });
        }
      }
      this.roleModel = res.userRoleCurrent;
      this.getRoleName(res.userRoleCurrent)
    });

    //用户偏好值在登录时设置到主页
    if (window.localStorage.language) {
      this.lang = window.localStorage.language;
    } else {
      this.lang = this.currentLang;
    }
    $store.dispatch("QueryLanguages", "").then(response => {
      //加载语言列表
      for (const i in response) {
        this.languageList.push({ "langDesc": response[i].langDesc, "langCode": response[i].langCode });
      }
    });
    $store.dispatch("GetAvatar");
    $channel.$on("LoginOutEvent", () => {
      this.$store.commit("clearOpenedSubmenu");
      if (!!process.env.API.sso) {
        window.location.href = `http://portaluat.crc.com.cn/oamsso/logout.html`;
        return;
      }
      this.$router.push({
        name: "login"
      });
    });

    // 当前登陆用户
    this.FindCurrentEmployee()
  }
};
</script>

<style lang="less">
  @import "./main.less";
</style>
