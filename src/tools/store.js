/**
 * 解决在别的import 文件中 store 实例不能使用的问题
 */
import store from 'ems-accounting@/vuex/index.js'
window.$store = store;
export default store;