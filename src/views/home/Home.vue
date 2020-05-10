<template>
 <div id="home">
	 <nav-bar class="home-nav"><div slot='center'>购物街</div> </nav-bar>
	 <tab-control :titles="['流行','新款','精选']"
	  ref="tabControl1"
	 @tabClick='tabClick' class="tab-control-change"
	 v-show="isTabFixed"></tab-control>
	 <scroll class="content" ref='scroll' :probe-type='3' @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore" >
		 <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
		 <recommend :recommends='recommends'></recommend>
		 <popular></popular>
		 <tab-control :titles="['流行','新款','精选']"
		  ref="tabControl2"
		 @tabClick='tabClick'></tab-control>
		 <goodsList :goods="showGoods"></goodsList>
		</scroll>
	 <back-top @click.native="backClick" v-show="isShowTop"></back-top>
	 
	 </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import Recommend from './childComps/Recommond'
import Popular from './childComps/Popular'

import NavBar from '../../components/common/navbar/NavBar'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import Scroll from '../../components/common/scroll/Scroll'
import backTop from '../../components/content/backTop/backTop'

import {getHomeMultidata,getHomeGoods} from '../../network/home.js'
import {debounce} from '../../common/util.js'

  export default {
    name: "Home",
		components:{
			
			HomeSwiper,
			Recommend,
			Popular,
			NavBar,
			TabControl,
			GoodsList,
			Scroll,
			backTop
		},
		data(){
			return {
				banners:[],
				recommends:[],
				goods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]}
				},
				currentType:'pop',
				isShowTop:false,
				tabOffsetTop:0,
				isTabFixed:false,
				saveY:0,
				homeItemLis:null
			}
		},
		mounted(){
			// 图片加载完成事件监听
			const refresh = debounce(this.$refs.scroll.refresh,500)
			// 3.监听goodsItem图片加载完成 
			this.homeItemLis = () =>{
				refresh()
				
			}
			this.$bus.$on('itemImageLoad',this.homeItemLis)
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		created(){
			this.getHomeMultidata()
			
			//2.请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')	
			this.getHomeGoods('sell')	
			
			
		},
		methods:{
			//事件监听事件
			tabClick(index){
				switch(index){
					case 0:
						this.currentType = 'pop'
						break
					case 1:
						this.currentType = 'new'
						break
					case 2:
						this.currentType = 'sell'
						break
				}
				this.$refs.tabControl1.currentType = index
				this.$refs.tabControl2.currentType = index
			},
			
			// 网络请求相关方法
			getHomeMultidata(){
				getHomeMultidata().then(res =>{
					// console.log(res)
					this.banners = res.data.banner.list
					this.recommends = res.data.recommend.list
				})
			},
			getHomeGoods(type){
				const page = this.goods[type].page + 1
				getHomeGoods(type,page).then(res =>{
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page + 1
					//完成上拉加载更多
					this.$refs.scroll.finishPullUp()
				})
			},
			backClick(){
					this.$refs.scroll.scrollTo(0,0)
			},
			contentScroll(position){
				//y值大于-1000时显示回到顶部按钮
				this.isShowTop = -(position.y) >1000
				// 决定tabControl是否吸顶
				this.isTabFixed = (-position.y)>this.tabOffsetTop
			},
			loadMore(){
				this.getHomeGoods(this.currentType)
				// console.log('上啦加载');
			},
			swiperImageLoad(){
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop; 
			}
		},
		destroyed() {
			console.log('destroy');
		},
		activated(){
			this.$refs.scroll.scrollTo(0,this.saveY)
			this.$refs.scroll.refresh()
		},
		deactivated() {
			this.saveY =this.$refs.scroll.getScrollY()
			this.$bus.$off('itemImageLoad',this.homeItemLis)
		},
  }
</script>

<style scoped="scoped">
	#home{
		/* padding-top: 44px; */
		/* height: 1000px; */
		height: 100vh;
		position: relative;
	}
	
  .home-nav{
		background: var(--color-tint);
		color: white;
		font-family: simsun;

	}
	
	.content{
		height: calc( 100% - 93px );
		overflow: hidden;
		position: absolute;
		top: 44px;
		/* margin-top: 44px; */
	}
	.tab-control-change{
		position: relative;
		z-index: 9;
	}
	
	
</style>
