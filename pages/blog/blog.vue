<template>
	<view class="root">
		<view v-if="loaded" class="blog-container">
			<text class="blog-title">{{blog.title}}</text>
			<text class="blog-author">{{blog.user.nickName}} @ {{blog.createTime}}</text>
			<rich-text :nodes="blog.content" class="blog-content"></rich-text>
			<image :src="blog.picture" mode="widthFix" class="img item-pic"></image>
			<!-- 博客图片 -->
			<view class="">
				<text class="item-tag" v-for="(tag,idx) in blog.tags" :key="idx">{{tag}}</text>
			</view>
			<!-- 用户头像     aspectFill :                 -->
			<image :src="blog.user.avatar" mode="aspectFill" class="img-head"></image>
			<!-- 点赞 -->
			<view class="icon-container">
				
				<image @click.stop="changeGood(blog.id, true)" v-if="hasGood" src="../../static/icons/ic_good_fill.png"
					class="icon"></image>
					<image @click.stop="changeGood(blog.id,false )"v-else  src="../../static/icons/ic_good.png"class="icon"></image>
				<text class="icon-text">{{blog.good}}</text>
				<!-- 点赞 -->
				<image src="../../static/icons//ic_comment.png" mode="" class="icon"></image>
				<text class="icon-text">{{blog.comments.length}} </text>
				<!-- 评论 -->
				<image src="../../static/icons/ic_count.png" mode="" class="icon"></image>
				<!-- 查看人数 -->
				<text class="icon-text">{{blog.readCount}} </text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				blog: {},
				hasGood: false,
				loaded: false,
				parents: [],
				replies: []
			}
		},
		onLoad(options) { //获取id
			let id = options.id
			let good_ids = uni.getStorageSync(this.$params.key_good_ids)
			if (good_ids) {
				this.hasGood = good_ids.indexOf(id) >= 0
			}
			this.addReadCount(id)
		},
		methods: {
			addReadCount(id) {
				let url = this.$params.host + this.$params.action_read_count
				let data = {
					"id": id
				}
				
				this.$request.postParam(url, data, res => {
					let count = res.data
					//第一种方式，获取上一页面实例
					// this.refreshPreviousPage(id,count)
					//第二种方式，使用通知中心解耦
					this.$noti.post(this.$params.noti_refresh_count, {
						id,
						count
					})
					console.log(id);
					console.log(count);	
				}, () => {

					this.getBlog(id)
				})
			},

			getBlog(id) {
				let url = this.$params.host + this.$params.action_blog + id
				this.$request.get(url, res => {
					this.loaded = true
					let blog = res.data
					uni.setNavigationBarTitle({
						title: blog.user.nickName
					})
					if (!blog.picture.startsWith("http")) {
						blog.picture = this.$params.host + blog.picture
					}
					blog.user.avatar = this.$params.host + blog.user.avatar
					blog.content = blog.content.replace(/\<img/gi, '<img class="img" ')
					blog.createTime = this.$util.formatTime(new Date(blog.createTime))
					this.blog = blog
				}, () => {})
			}
		}
	}
</script>

<style>
	@import url("blog.css");
	@import url("");
</style>
