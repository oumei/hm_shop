<template>
	<view class="goods_list">
		<view class="goods_item" v-for="item in goods" :key="item.goods_id" @click="navigator(item.goods_id)">
			<image :src="item.goods_small_logo"></image>
			<view class="price">
				<text>¥{{item.goods_price}}</text>
				<text>¥{{item.goods_price+200}}</text>
			</view>
			<view class="name">
				{{item.goods_name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['goods'],
		methods:{
			navigator(id){
				this.$emit('goodsItemClick',id)
			}
		}
	}
</script>

<style lang="scss">
	.goods_list{
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.goods_item{
			background: #FFFFFF;
			width: 355rpx;
			margin: 10rpx 0;
			padding: 15rpx;
			box-sizing: border-box;
			image{
				width: 80%;
				height: 150px;
				display: block;
				margin: auto;
			}
			.price{
				color: $shop-color;
				font-size: 36rpx;
				margin: 20rpx 0 5rpx 0;
				text:nth-child(2){
					color: #ccc;
					font-size: 28rpx;
					margin-left: 17rpx;
					text-decoration: line-through;
					
				}
			}
			.name{
				font-size: 28rpx;
				line-height: 50rpx;
				padding-top: 15rpx;
				padding-bottom: 10rpx;
			}
		}
	}
</style>
