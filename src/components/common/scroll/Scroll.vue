<template>
	<div class="wrap" ref="wrap">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name : 'Scroll',
		props:{
			probeType:{
				type:Number,
				default:0
			},
			pullUpLoad:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				scroll:null,
				message:'哈哈'
			}
		},
		mounted(){
			//1.创建BSscroll对象
			this.scroll = new BScroll(this.$refs.wrap,{
				click:true,
				probeType:this.probeType,
				pullUpLoad:this.pullUpLoad
			})
			//2.监听滚动的位置
			this.scroll.on('scroll',(position) =>{
				// console.log(position);
				this.$emit('scroll',position)
			})
			// 3.监听上拉事件
			if(this.pullUpLoad){
				this.scroll.on('pullingUp',() =>{
				// console.log('上拉加载更多');
					this.$emit('pullingUp')
				})
				// console.log(this.scroll)
			}
			
			
		},
		methods:{
			scrollTo(x,y,time=3000){
				this.scroll&& this.scroll.scrollTo&& this.scroll.scrollTo(x,y,time)
			},
			finishPullUp(){
				this.scroll && this.scroll.finishPullUp()
			},
			refresh(){
				// console.log('111');
				this.scroll&&this.scroll.refresh()
			},
			getScrollY(){
				return this.scroll.y ?this.scroll.y : 0
			}
		}
	}
</script>

<style>
</style>
