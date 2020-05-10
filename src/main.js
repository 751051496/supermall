import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)
// 解决移动端300ms的问题
FastClick.attach(document.body)

//使用图片懒加载
Vue.use(VueLazyload,{
	loading:require('assets/img/detail/huaji.jpg')
})

new Vue({
  render: h => h(App),
  router,
	store
}).$mount('#app')
