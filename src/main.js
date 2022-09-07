import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 配置 ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 配置 全局初始化样式
import "@/assets/css/reset.scss";

require("echarts/extension/bmap/bmap");

// JSAPI key搭配静态安全密钥以明文设置（不安全，建议开发环境用）：
window._AMapSecurityConfig = {
  securityJsCode: "f114d2eef985d77637179b439a25ceca",
};

// 配置 全局组件 form组件 table组件 card组件 page组件
import MyForm from "@/components/Form/Index";
import MyTable from "@/components/Table/Index";
import MyCard from "@/components/Card/Index";
import MyPage from "@/components/Page/Index";
Vue.use({
  install() {
    Vue.component("my-form", MyForm);
  },
});
Vue.use({
  install() {
    Vue.component("my-table", MyTable);
  },
});
Vue.use({
  install() {
    Vue.component("my-card", MyCard);
  },
});
Vue.use({
  install() {
    Vue.component("my-page", MyPage);
  },
});

// 配置 全局混入 && 过滤器
import Mixin from "@/utils/mixins.js";
import Filters from "@/utils/filters.js";
import utils from "@/utils/index.js";
Vue.prototype.$utils = utils;

import "../permission";
Vue.use({
  install() {
    Vue.component("Mixin", Mixin);
  },
});
Vue.use({
  install() {
    Vue.component("Filters", Filters);
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
