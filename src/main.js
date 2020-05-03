import Vue from 'vue'
import App from './App'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import './styles/main.css';
import router from './router'
import Vuex from 'vuex';
import './axios.config.js'
import store from './vuex/index.js'
import PageModal from './components/pageModal/index.js'
import mock from "./mock"
Vue.prototype.$pageModal = PageModal;
Vue.config.devtools = process.env.API.devtools;
window.$channel = new Vue();

// Vue.config.devtools = true
Vue.config.productionTip = false
Vue.use(iView);
Vue.use(Vuex);
window.$store = store;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store: store,
    components: { App },
    // template: '<App/>'
    render: h => h(App),
    created() {
        // if (!!sessionStorage.crctoken) {
        //     $axios.defaults.headers.crctoken = sessionStorage.crctoken
        // }
    },
})
