<template>
	<view class="news-detail">
		<text class="title">{{detail.goods_name}}</text>
		<view class="info">
			<text>发表时间：{{detail.add_time | formatDate}}</text>
			<text>浏览：{{detail.hot_mumber}}次</text>
		</view>
		<view class="content">
			<rich-text :nodes="detail.goods_introduce"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				detail:{}
			}
		},
		methods: {
			//获取数据
			async getNewsDetail(){
				const res = await this.$myRequest({
					url:'/goods/detail?goods_id='+this.id
				})
				this.detail = res.data.message
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getNewsDetail()
		}
	}
</script>

<style lang="scss">
	.news-detail{
		font-size: 30rpx;
		padding: 0 20rpx;
		.title{
			text-align: center;
			width: 710rpx;
			display: block;
			margin: 20rpx 0;
		}
		.info{
			display: flex;
			justify-content: space-between;
		}
	}
</style>
