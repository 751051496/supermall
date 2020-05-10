import backTop from '../components/content/backTop/backTop'
import {BACK_POSITION} from 
export const backTopMixin = {
	components:{
		backTop
	},
	data(){
		return {
			isShowTop:false
		}
	},
	methods:{
		backClick(){
			this.$refs.scroll.scrollTo(0,0)
		},
		listenShowBackTop(position){
			this.isShowTop = -position.y >BACK_POSITION
		}
	}
}