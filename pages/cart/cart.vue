<template>
	<view>
		<scroll-view class="scroll">
			<view class="item" v-for="item in newsList"  @touchstart="touchstart()"  @touchend="touchend()">
				<view class="item_bg" v-if="isDel">
					<view @click="clickDel()">
						<image src="../../static/logo.png" ></image>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsList:[1,2,3,4,5],
				timeOutEven:0,
				isDel:false,
			}
		},
		methods: {
			// //获取数据
			// async getNews(callBack){
			// 	const res = await this.$myRequest({
			// 		url:'/goods/search?pagesize=20&pagenum='+this.pagenum
			// 	})
			// 	this.newsList = [...this.newsList,...res.data.message.goods]
			// 	this.newsList.forEach(item => {
			// 	    item.isDel = false;
			// 	})
			// 	callBack && callBack()
			// },
			
			touchstart() {
				console.log("touchstart")
			    clearTimeout(this.timeOutEven); //再次清空定时器，防止重复注册定时器
			    this.timeOutEven = setTimeout(function() {
			        //这里是长按以后需要触发的事件
					this.timeOutEven = 0
					console.log("长按")
					this.isDel = true
					// let isDel = false
					// let list = this.newsList
					// list.forEach(tem=>{
					// 	if (tem.isDel === true) {
					// 		isDel = true
					// 	}
					// })
					// if(isDel !== true) {
					// 	item.isDel = true
					// 	this.timeOutEven = 0
					// 	console.log("长按")
					// }
					
			    }.bind(this), 1000);  // 这里的1000是指需要长按的时间，单位为ms
			},
			touchend() {
				console.log("touchend-"+this.timeOutEven)
			    // 这个方法主要是用来将每次手指移出之后将计时器清零
			    clearTimeout(this.timeOutEven);
				
				if(this.timeOutEven !== 0) {
					// let list = this.newsList
					// list.forEach(tem=>{
					// 	tem.isDel = false
					// })
					// console.log(list)
				}
			},
			clickDel(){
				console.log("clickDel")
				this.isDel = false
			},
		},
		onLoad() {
			// this.getNews()
		},
	}
</script>

<style lang="scss">
	.scroll {
		display: flex;
		flex-direction: column;
		
		.item {
			position: relative;
			margin-top: 10px;
			border-radius: 6px;
			margin-left: 4px;
			margin-right: 4px;
			height: 80px;
			background-color: red;
			
			
			
			.item_bg{
				position: absolute;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,.3);
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 6px;
				
				image {
					width: 50px;
					height: 50px;
				}
			}
		}
	}
</style>
