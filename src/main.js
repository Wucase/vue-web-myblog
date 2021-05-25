import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "axios";

import { timeService } from "@/utils/timeFormat";
import "@/style/css/iconfont.css";
import "@/style/css/base.css";
import "@/style/css/normalize.css";
// import './plugins/mavonEditor/hljs'
import { Notification } from "element-ui";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import 'highlight.js/styles/googlecode.css'
import hljs from 'highlight.js'
hljs.highlightCode = function () { 
	//自定义highlightCode方法，将只执行一次的逻辑去掉
  console.log(">>>>>>>>>>>>>>>.");
	let blocks = document.querySelectorAll('pre code');
	[].forEach.call(blocks, hljs.highlightBlock);
};

import { serviceAddress } from "@/utils/config";
Vue.prototype.$getImage = (url) =>  url;

import loading from "./utils/loading/loading.js"; // 引入loading
Vue.use(loading); // 全局使用loading

import myBtn from "@/components/commom/btn";
import eventBus from "@/utils/eventBus";
Vue.component("myBtn", myBtn);

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
// use
Vue.use(mavonEditor)
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
