<template>

	<view class="content">
		
		<uni-search-bar placeholder="请输入关键字搜索" class="uni-searchbar" cancel-button="none" radius="50"
		 @confirm="search" @clear="clearKeyword" />
			<!-- 实现搜索框 -->
		
		
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
<!--            <image src="../../static/icons/ic_share.png" class="fenxiang" mode="widthFix"></image>
 -->           <!-- <i class="iconfont">&#xe603;</i> -->
			
			
			
			<text class="iconfont icon-fenxiang img-iconfont"></text>
			 <!-- 前面加 iconfont   不要加上:before -->
			<!-- .icon-fenxiang:before -->
			<!-- <text class="iconfont icon-wodedizhi "></text>  主页小图标 未完成 -->
			
			
			
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
		
		<view v-if="blogs.length == count" class="bottom-view">
			<image src="../../static/icons/bottom-view.png" mode=""></image>
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
				count: -1,
				 reachBottomTip: '',
				 searching:false
				
			}
		},
	
		
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
			if(this.searching || this.blogs.lengt == this.count){
				
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
			},
			// 对应方法
			search(e){
			  
				//控制台可以得到搜索值
				// console.log(e.value)
				let kw = e.value
				if(kw.length > 0 ){  //验证内容是否为空
					//1.清空列表数据  2.重置count 3.发起请求 3.1.要在常亮文件中添加搜索地址3.2.使用get方法发起请求，3.3.请求的结果要经过处理
					this.blogs = []
					this.count=-1
					let url = this.$params.host + this.$params.action_search + kw
					this.$request.get(url,res =>{
						res.data.forEach(blog => {
								if (!blog.picture.startsWith("http")) {
									blog.picture = this.$params.host + blog.picture
								}
								blog.user.avatar = this.$params.host + blog.user.avatar						
							})						
							this.blogs = [...this.blogs,...res.data]						
						}, () => {
							
						})					
					}					
				},	
			clearKeyword(){
				this.blogs = []//初始化blogs
				//初始化分页
				page=0
				
				//重新开始分页
				this.getPagedBlogs()
				this.searching = false
			}
		}
	}
</script>

<style>
	@import url("/iconfont/iconfont.css");
	@import url("index.css");
</style>
