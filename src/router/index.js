import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          name: 'v-table',
          component: resolve => { require(['../views/vTable/Index.vue'], resolve); }
        },
        {
          path: 'data-select-test',
          name: 'data-select-test',
          component: resolve => { require(['../views/dataSelectTest/Index.vue'], resolve); }
        },
        {
          path: 'business-type-tree',
          name: 'business-type-tree',
          component: resolve => { require(['../views/businessTypeTreeTest/Index.vue'], resolve); }
        },
        {
          path: 'select-business-type',
          name: 'select-business-type',
          component: resolve => { require(['../views/selectBusinessTypeTest/Index.vue'], resolve); }
        },
        {
          path: 'pay-way-info',
          name: 'pay-way-info',
          component: resolve => { require(['../views/payWayInfoTest/Index.vue'], resolve); }
        },
        {
          path: 'edite-vendor-info',
          name: 'edite-vendor-info',
          component: resolve => { require(['../views/editeVendorInfoTest/Index.vue'], resolve); }
        },
        {
          path: 'select-city',
          name: 'select-city',
          component: resolve => { require(['../views/selectCityTest/Index.vue'], resolve); }
        },
        {
          path: 'select-vendor',
          name: 'select-vendor',
          component: resolve => { require(['../views/selectVendorTest/Index.vue'], resolve); }
        },
        {
          path: 'select-vendor-bank-info',
          name: 'select-vendor-bank-info',
          component: resolve => { require(['../views/selectVendorBankInfoTest/Index.vue'], resolve); }
        },
        {
          path: 'select-company',
          name: 'select-company',
          component: resolve => { require(['../views/selectCompanyTest/Index.vue'], resolve); }
        },
        {
          path: 'v-table',
          name: 'v-table',
          component: resolve => { require(['../views/vTable/Index.vue'], resolve); }
        },
      ]
    },
  ]
})
