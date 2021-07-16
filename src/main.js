// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // Vue
import App from './App' // App
import router from './router' // 路由
import ElementUI from 'element-ui' //  UI
import axios from 'axios' // axios
import store from './store/index' // Vuex  状态管理中心
import echarts from 'echarts' // echarts 可视化UI
import BaiduMap from 'vue-baidu-map' // 引入百度API
import ToTop from './store/function.js' // 封装function 方法
import XLSX from 'xlsx'
// import 'default-passive-events' //   解决 Chrome 新的事件捕获机制   警告  此处引起百度地图缩放报错

import './assets/css/animate.min.css';
import './assets/css/reset.css' //  react.css
import './assets/scss/INCHWELL.scss' //  INCHWELL.scss
import 'element-ui/lib/theme-chalk/index.css' //  ui
import 'babel-polyfill' // ie9和一些低版本的高级浏览器对es6新语法并不支持

Vue.prototype.$store = store // Vuex  状态管理中心
Vue.prototype.$echarts = echarts // echarts 可视化UI
Vue.prototype.$http = axios //?   axiso
    //  axios.defaults.withCredentials = true    允许传输Cookies   禁止打开 



import httpUP from './store/httpUpList' //   http请求  上传数据使用，单纯调接口
import http from './store/http' //   http请求  正常
Vue.prototype.$httpsUp = httpUP
Vue.prototype.$https = http


Vue.use(ToTop) // 添加
Vue.use(XLSX) // 读取Xlsl  插件
Vue.use(ElementUI) //使用ElementUI 
Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'iBzihfMuLtAMngcHRSLI1QCYk5afngAY'
})
Vue.config.productionTip = false

const Base64 = require('js-base64').Base64



router.beforeEach((to, from, next) => {
        if (from.path == '/exhibition/newzt/create') {
            if (to.path == '/exhibition/exhibition/newzt') {
                from.meta.keepAlive = false //修改为false

                next()
            } else {
                next()
            }
        } else {
            next()
        }
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    Base64,
    components: { App },
    template: '<App/>'
})