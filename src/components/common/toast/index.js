import Toast from './Toast.vue'
const obj ={}
obj.install = function(Vue){
	// 1.创建组件构造器
	const toastConstrustor = Vue.extend(Toast)
	
	const toast = new toastConstrustor()
	
	toast.$mount(document.createElement('div'))
	
	document.body.appendChild(toast.$el)
	
	Vue.prototype.$toast = toast
	
}
export default obj
