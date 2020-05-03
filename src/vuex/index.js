import Vue from 'vue'
import Vuex from 'vuex'

import rootModules from './export.index.js';

Vue.use(Vuex)

export default new Vuex.Store({
    // state: rootModules.state,
    actions: rootModules.actions,
    // getters: rootModules.getters,
})