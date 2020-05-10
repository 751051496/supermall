<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" ></detail-nav-bar>
		<scroll class="detail-content" ref="scroll" :probe-type="3" @scroll="contentScroll">
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detailInfo="detailInfo" @loadImgEvent="loadImgEvent"></detail-goods-info>
			<detail-params :param-info="paramInfo" ref="params"></detail-params>
			<detail-comment :comment="comment" ref="comment"></detail-comment>
			<goods-list :goods="recommond" ref="recommond"></goods-list>
			
			
		</scroll>
		<back-top @click.native="backClick" v-show="isShowTop"></back-top>
		<detail-bottom-bar @addEvent="addToCar"></detail-bottom-bar>
		
		
	</div>
</template>

<script>
	import DetailNavBar from './childComponents/DetailNavBar'
	import DetailSwiper from './childComponents/DetailSwiper'
	import DetailBaseInfo from './childComponents/DetailBaseInfo'
	import DetailShopInfo from './childComponents/DetailShopInfo'
	import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
	import DetailParams from './childComponents/DetailParams'
	import DetailComment from './childComponents/DetailComment'
	import DetailBottomBar from './childComponents/DetailBottomBar'
	
	import {getDetail,Goods,Shop,GoodsParam,getDetailRecommend} from '../../network/detail'
	import {debounce} from '../../common/util.js'
	import Scroll from '../../components/common/scroll/Scroll'
	import GoodsList from '../../components/content/goods/GoodsList'
	import backTop from '../../components/content/backTop/backTop'
	// import Toast from '../../components/common/toast/toast'
	// import {backTopMixin} from '../../common/mixin.js'
	
	export default{
		name : 'Detail',
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParams,
			DetailComment,
			DetailBottomBar,
			Scroll,
			GoodsList,
			backTop,
		},
// 		mixins:{
// 			[backTopMixin]
// 		},
		data(){
			return {
				iid : null,
				topImages:[],
				goods: {},
				shop:{},
				detailInfo:{},
				paramInfo:{},
				comment:{},
				recommond:[],
				newRefresh:null,
				themeTopYs:[],
				themeY:null,
				currentIndex :0,
				isShowTop:false
			}
		},
		created(){
			//1.保存传入的iid
			this.iid = this.$route.params.iid
			//2.根据iid请求详情数据
			getDetail(this.iid).then(res =>{
				// 顶部轮播图
				// console.log(res);
				const data = res.result
				this.topImages = res.result.itemInfo.topImages
				
				
				//2.获取商品信息
				this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
				
				// 3.店铺信息
				this.shop = new Shop(data.shopInfo)
				
				// 4.保存商品的xiangqingshuju
				this.detailInfo = data.detailInfo
				
				
				// 5.获取参数的信息
				this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
				
				//6.评论
				if(data.rate.cRate !== 0)
				this.comment = data.rate.list[0]
					
			})
			
			
			
			//推荐数据
			getDetailRecommend().then(res =>{
				// console.log(res);
				this.recommond=res.data.list
				// console.log(res.data.list);
			})
			
			this.themeY =debounce(() => {
				
			})
			
			
		},
		methods:{
			loadImgEvent(){
				this.newRefresh = debounce(this.$refs.scroll.refresh,100)
				this.newRefresh()
				//前面的参数渲染完成后
					this.themeTopYs = []
					this.themeTopYs.push(0)
					this.themeTopYs.push(this.$refs.params.$el.offsetTop)
					this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
					this.themeTopYs.push(this.$refs.recommond.$el.offsetTop)
					this.themeTopYs.push(Number.MAX_VALUE)
			},
			titleClick(index){
				this.$refs.scroll.scrollTo(0,-this.themeTopYs[index])
				// console.log(this.$refs.params.$el.offsetTop);
			},
			contentScroll(position){
				const positionY = -position.y
				let length =  this.themeTopYs.length
				for(let i = 0;i<length-1;i++){
					if(this.currentIndex !== i && (positionY >=this.themeTopYs[i]&& positionY <this.themeTopYs[i+1])){
						this.currentIndex = i
						this.$refs.nav.currentIndex = this.currentIndex
					}
					
					
				}
				//回到顶部
				this.isShowTop = positionY >1000
			},
			backClick(){
				this.$refs.scroll.scrollTo(0,0)
			},
			addToCar(){
				const product = {}
					product.image = this.topImages[0]
					product.title = this.goods.title
					product.desc = this.goods.desc
					product.price = this.goods.realPrice
					product.iid = this.iid
					// console.log(product);
					// 商品添加到购物车vuex
					// this.$store.commit('addCart',product)
					this.$store.dispatch('ChangeCart',product).then(() =>{
						this.$toast.show('加入购物车成功')
					}).catch(()=>{
						this.$toast.show('购买数量+1')
					})
					// console.log(this.$store);
					// console.log($store.cartLength);
					// console.log($store.state.cartList);
			},
			
		},
		mounted(){
			
		},
		updated(){
			
		}
		
	}
	
</script>

<style>
	#detail{
		position: relative;
		z-index: 9;
		background: #fff;
		height: 100vh;
	}
	.detail-nav{
		position: relative;
		z-index: 9;
		background: #fff;
	}
	.detail-content{
		height: calc(100% - 44px);
	}
</style>
