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
				<image src="../../static/icons/ic_good.png" @click.stop="changeGood(blog.id, true)" v-if="good_ids.indexOf(blog.id) < 0"
					class="icon"></text>
				<image src="../../static/icons/ic_good.png" @click.stop="changeGood(blog.id,false )" v-else class="icon"></image>
				<text class="icon-text">{{blog.good}}</text>
				<!-- 点赞 -->
				<image src="../../static/icons//ic_comment.png" mode="" class="icon"></image>
				<text class="icon-text">{{blog.comments.length}} </text>
				<!-- 评论 -->
				<image src="../../static/icons/ic_count.png" mode="" class="icon"></image>
				<!-- 查看人数 -->
				<text class="icon-text">{{blog.readCount}} </text>

			</view>


			<!-- 评论 -->
			<view v-if="hasComment" class="blog-container">
				<view v-for="(item,index) in parents" :key="item.id">
					<view class="parent-container">
						<text class="cmt-author">{{item.nickName}}</text>
						<view class="cmt-time-container">
							<text class="cmt-time">{{item.createTime}}</text>
							<text v-if="canDelete(item)"@click="deleteCmt(item,true,index)" class="txt-delete">[删除]</text>
						</view>
						<image @click.stop="clickShowUser(item)" :src="item.avatar" mode="aspectFill"
							class="cmt-avatar"></image>
						<text class="cmt-content" @click="clickToReply(item)">{{item.content}}</text>
					</view>
					<view v-if="replies[index].length >0" class="replies-container">
						<view v-for="(reply,idx) in replies[index]" :key="reply.id" class="reply-item">
							<view class="reply-info">
								<text class="reply-author">{{reply.nickName}}</text>
								<text class="reply-to">@{{reply.toUser}}</text>
								<text class="cmt-time">{{reply.createTime}}</text>
								<text v-if="canDelete(reply)" @click="deleteCmt(reply,false,index)" class="txt-delete">[删除]</text>
							</view>
							<text @click="clickToReply(reply)" class="reply-content">{{reply.content}}</text>
						</view>
					</view>
					<view v-if="index < parents.length -1" class="cmt-line"></view>
				</view>

			</view>

			<view class="SYPL">
				<text class="SYPLtext">已显示所有评论</text>
			</view>



			<view class="input-container">
				<image @click.stop="clickLogin" :src="userAvatar" mode="aspectFill" class="input-avatar"></image>
				<textarea @input="inputGetValue" auto-height v-model="inputValue" :placeholder="inputHolder"
					class="input-area" placeholder-class="input-holder" />
				<!-- 提交评论按钮 -->
				<image @click="clickCommit" src="../../static/icons/commit.png" class="input-commit"></image>
			</view>


			<dialog-shell ref="shell" title="列表页" confirmText="确定">

				<text style="padding: 10rpx; font-size: 25rpx;">{{userDecs}}</text>

			</dialog-shell>

			<login-dialog @after="afterLogin" ref="login">


			</login-dialog>
		</view>

	</view>
