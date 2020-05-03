import axios from 'axios';
export default {
  // SingnIn: function ({ commit }, param) {
  //   return new Promise((resolve) => {
  //     axios.post(`${process.env.API.baseURL}/sys/login`, param).then((response) => {
  //       resolve(response.data);
  //     })
  //   })
  // },
  GetUserMenus: function ({ commit }, param) {
    return new Promise((resolve) => {
      $axios.post(`${process.env.API.baseURL}/sys/nav/info`).then((response) => {
        resolve(response.data.dataResult);
      })
    })
  },

  // 菜单业务大类的关系
  GetUserMenuCategoryCfg: function ({ commit }, param = {}) {
    return new Promise((resolve) => {
      axios.post(`${process.env.API.emsAdminURL}/menucategory/selectMenuCategoryCfg`, param).then((response) => {
        if (response.data.statusCode !== "-1") {
          commit("USER_MENU_CATEGORY_CFG", response.data)
        } else {
          console.error("菜单业务大类的关系：拉取失败")
          commit("USER_MENU_CATEGORY_CFG", null)
        }
        resolve(response.data.dataResult);
      })
    })
  },

  // 当前登陆用户信息
  FindCurrentEmployee({ commit }, param) {
    return new Promise((resolve) => {
      $axios.get(`${process.env.API.claimURL}/claim/findCurrentEmployee`, param).then((response) => {
        commit("USER_EMP_INFO", response.data)
        resolve(response.data);
      })
    })
  }
}