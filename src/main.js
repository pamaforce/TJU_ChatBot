import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import store from '@/store';
import Md5 from 'js-md5'
import BaseUrl from './utils/api'

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);
Vue.use(uView);
Vue.prototype.$md5 = Md5
Vue.prototype.$baseUrl = BaseUrl
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()