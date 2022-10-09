<template>
	<view class="goods_detail">
		<swiper indicator-dots>
			<swiper-item v-for="item in swipers" :key="item.pics_id">
				<image :src="item.pics_mid_url"></image>
			</swiper-item>
		</swiper>
		<view class="box1">
			<view class="price">
				<text>¥{{info.goods_price}}</text>
				<text>¥{{info.goods_price+200}}</text>
			</view>
			<view class="goods_name">
				{{info.goods_name}}
			</view>
		</view>
		<view class="line"></view>
		<view class="box2">
			<view>货号：{{info.goods_id}}</view>
			<view>库存：{{info.goods_number}}</view>
		</view>
		<view class="line"></view>
		<view class="box3">
			<view class="tit">详情介绍</view>
			<view class="content">
				<rich-text :nodes="info.goods_introduce"></rich-text>
			</view>
		</view>
		<view class="goods_nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				swipers:[],
				info:{},
				options: [
					{
						icon: 'headphones',
						text: '客服'
					}, {
						icon: 'shop',
						text: '店铺',
						info: 1,
						infoBackgroundColor:'#007aff',
						infoColor:"red"
					}, {
						icon: 'cart',
						text: '购物车',
						info: 2
					},
				],
				buttonGroup: [
					{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		methods: {
			//获取数据
			async getGoodsDetail(){
				const res = await this.$myRequest({
					url:'/goods/detail?goods_id='+this.id
				})
				this.swipers = res.data.message.pics
				this.info = res.data.message
			},
			onClick (e) {
				uni.showToast({
				  title: `点击${e.content.text}`,
				  icon: 'none'
				})
			},
			buttonClick (e) {
				console.log(e)
				this.options[2].info++
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getGoodsDetail()
		}
	}
</script>

<style lang="scss">
	.goods_detail{
		swiper{
			height: 700rpx;
			image{
				height: 100%;
				width: 100%;
			}
		}
		.box1{
			padding: 10px;
			.price{
				font-size: 35rpx;
				color: $shop-color;
				line-height: 80rpx;
				text:nth-child(2){
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}
			.goods_name{
				font-size: 32rpx;
				line-height: 60rpx;
			}
		}
		
		.box2{
			padding: 0 10rpx;
			font-size: 32rpx;
			line-height: 70rpx;
		}
		
		.box3{
			padding-bottom: 50px;
			.tit{
				font-size: 32rpx;
				padding-left: 10px;
				border-bottom: 1px solid #eee;
				line-height: 70rpx;
			}
			.content{
				padding: 10px;
				font-size: 28rpx;
				color: #333333;
				line-height: 50rpx;
			}
		}
	}
	
	.line{
		height: 10rpx;
		width: 750rpx;
		background: #eee;
	}
	
	.goods_nav{
		position: fixed;
		bottom: 0;
		width: 100%;
		
	}
</style>
