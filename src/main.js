import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "axios";

import { timeService } from "@/utils/timeFormat";
import "@/style/css/iconfont.css";
import "@/style/css/base.css";
import "@/style/css/normalize.css";

import { Notification } from "element-ui";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import { serviceAddress } from "@/utils/config";
Vue.prototype.$getImage = (url) => serviceAddress + url;

import loading from "./utils/loading/loading.js"; // 引入loading
Vue.use(loading); // 全局使用loading

import myBtn from "@/components/commom/btn";
import eventBus from "@/utils/eventBus";
Vue.component("myBtn", myBtn);
//引人animate
// import animated from 'animate.css'
// Vue.use(animated)
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$notify = Notification;
Vue.prototype.$timeService = timeService;
Vue.prototype.$eventBus = eventBus;
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
