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
				<image @click.stop="changeGood(blog.id,false )" v-else src="../../static/icons/ic_good.png"
					class="icon"></image>
				<text class="icon-text">{{blog.good}}</text>
				<!-- 点赞 -->
				<image src="../../static/icons//ic_comment.png" mode="" class="icon"></image>
				<text class="icon-text">{{blog.comments.length}} </text>
				<!-- 评论 -->
				<image src="../../static/icons/ic_count.png" mode="" class="icon"></image>
				<!-- 查看人数 -->
				<text class="icon-text">{{blog.readCount}} </text>

			</view>

			<view v-if="hasComment" class="blog-container">
				<view v-for="(item,index) in parents" :key="item.id">
					<view class="parent-container">
						<text class="cmt-author">{{item.nickName}}</text>
						<view class="cmt-time-container">
							<text class="cmt-time">{{item.createTime}}</text>
							<text v-if="canDelete(item)" class="txt-delete">[删除]</text>
						</view>
						<image :src="item.avatar" mode="aspectFill" class="cmt-avatar"></image>
						<text class="cmt-content">{{item.content}}</text>
					</view>
					<view v-if="replies[index].length >0" class="replies-container">
						<view v-for="(reply,idx) in replies[index]" :key="reply.id" class="reply-item">
							<view class="reply-info">
								<text class="reply-author">{{reply.nickName}}</text>
								<text class="reply-to">@{{reply.toUser}}</text>
								<text class="cmt-time">{{reply.createTime}}</text>
								<text v-if="canDelete(reply)" class="txt-delete">[删除]</text>
							</view>
							<text class="reply-content">{{reply.content}}</text>
						</view>
					</view>
					<view v-if="index < parents.length -1" class="cmt-line"></view>
				</view>
			</view>
			
			
			
			
			<view class="huifu">
				<image src="../../static/icons/汉堡包.jpg" mode="aspectFill"></image>
				<input type="text" placeholder="请输入回复内容">
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
				replies: [],
				hasComment: false
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
					// this.$noti.post(this.$params.noti_refresh_count, {
					// 	id,
					// 	count
					// })
					// console.log(id);
					// console.log(count);	
				}, () => {

					this.getBlog(id)
				})
			},

			getBlog(id) {
				let url = this.$params.host + this.$params.action_blog + id
				this.$request.get(url, res => {
					this.loaded = true
					let blog = res.data
					this.hasComment = blog.comments.length > 0
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
					this.formatComments(this.blog.comments)
				}, () => {})
			},
			formatComments(comments) {
				if (comments.length == 0) {
					return
				}
				let rootComments = []
				comments.forEach(c => { //找根评论
					if (!c.avatar.startsWith("http")) {
						c.avatar = this.$params.host + c.avatar.substring(1)
					}
					c.createTime = this.$util.formatTime(new Date(c.createTime))
					if (c.parentId == null) {
						rootComments.push(c)
					}
				})
				// 排序评论，倒序
				rootComments.sort((c1, c2) => {
					return new Date(c2.createTime).getTime() - new Date(c1.createTime).getTime()
				})
				let replies = new Array(rootComments.length).fill([])
				let index = 0
				rootComments.forEach(r => {
					let cmmts = []
					cmmts = cmmts.concat(this.getChildren(r, comments))
					replies[index++] = cmmts
					comments = comments.filter(c => cmmts.every(cc => cc.id != c.id))
				})
				this.parents = rootComments
				this.replies = replies
				console.log(rootComments);
				console.log(replies);
			},
			getChildren(parent, comments) {
				// 得到parent所有的子评论
				let childrenComments = [];
				comments.forEach(comment => {
					if (parent.id == comment.parentId) {
						comment.toUser = parent.nickName
						childrenComments.push(comment);
						let cmmts = comments.filter(cmt => cmt.id != comment.id)
						childrenComments.concat(this.getChildren(comment, cmmts));
					}
				})
				return childrenComments;
			},
			canDelete(item, reply) {
				return true;
			}
		}
	}
</script>

<style>
	@import url("blog.css");
	@import url("");
</style>
