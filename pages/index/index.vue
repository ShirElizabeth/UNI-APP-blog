<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{blogs}}</text>
		</view> -->
		<view v-if="blogs.length == 0" class="none">
			<image class="logo" src="../../static/icons/nodata.png" mode=""></image>
			<text class="text-area">抱歉，找不到相关文章</text>
		</view>


		<view v-else class="item-container" v-for="(item,index) in blogs" :key="item.id">
			<text class="item-title">{{item.title}}</text>
			<rich-text :nodes="item.description" class="item-desc"></rich-text>
			<image :src="item.picture" mode="widthFix" class="img itme-pic"></image>
			<!-- 博客图片 -->
			<view class="">
				<text class="item-tag" v-for="(tag,idx) in item.tags" :key="idx">{{tag}}</text>
			</view>


			<!-- 用户头像     aspectFill :                 -->
			<image :src="item.user.avatar" mode="aspectFill" class="user-img"></image>


			<view class="icon-container">
				<image v-if="index%2 ==0" src="../../static/icons/ic_good.png" mode="" class="icon"></image>
				<image v-else="index%2 ==0" src="../../static/icons/ic_good_fill.png" mode="" class="icon"></image>
				<text class="icon-text">{{item.good}} </text>
				<!-- 点赞 -->
				<image src="../../static/icons//ic_comment.png" mode="" class="icon"></image>
				<text class="icon-text">{{item.comments.length}} </text>
				<!-- 评论 -->
				<image src="../../static/icons/ic_count.png" mode="" class="icon"></image>
				<text class="icon-text">{{item.readCount}} </text>
				<!-- 查看 -->
			</view>


		</view>
	</view>
</template>

<script>
	// 全局变量
	let page = 0
	let size = 3


	export default {
		data() {
			return {
				blogs: [],
				count: -1
			}
		},
		// onLoad() {
		// 	// 快捷键ureq
		//        uni.request({
		//        	url: 'https://1.12.223.54/api/v1/blogs/',
		//        	method: 'GET',
		// 	sslVerify:false,
		//        	data: {},
		//        	success: res => {
		// 		this.blogs= res.data.data,
		// 		res.data.data.forEach(blog => {
		// 			if(!blog.picture.startsWith('http')){
		// 				blog.picture = 'https://1.12.223.54/' + blog.picture
		// 			}
		// 			blog.user.avatar = 'https://1.12.223.54/' + blog.user.avatar

		// 		})
		// 		this.blogs = res.data.data
		// 		console.log(this.blogs)

		// 		},

		//        	fail: () => {},
		//        	complete: () => {}
		//        });
		onLoad() {
			this.getPagedBlogs()
		},
		onPullDownRefresh() {
			page = 0 
			this.blogs = []
			this.count = -1
			this.getPagedBlogs()
		},
		onReachBottom() {
			if(this.blogs.length == this.count){
				uni.showToast({
					title:"已全部加载完成"
				})
				return
			}
			page +=1 
			this.getPagedBlogs()
		},
		methods: {
			getPagedBlogs() {
				// if(this.blogs.length == this.count){
				// 	uni.showToast({
				// 		title:"已全部加载完成"
				// 	})
				// 	return
				// }
				let header = {
					"content-type": "application/json;charset=UTF-8",
					"page": page,
					"size": size

				}
				this.$request.getWithHeader(this.$params.host + this.$params.action_blogs_page, header, res => {
					res.data.forEach(blog => {
						if (!blog.picture.startsWith("http")) {
							blog.picture = this.$params.host + blog.picture
						}
						blog.user.avatar = this.$params.host + blog.user.avatar

					})
				
					this.blogs = [...this.blogs,...res.data]
					this.count =parseInt((res.message))
				}, () => {
					uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>
