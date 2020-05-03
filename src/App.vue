
<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                    <Icon type="ios-navigate"></Icon>
                    <router-link :to="{ path: 'v-table'}">Table组件</router-link>
                    </MenuItem>
                    <MenuItem name="1-2">
                    <Icon type="ios-search"></Icon>
                    <router-link :to="{ path: 'data-select-test'}">下拉选择组件</router-link>
                    </MenuItem>
                    <MenuItem name="1-3">
                    <Icon type="ios-settings"></Icon>
                    <router-link :to="{ path: 'business-type-tree'}">tree组件</router-link>
                    </MenuItem>
                    <MenuItem name="1-4">
                    <Icon type="ios-navigate"></Icon>
                    <router-link :to="{ path: 'select-business-type'}">弹出框组件</router-link>
                    </MenuItem>
                    <MenuItem name="1-5">
                    <Icon type="ios-search"></Icon>
                    <router-link :to="{ path: 'pay-way-info'}">弹出框显示表单</router-link>
                    </MenuItem>
                    <MenuItem name="1-6">
                    <Icon type="ios-settings"></Icon>
                    <router-link :to="{ path: 'edite-vendor-info'}">弹出框显示表单</router-link>
                    </MenuItem>
                    <MenuItem name="1-7">
                    <Icon type="ios-navigate"></Icon>
                    <router-link :to="{ path: 'select-vendor'}">弹出框显示table</router-link>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <div style="display:inline">
                        <img src="../user.jpg" @click="collapsedSider">
                    </div>
                    <div class="headDes">
                        <h2>vue组件库</h2>
                    </div>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <router-view />
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      debugger;
      this.$refs.side1.toggleCollapse();
    }
  }
};
</script>
<style scoped>
img {
  border-style: none;
  margin-left: 2px;
  width: 60px;
  height: 60px;
}

.headDes {
  float: right;
  margin-right: 50%;
}
.layout {
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.ivu-layout.ivu-layout-has-sider {
  height: 100%;
  -ms-flex-direction: row;
  flex-direction: row;
}
</style>