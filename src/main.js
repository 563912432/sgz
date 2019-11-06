import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/element-variables.scss'
import '@/styles/index.scss' // 全局css
import '@/assets/iconfont.js' // 图标库 less
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import axios from 'axios'
import qs from 'qs'
import { getCookie } from './utils'
// import { setCookie  } from './utils'

Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false

window.axios = axios
window.adminHost = 'http://117.50.43.204:8000/admin/v1'
window.studentHost = 'http://117.50.43.204:8000/stu/v1'

// let scope = setCookie('scope', 3)
// setCookie('YPJ-ACCESS-TOKEN', '2276830613b8f48ae927f782c9cf3abc')
// let scope = getCookie('scope')
let whiteList = ['404'] // 白名单

let scope = getCookie('scope')
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.name) === -1) {
    // 获取scope
    if (typeof scope === 'undefined' || !scope) {
      next({ name: '404' })
    } else if (parseInt(scope) === 1 || parseInt(scope) === 2) { // teacher 模式
      store.state.role = 'teacher'
    } else if (parseInt(scope) === 3) {
      store.state.role = 'student' // 学生模式
    } else {
      next({ name: '404' })
    }
  }
  next()
})
// 请求拦截器
axios.interceptors.request.use(config => {
  let token = getCookie('YPJ-ACCESS-TOKEN')
  // let scope = getCookie('scope')
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': token
  }
  // 在发送请求之前做些什么
  config.data = qs.stringify(config.data) // 转为formdata数据格式
  return config
},
error => {
  // 对请求错误做些什么
  console.log(error) // for debug
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
