<template>
	<view class="goods_list">
		<goods-list :goods="goods" @goodsItemClick="goGoodsDetail"></goods-list>
		<view class="isOver" v-if="flag">-----我是有底线的-----</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		data() {
			return {
				pagenum:1,
				goods:[],
				flag:false
			}
		},
		components:{"goods-list":goodsList},
		methods: {
			//获取商品列表数据
			async getGoodsList(callBack){
				const res = await this.$myRequest({
					url:'/goods/search?pagesize=20&pagenum='+this.pagenum
				})
				this.goods = [...this.goods,...res.data.message.goods]
				console.log(res)
				callBack && callBack()
			},
			
			//导航到商品详情页
			goGoodsDetail(id){
				uni.navigateTo({
					url:'/pages/goods-detail/goods-detail?id='+id
				})
			}
		},
		onLoad() {
			this.getGoodsList()
		},
		onReachBottom() {
			if(this.goods.length < 20*this.pagenum) return this.flag = true
			this.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.pagenum = 1
			this.flag = false
			this.goods = []
			setTimeout(()=>{
				this.getGoodsList(()=>{
					uni.stopPullDownRefresh()
				})
			},1000)
		}
	}
</script>

<style lang="scss">
	.goods_list{
		background: #eee;
	}
	.isOver{
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 28rpx;
	}
</style>
