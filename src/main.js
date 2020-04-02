import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import axios from 'axios';
import Element from 'element-ui';
// import echarts from 'echarts';
// import Qs from 'qs'
import Utile from './lib/utils';
// import request from "@/lib/request.js";
import * as filters from './filters';
import * as directives from './directives'
import '@/assets/scss/element-variables.scss';
import '@/assets/iconfont/iconfont.css';
import '@/assets/scss/app.scss';
import './permission';
// import '../mock/index.js'; // 使用模拟数据，调用真实的后台数据时注释此行即可

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
// Vue.prototype.$echarts = echarts;
Vue.use(Element);
// Vue.use(Fragment.Plugin)
Vue.use(Utile);

// Vue.prototype.$qs = Qs;




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 注册全局自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})