import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import './index.css'  //Tailwind配置文件，有冲突可以该配置文件的purge
import './assets/iconfont/iconfont.css' //引入的第三方图标库
import "@/styles/css-vars.css";//暗黑模式，这里只能这样写，官网的写法有bug
import "@/styles/dark.css";
import { MotionPlugin } from "@vueuse/motion";//动画效果


// 路由
import router from "./router";
// 路由
import store from "./store";

// 全局引入ElementPlus，当然也可以使用局部引入
import ElementPlus from 'element-plus'
import locale from "element-plus/lib/locale/lang/zh-cn" //中文
import 'element-plus/dist/index.css' //引入样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //引入icon图标库

import * as echarts from 'echarts'


// //对axios进行全局配置
import axios from 'axios'
// //配置请求的根路径
axios.defaults.baseURL='http://114.115.152.241:18080/'
// Vue.prototype.$http = axios  //将axios包挂载到原型的属性上

const app = createApp(App)
app.config.globalProperties.$echarts = echarts;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(store)
    .use(MotionPlugin)
    .use(router)
    .use(ElementPlus, {locale})
    .mount('#app')
