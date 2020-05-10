import axios from 'axios'
export function request(config){
		const instance = axios.create({
			baseURL:'',
			timeout:5000
		})
		//2.axios拦截器
		instance.interceptors.request.use(config =>{
			return config
			//return config
		},err =>{
			//console.log(err)
		});
		instance.interceptors.response.use(res =>{
			return res.data
			//return config
		},err =>{
			console.log(err)
		});
		//3.发送真正的请求
	return instance(config)
}

// export function request(config){
// 	return new Promise((resolve,reject) =>{
// 		const instance = axios.create({
// 			baseURL:'http://123.207.32.32:8000',
// 			timeout:5000
// 		})
// 	})
// 	
// 	instance(config).then(res =>{
// 		resovle(res)
// 	}).catch(err =>{
// 		reject(err)
// 	})
// }

// export function request(config,success,fail){
// 	const instance = axios.create({
// 		baseURL:'http://123.207.32.32:8000',
// 		timeout:5000
// 	})
// 	
// 	instance(config).then(res =>{
// 		success(res)
// 	}).catch(err =>{
// 		fail(err)
// 	})
// }