</template>
<script>
	let parentId = null
	let cmtValue = ""
	let app = getApp()
	export default {

		data() {
			return {
				blog: {},
				hasGood: false,
				good_ids: [],
				loaded: false,
				parents: [],
				replies: [],
				hasComment: false,
				inputValue: "",
				inputHolder: "请输入内容",
				userDecs: "",
				userAvatar: "../../static/icons/default_user.png"

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
			
			clickCommit() {
				// 1.判断是否登录
				if (app.globalData.token.length == 0) {
					console.log(cmtValue);
					this.$refs.login.show()
					return
				}
				// 2.判断数据非空合法性
				if (cmtValue.length == 0) {
					uni.showToast({
						title: "请输入评论内容",
						icon: 'none'
					})
				}
				// 3.发请求
				let url = this.$params.host + this.$params.action_add_comment
				let data = {

					nick_name: app.globalData.nickName,
					avatar: "/" + app.globalData.avatar,
					email: app.globalData.email,
					content: cmtValue,
					blog_id: this.blog.id,
					parent_id: parentId,
					token: app.globalData.token,
					is_owner: app.globalData.uid == this.blog.user.id
				}
				this.$request.post(url, data, res => {
					// 4.刷新评论列表
					console.log(res);
					if (!res.success) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						return
					}
					let cmt = {}

					cmt.avatar = res.data.avatar

					cmt.blogId = res.data.blogId
					cmt.content = res.data.content
					cmt.createTime = res.data.createTime
					cmt.email = res.data.email
					cmt.id = res.data.id
					cmt.nickName = res.data.nickName
					cmt.owner = res.data.owner
					cmt.parentId = res.data.parentId
					let comments = this.blog.comments.concat(cmt)
					this.blog.comments = comments
					this.formatComments(comments)
					this.hasComment = this.blog.comments.length > 0
					this.inputHolder = "请输入评论内容......"
					this.inputValue = ""
					cmtValue = ""
					parentId = null
					// 刷新列表页的评论数
				}, () => {})

			},
			afterLogin() {
				this.userAvatar = this.$params.host + getApp().globalData.avatar
			},
			clickLogin() {
				this.$refs.login.show()
			},
			clickShowUser(user) {
				this.userDecs = "作者" + user.nickName + "\n联系方式" + user.email
				this.$refs.shell.show()
			},
			addReadCount(id) {
				let url = this.$params.host + this.$params.action_read_count
				let data = {
					"id": id
				}
				this.$request.postParam(url, data, res => {
					let count = res.data
					//第一张方式:获取上一页实例
					// this.refreshPreviousPage(id, count)
					//第二种方式：使用通知中心解耦
					// this.$noti.post(this.$params.noti_refresh_count, {
					// 	id: id,
					// 	count: count
					// })
					// console.log(id);
					// console.log(count);
				}, () => {
					this.getBlog(id);
				})
			},
			refreshPreviousPage(id, count) {
				let pages = getCurrentPages()
				let prev = pages[pages.length - 2]
				prev.refreshReadCount(id, count)
			},
			refreshGoodPage(id, good) {
				let pages = getCurrentPages();
				let prev = pages[pages.length - 2]
				prev.refreshGoodCount(id, good);
			},
			changeGood(id, hasGood) {
				//同步到服务器,并且去最新数据
				let url = this.$params.host
				let action = hasGood ? this.$params.action_good : this.$params.action_del_good
				url += action
				let data = {
					"id": id
				}
				this.$request.postParam(url, data, res => {
					this.blog.good = res.data
					if (hasGood) {
						this.good_ids.push(id);
						// this.good_ids = this.good_ids.concat(id)
					} else {
						let index = this.good_ids.indexOf(id);
						this.$util.remove(this.good_ids, index)
					}
					uni.setStorageSync(this.$params.key_good_ids, this.good_ids);
				}, () => {})
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
			//评论
			formatComments(comments) {
				if (comments.length == 0) {
					return
				}
				let rootComments = []
				comments.forEach(c => {
					if (!c.avatar.startsWith("http")) {
						c.avatar = this.$params.host + c.avatar.substring(1)
					}
					c.createTime = this.$util.formatTime(new Date(c.createTime))
					if (c.parentId == null) {
						rootComments.push(c)
					}
				})

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
				// console.log(rootComments);
				// console.log(replies);
			},
			getChildren(parent, comments) {
				// todo: 得到parent所有的子评论
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
			canDelete(item) {
				return app.globalData.type ==1 || item.avatar == this.userAvatar
			},
			deleteCmt(cmt,isParent,index){
				let url = this.$params.host + this.$params.action_del_comment + cmt.id
				let data={
					token:app.globalData.token
				}
				uni.showModal({
					title: '删除评论',
					content: '确认删除该评论？ \n 注意，子评论也会同时删除！',
					showCancel: true,
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if(res.confirm){
							uni.showLoading({
								title:"删除评论...",
								mask:false
							});
							this.$request.deleteParams(url,data,res => {
								uni.showToast({
									title:res.message,
									icon:"none"
								});
								if(res.success){
									let list = this.replies[index]
									list.push(this.parents[index])
									this.$util.remove(this.parents,index)
									this.$util.remove(this.replies,index)
									this.blog.comments = this.blog.comments.filter(c=> list.every(r=>r.id!=c.id))
								}else{
									let children = this.getChildren(cmt,this.replies[index])
									children.push(cmt)
									this.replies[index]=this.replies[index].filter(r=>children.every(c => c.id != r.id))
									this.blog.comments = this.blog.comments.filter(c=> children.every(r => r.id != c.id))
								}
							},()=>{
								uni.hideLoading()
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			clickToReply(item) {
				parentId = item.id
				this.inputHolder = "@" + item.nickName
			},
			inputGetValue(e) {
				cmtValue = e.detail.value
				console.log(cmtValue);
			},
		}
	}
</script>

<style>
	@import url("blog.css");
	@import url("");
</style>
