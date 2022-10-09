<template>
	<view class="news">
		<!-- @click="navigator(item.goods_id)" -->
		<view class="news_item" v-for="item in list" :key="item.goods_id" @touchstart="touchstart(item)"  @touchend="touchend(item)">
			<image :src="item.goods_small_logo"></image>
			<view class="right">
				<view class="tit">
					{{item.goods_name}}
				</view>
				<view class="info">
					<text>发表时间：{{item.add_time | formatDate}}</text>
					<text>浏览：{{item.hot_mumber}}次</text>
				</view>
			</view>
			
			<view class="item_bg" v-if="true">
				<view @click="clickDel(item)">
					<image src="../../static/logo.png" ></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { formatDate } from "../../util/date.js"
	export default{
		props:['list'],
		filters:{
			formatDate(time){
				time = time * 1000
				const date = new Date(time)
				// const year = date.getFullYear()
				// const month = (date.getMonth()+1).toString().padStart(2,0)
				// const day = date.getDay().toString().padStart(2,0)
				// return year+'-'+month+'-'+day
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			}
		},
		data:{
			timeOutEven:0
		},
		methods:{
			navigator(id){
				this.$emit('itemClick',id)
			},
			
			touchstart(item) {
			    clearTimeout(this.timeOutEven); //再次清空定时器，防止重复注册定时器
			    this.timeOutEven = setTimeout(function() {
			        this.timeOutEven = 0
			        //这里是长按以后需要触发的事件
					let isDel = this.listContainsDel()
					if(isDel !== true) {
						item.isDel = true
					}
					
			    }.bind(this), 1000);  // 这里的1000是指需要长按的时间，单位为ms
			},
			touchend(item) {
			    // 这个方法主要是用来将每次手指移出之后将计时器清零
			    clearTimeout(this.timeOutEven);
				console.log(this.timeOutEven)
				if(this.timeOutEven !== 0) {
					let isDel = this.listContainsDel()
					if (isDel !== true) {
						this.navigator(item.goods_id)
					}
				}
			},
			clickDel(item){
				console.log("clickDel")
			},
			listContainsDel(){
				let isDel = false
				let list = this.$props.list
				list.forEach(tem=>{
					if (tem.isDel === true) {
						tem.isDel = false
						isDel = true
					}
				})
				return isDel
			}
		}
	}
</script>

<style lang="scss">
	.news{
		.news_item{
			position: relative;
			display: flex;
			padding: 10rpx 20rpx;
			border-bottom: 1px solid $shop-color;
			image{
				min-width: 200rpx;
				max-width: 200rpx;
				height: 150rpx;
			}
			.right{
				margin-left: 15rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.tit{
					font-size: 30rpx;
				}
				.info{
					font-size: 24rpx;
					text:nth-child(2){
						margin-left: 30rpx;
					}
				}
			}
		    
			.item_bg{
				position: absolute;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,.3);
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					width: 50px;
					height: 50px;
				}
			}
		}
	}
</style>
