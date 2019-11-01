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

Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false

window.axios = axios
window.adminHost = 'http://117.50.43.204:8000/admin/v1'
window.studentHost = 'http://117.50.43.204:8000/stu/v1'
// 请求拦截器
axios.interceptors.request.use(config => {
  // document.cookie = 'Admin-Access-Token=283641eb542ec23cefbb0c35a33be812'
  // document.cookie = 'Student-Access-Token=113e451aee530a6a901f77ae8260c479'
  // document.cookie = 'scope=3'
  function getCookie (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
    }
    return ''
  }
  let adminToken = getCookie('Admin-Access-Token')
  let studentToken = getCookie('Student-Access-Token')
  let scope = getCookie('scope')
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': parseInt(scope) === 1 ? adminToken : studentToken
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
