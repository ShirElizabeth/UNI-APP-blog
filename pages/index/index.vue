<template>

	<view class="content">
		<!-- 使用uni-app内置的组件search-bar实现搜索栏,给搜索栏组件绑定一个search事件，当输入框中的内容发生变化时触发该事件。
		在search事件的处理函数中，获取输入框中的内容，并调用接口获取搜索结果。将获取到的搜索结果展示在页面中 -->
		
			   <!--@confirm="search" 搜索  -->
		  <!--@clear="clearKeyword" 清空  -->	
		<uni-search-bar placeholder="请输入关键字搜索" class="uni-searchbar" cancel-button="none" radius="50"
		 @confirm="search" @clear="clearKeyword" />
			<!-- 引入插件 使用uni-search-bar实现搜索框 -->
		
		<!-- 如果 blogs 数组为空，则提示暂无相关文章 -->
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
			
			
			
			<!-- 右上角iconfont图标 -->
		<!-- 前面加 iconfont   不要加上:before -->
		<!-- .icon-fenxiang:before -->
		<!-- <text class="iconfont icon-wodedizhi "></text>  主页小图标 未完成 -->
			<text class="iconfont icon-fenxiang img-iconfont"></text>
			<!-- 右上角iconfont图标 --> 
			
			
			
			 <!-- 点赞 --><!-- 点赞 --><!-- 点赞 --><!-- 点赞 --><!-- 点赞 --><!-- 点赞 --><!-- 点赞 --><!-- 点赞 --><!-- 点赞 -->
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
			<!-- 点赞 --><!-- 点赞 --><!-- 点赞 --><!-- 点赞 --><!-- 点赞 --><!-- 点赞 --><!-- 点赞 --><!-- 点赞 --><!-- 点赞 -->
					</view>
		
			
		<!-- 判断 blogs 数组的长度是否达到预设值 count，是则提示到达底部 -->
		<view v-if="blogs.length >= count" class="bottom-view">
			<image src="../../static/icons/bottom-view.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	// 全局变量
	let page = 0// 当前页数
	let size = 3// 每页数量
	// 定义存储博客列表的本地存储键值
	let key_blogs = "blogs";
	// 定义存储当前博客ID的本地存储键值
	let key_goods = "goods";

	

	export default {
		data() {
			return {
				blogs: [],//数据存放的数组
				count: -1,//保存返回的总数据条数
				 searching:false,//是否正在搜索
				good_ids: []
			}
		},
	
		
		onLoad() {
					let blogs = uni.getStorageSync(key_blogs)
								let goods = uni.getStorageSync(key_goods)
								if (blogs) {
									//已有缓存 本地读取
									this.blogs = blogs
									this.good_ids = goods
									
									this.count = blogs.length
								} else {
									//网络获取
									this.getPagedBlogs();
								}								
							},
		onPullDownRefresh() {//下拉刷新后初始化
			page = 0 //页数清零
			this.blogs = []//数据清零
			this.count = -1//总数返回初始值
			this.getPagedBlogs()//再次执行方法
		},
		onReachBottom() { // 上拉加载时自动调用
			if(this.searching || this.blogs.lengt == this.count){//搜索中禁用分页
				
				return
			}
			page +=1 //当前页数 +1
			this.getPagedBlogs()
		},
		methods: {
			getPagedBlogs() {
				
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
					
					uni.setStorageSync(key_blogs, this.blogs); //保存数据到本地
				}, () => {
					uni.stopPullDownRefresh()
				})
			},
			onChangeGood(id, isGood) {
							if (isGood) {
								this.good_ids.push(id);
							} else {
								// this.good_ids.splice(this.good_ids.indexOf(id), 1);
								console.log(this.good_ids);
								this.$util.remove(this.good_ids, this.good_ids.indexOf(id));
							}
							uni.setStorageSync(key_goods, this.good_ids);
							//同步到服务器,并且去最新数据
						},
						gotoDetail() {
						
						},
						
			// <!-- 使用uni-app内置的组件search-bar实现搜索栏,给搜索栏组件绑定一个@confirm事件，当输入框中的内容发生变化时触发该事件。
			// 在search事件的处理函数中，获取输入框中的内容，并调用接口获取搜索结果。将获取到的搜索结果展示在页面中 -->
			// 对应方法
			// 实现搜素请求
			// 1.控制台可以得到搜索值
			// 2.验证搜索栏内容是否为空
			// 3.清空列表数据
			// 4.发起请求 要在常量文件中添加搜索地址  
			// 5.使用get方法发起请求
			// 6.验证搜索栏内容是否为空
			// 7.处理请求结果 将搜索结果赋值给blogs,将请求结果展示到页面中
			//在这节课中，我们使用了uni-app内置的search-bar组件，并给它绑定了一个@confirm事件。
			//当用户在搜索栏中输入内容时，会触发search方法。在search方法中，我们获取了输入框中的内容，
			//并模拟了调用接口获取搜索结果的过程。最后，将搜索结果赋值给blogs，再在页面中渲染出来。
			search(e){
				//控制台可以得到搜索值
				// console.log(e.value)
				let kw = e.value
				 //验证搜索栏内容是否为空
				if(kw.length > 0 ){ 
					//1.清空列表数据  
					this.blogs = []
					// 2.重置count
					this.count=-1
					// 发起请求 要在常量文件中添加搜索地址 使用get 方法发起请求 处理请求结果
					let url = this.$params.host + this.$params.action_search + kw
					this.$request.get(url,res =>{
						res.data.forEach(blog => {
								if (!blog.picture.startsWith("http")) {
									blog.picture = this.$params.host + blog.picture
								}
								blog.user.avatar = this.$params.host + blog.user.avatar						
							})				
									// 将搜索结果赋值给blogs,将请求结果展示到页面中
							this.blogs = [...this.blogs,...res.data]						
						}, () => {
							// this.getPagedBlogs=true
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
