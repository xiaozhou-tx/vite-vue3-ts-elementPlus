import { createApp } from "vue";
import "./assets/css/reset.css"; // 重置样式
import "./style.css"; // 全局样式
import "animate.css"; // 引入动画库
import App from "./App.vue"; // 根组件
import { loadDirectives } from "./directives/index.ts"; // 自定义指令
import router from "./router/index.ts"; // 路由
import pinia from "./stores/index.ts"; // 状态管理

let app = createApp(App);

loadDirectives(app); // 加载自定义指令

// 全局错误处理
app.config.errorHandler = (err: any, _vm, info: string) => {
	console.error(`Error: ${err.toString()}\nInfo: ${info}`);
};
app.config.warnHandler = (msg: string, _vm, trace: string) => {
	console.warn(`Warn: ${msg}\nTrace: ${trace}`);
};

app.use(pinia); // 注册pinia
app.use(router); // 注册路由
app.mount("#app");
