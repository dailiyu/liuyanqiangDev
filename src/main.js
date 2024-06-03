import { createApp } from "vue";
import router from "@/router/index";
import store from "@/store/index";
import '@/utils/mouse'
// import LIYU from "@/components/liyu/index";
import eventBus from "./utils/EventBus";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";

const app = createApp(App);
app.config.globalProperties.$bus = eventBus; //安装全局事件总线
app.use(ElementPlus);
// app.use(LIYU);
app.use(router);
app.use(store);
app.mount("#app");
