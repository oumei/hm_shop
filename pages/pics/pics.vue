<template>
	<view class="pics">
		<scroll-view class="left" scroll-y>
			<view :class="active===index?'active':''" v-for="(item,index) in cates" :key="index" @click="leftClickHandle(index,item.product_list)">
			{{item.floor_title.name}}
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="(item,index) in secondData" :key="index">
				<image @click="previewImg(item.image_src)" :src="item.image_src"></image>
				<text>{{item.name}}</text>
			</view>
			<text v-if="secondData.length===0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cates:[],
				active:0,
				secondData:[]
			}
		},
		methods: {
			//获取数据
			async getPicsCate(){
				const res = await this.$myRequest({
					url:'/home/floordata'
				})
				this.cates = res.data.message
				if(this.cates.length === 0) return
				this.leftClickHandle(0,this.cates[0].product_list)
			},
			leftClickHandle(index,product_list){
				this.active = index
				this.secondData = product_list
			},
			previewImg(current){
				const urls = this.secondData.map(item=>{
					return item.image_src
				})
				uni.previewImage({
					urls,
					current
				})
			}
		},
		onLoad() {
			this.getPicsCate()
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.pics{
		display: flex;
		height: 100%;
		.left{
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;
			view{
				height: 60px;
				line-height: 60px;
				color: #333333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}
			.active{
				background: $shop-color;
				color: #FFFFFF;
			}
		}
		
		.right{
			height: 100%;
			width: 530rpx;
			margin: 10rpx auto;
			.item{
				image{
					width: 530rpx;
					height: 530rpx;
					border-radius: 5px;
				}
				text{
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
