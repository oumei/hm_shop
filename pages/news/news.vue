<template>
	<view class="news">
		<news-item :list="newsList" @itemClick="goDetail"></news-item>
		<view class="isOver" v-if="flag">-----我是有底线的-----</view>
	</view>
</template>

<script>
	
	import { newsItem } from "../../components/news-item/news-item.vue"
	export default {
		data() {
			return {
				newsList:[],
				pagenum:1,
				flag:false
			}
		},
		methods: {
			//获取数据
			async getNews(callBack){
				const res = await this.$myRequest({
					url:'/goods/search?pagesize=20&pagenum='+this.pagenum
				})
				this.newsList = [...this.newsList,...res.data.message.goods]
				this.newsList.forEach(item => {
				    item.isDel = false;
				})
				callBack && callBack()
			},
			goDetail(id){
				uni.navigateTo({
					url:'/pages/news-detail/news-detail?id='+id
				})
			}
		},
		components:{
			"news-item":newsItem,
		},
		onLoad() {
			this.getNews()
		},
		onReachBottom() {
			if(this.newsList.length < 20*this.pagenum) return this.flag = true
			this.pagenum++
			this.getNews()
		},
		onPullDownRefresh() {
			this.pagenum = 1
			this.flag = false
			this.newsList = []
			setTimeout(()=>{
				this.getNews(()=>{
					uni.stopPullDownRefresh()
				})
			},1000)
		}
	}
</script>

<style lang="scss">
	.isOver{
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 28rpx;
	}
</style>
