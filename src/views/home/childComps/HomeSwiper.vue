<template>
	<swiper>
		 <swiper-item v-for='item in banners'>
			 <a :href="item.link">
				 <img :src="item.image" alt="" @load="imageLoad"> 
			 </a>
		 </swiper-item>
	</swiper>
</template>

<script>
	import {Swiper,SwiperItem} from '../../../components/common/swiper/index.js' 
	export default{
		name:'HomeSwiper',
		props:{
			banners:{
				type:Array,
				default(){
					
				}
			}
		},
		data(){
			return {
				isLoad:false
			}
		},
		components:{
			Swiper,
			SwiperItem
		},
		methods:{
			imageLoad(){
				if(!this.isload){
					this.$emit('swiperImageLoad')
					this.isload=true
				}
				
			}
		}
	}
</script>

<style>

</style>
