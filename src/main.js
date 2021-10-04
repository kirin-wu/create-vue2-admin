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

// 配置 全局组件 form组件 table组件 card组件 page组件
import MtFrom from "@/components/form/Index";
import MtTable from "@/components/table/Index";
import MtCard from "@/components/card/Index";
import MtPage from "@/components/page/Index";
Vue.use({
  install() {
    Vue.component("MtFrom", MtFrom);
  },
});
Vue.use({
  install() {
    Vue.component("MtTable", MtTable);
  },
});
Vue.use({
  install() {
    Vue.component("MtCard", MtCard);
  },
});
Vue.use({
  install() {
    Vue.component("MtPage", MtPage);
  },
});

// 配置 全局混入 && 过滤器
import Mixin from "@/utils/mixins.js";
import Filters from "@/utils/filters.js";
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
