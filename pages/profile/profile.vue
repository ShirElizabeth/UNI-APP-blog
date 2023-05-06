<template>
	<view>

		<view v-if="authorized" class="">
			<view class="head-container">
				<image :src="avatar" class="img-avatar" mode=""></image>
				<view class="user-info-container">
					<view class="nick-type-container">
						<text class="nick-badge">{{nick + "-" + "["+ uTypes[type] +"]"}}</text>
						<image class="img-badge" :src="badges[type]" mode=""></image>
						<text @click="clickLogout" class="iconfont icon-zhuxiao ic-add"></text>
						</image>

					</view>
					<text class="user-email">{{email}}</text>
				</view>

			</view>
			<view class="data-container">
				<view @click="clickSwitch(0)" class="data-title-container">
					<text class="data-title-name">我发布的{{myCount}}文章</text>
					<text
						:class="status[0].visible ? 'iconfont icon-under ic-arrow' : 'iconfont icon-up ic-arrow'"></text>
				</view>

				<scroll-view v-if="status[0].visible" scroll-x class="scroll" scroll-with-animation="true"
					@scrolltolower="getMyBlog">

					<view @click="onClickGoTo(blog.id)" v-for="(blog,index) in myBlog" :key="'m_' + blog.id" class="scroll-item">
						<image :src="blog.picture" mode="aspectFill"></image>
						<text>{{blog.title}}</text>
					</view>

				</scroll-view>


			</view>
			<view class="data-container">
				<view @click="clickSwitch(1)" class="data-title-container">
					<text class="data-title-name">我管理的12个类别数据</text>
					<text
						:class="status[1].visible ? 'iconfont icon-under ic-arrow' : 'iconfont icon-up ic-arrow'"></text>
				</view>

				<view v-if="status[1].visible">

					<view class="data-item" v-for="(c,index) in categories" :key="'prefix-' + c.id">
						<text @click="clickUpdataCategory(c.id,c.name)" class="data-item-name">{{c.name}}</text>
						<text @click="c.count==0?clickDelete(c.id,c.name):''"
							:class="c.count === 0 ? 'data-item-btn' : 'data-item-count'">{{ c.count === 0 ? 'x' : c.count }}</text>
					</view>
					<view class="data-item">
						<text class="iconfont icon-tianjia ic-add" @click="clickAdd"></text>
					</view>
					<dialog-shell ref="add_shell" title="添加类别" @confirm="confirmAdd">
						<view style="margin: 10rpx;">
							<input type="text" placeholder="请输入名称" focus style="padding-left: 15rpx;"
								@input="inputGetValue">
						</view>
					</dialog-shell>
					<dialog-shell ref="update_shell" title="修改类别" @confirm="confirmUpdate">
						<view style="margin: 10rpx;">
							<input type="text" placeholder="请输入新的名称" focus style="padding-left: 15rpx;"
								@input="inputGetValue">
						</view>
					</dialog-shell>


				</view>



			</view>



			<view class="data-container">
				<view @click="clickSwitch(2)" class="data-title-container">
					<text class="data-title-name">赞过的{{myGoodCount}}文章</text>
					<text
						:class="status[2].visible ? 'iconfont icon-under ic-arrow' : 'iconfont icon-up ic-arrow'"></text>
				</view>

				<scroll-view v-if="status[2].visible" scroll-x class="scroll" scroll-with-animation="true">


					<view  v-for="(blog,index)  in myGoodBlogs" @click="onClickGoTo(blog.id)" :key="'g_'+blog.id"
						class="scroll-item">
						<image :src="blog.picture" mode="aspectFill"></image>
						<text>{{blog.title}}</text>
					</view>


				</scroll-view>


			</view>


	<view class="data-container">
	  <view @click="clickSwitch(3)" class="data-title-container">
	    <text class="data-title-name">管理19个标签数据</text>
	    <text :class="status[3].visible ? 'iconfont icon-under ic-arrow' : 'iconfont icon-up ic-arrow'"></text>
	  </view>
	
	  <scroll-view v-if="status[3].visible" scroll-x class="scroll" scroll-with-animation="true">
	    <view class="data-item" v-for="(tag,index) in tags" :key="'tag-' + tag.id">
	      <text class="data-item-name">{{tag.name}}</text>
	      <view class="data-item-count">{{tag.count}}</view>
	    </view>
	  </scroll-view>


			</view>




		</view>
		<login-dialog ref="login" @after="afterLogin"></login-dialog>
	</view>
</template>

<script>
	let app = getApp()
	let page = 0
	// let good = []
	let newName = ""
	let updateId = ""
	export default {
		data() {
			return {
				authorized: app.globalData.token.length > 0,
				avatar: this.$params.host + app.globalData.avatar,
				nick: app.globalData.nickName,
				type: app.globalData.type,
				uTypes: ["管理员", "认证博主", "普通会员"],
				badges: ["../../static/icons/badge0.png", "../../static/icons/badge1.png",
					"../../static/icons/badge2.png"
				],
				user: app.globalData.userName,
				email: app.globalData.email,
				status: [{
						visible: false
					},
					{
						visible: false
					},
					{
						visible: false
					},
					{
						visible: false
					},
					{
						visible: false
					},
					
				],
				myBlog: [],
				myCount: -1,
				myGoodBlogs: [],
				myGoodCount: -1,
				categories: [],
				 tags: [], // 初始化为空数组
			}
		},
		onShow() {
			if (!this.afterLogin) {
				return
			}
			this.loadData()
		},
		onLoad() {
			// this.$noti.add(this.$params.noti_login_status, this.afterLogin, this)
		},
		onUnload() {
			this.$noti.remove(this.$params.noti_login_status, this)
		},
		mounted() {
			this.authorized = app.globalData.token.length > 0
			if (!this.authorized) {
				this.$refs.login.show()
			}
		},
		methods: {
			onClickGoTo(index) {
							uni.navigateTo({
								url: '../blog/blog?id=' + index,
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						},
			clickDelete(id, name) {
				let url = this.$params.host + this.$params.action_category_del + id
				let data = {
					"token": app.globalData.token
				}
				uni.showModal({
					title: '确认',
					content: '确认要删除' + name + '吗？',
					showCancel: true,
					cancelText: '再想想',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.$request.deleteParams(url, data, res => {
								if (res.success) {
									this.categories = this.categories.filter(c => c.id != id)
								} else {
									uni.showToast({
										title: res.message,
										icon: 'none'
									});
								}
							}, () => {})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			clickUpdataCategory(id, name) {
				newName = name
				updateId = id
				this.oldName = name
				this.$refs.update_shell.show()
			},
			//修改类别标签
			confirmUpdate() {
				if (newName.trim().length == 0) {
					uni.showToast({
						title: '请输入类别名称',
						icon: 'none'
					});
					return
				}
				let url = this.$params.host + this.$params.action_categories_put + updateId
				let data = {
					"token": app.globalData.token,
					"name": newName
				}
				this.$request.requestAsync(url, data, 'PUT')
					.then(res => {
						if (!res.data.success) {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							});
						} else {
							this.categories.forEach(c => {
								if (c.id == res.data.data.id) {
									c.name = res.data.data.name
								}
							})
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			inputGetValue(e) {
				newName = e.detail.value
			},
			clickUpdate() {
				this.$refs.update_shell.show()
			},
			clickAdd() {
				this.$refs.add_shell.show()
			},
			//添加类别标签
			confirmAdd() {
				//1.检查数据合法性
				if (newName.trim().length == 0) {
					uni.showToast({
						title: '请输入类别名称',
						icon: "none"
					});
					return
				}
				//2.标签，先确定类别或标签

				//3.发送请求
				let url = this.$params.host + this.$params.action_categories_add
				let data = {
					"token": app.globalData.token,
					"name": newName
				}
				this.$request.requestAsync(url, data, 'POST')
					.then(res => {
						if (!res.data.success) {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							});
						} else {
							this.categories.forEach(c => {
								if (c.id == res.data.data.id) {
									c.name = res.data.data.name
								}
							})
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			notificationRefreshGood(info) {
				let blog_ids = uni.getStorageSync(this.$params.key_goods)
				good = blog_ids
				this.myGoodsBlogs = []
			},
			toDetail(id) {
				uni.navigateTo({
					url: '../blog/blog?id=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			loadData() {
				this.myBlog = []
				this.myCount = -1
				page = 0
				this.getMyBlog()
				// this.getMyGoods()
				this.getCategories()
			},

			getMyBlog() {
				// if(this.myCount >= 0 && this.myBlogs.length == this.myCount){
				//      return
				//     }
				let header = {
					"content-type": "application/json;charset=UTF-8",
					"page": page++,
					"size": 2
				}
				let url = this.$params.host + this.$params.action_my_blogs + app.globalData.uid
				this.$request.getWithHeader(url, header, res => {
					res.data.forEach(blog => {
						if (!blog.picture.startsWith('http')) {
							blog.picture = this.$params.host + blog.picture
						}
					})
					this.myBlog = this.myBlog.concat(res.data)
					this.myCount = parseInt(res.message)
					this.status[0].visible = this.myCount > 0
				}, () => {})
			},
			getCategories() {
				this.categories = []
				let url = this.$params.host + this.$params.action_categories
				this.$request.get(url, res => {
					url = this.$params.host + this.$params.action_category_count
					res.data.forEach(async (c) => {
						let r = await this.$request.requestAsync(url + c.id)
						if (r.data.success) {
							let category = {
								id: c.id,
								name: c.name,
								count: r.data.data
							}
							this.categories.push(category)
						}
					})
				}, () => {})
			},
			// 获取标签数据
			getTags() {
			    this.tags = []
			    let url = this.$params.host + this.$params.action_tags
			    this.$request.get(url, res => {
			        url = this.$params.host + this.$params.action_tag_count
			        res.data.forEach(async (t) => {
			            let r = await this.$request.requestAsync(url + t.id)
			            if (r.data.success) {
			                let tag = {
			                    id: t.id,
			                    name: t.name,
			                    count: r.data.data
			                }
			                this.tags.push(tag)
			            }
			        })
			    }, () => {})
			},
			getMyGoodBlogs() {
				if (this.myGoodBlogs >= 0 && this.myGoodBlogs.length == this.myGoodCount) return
				//TODO 完成点赞过的文章
				let goods = uni.getStorageSync(this.$params.key_good_ids);
				this.myGoodBlogs = []
				this.myGoodCount = -1;
				goods.forEach(good => {
					this.$request.get(this.$params.host + this.$params.action_hot + good, (res) => {
						if (!res.data.picture.startsWith('http')) res.data.picture = this.$params.host +
							res.data.picture
						console.log(res);
						let item = {
							"title": res.data.title,
							"id": res.data.id,
							"picture": res.data.picture
						}
						this.myGoodBlogs = this.myGoodBlogs.concat(item);
						this.myGoodCount = goods.length;
						this.status[1].Visible = this.myGoodCount > 0;
						console.log(this.myGoodBlogs);
					}, () => {})

				})
			},
			clickSwitch(index) {
				let now = this.status[index].visible
				this.status[index].visible = !now
			},
			clickLogout() {
				let url = this.$params.host + this.$params.action_logout
				let data = {
					token: app.globalData.token
				}
				this.$request.postParam(url, data, res => {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
					uni.showModal({
						title: '注销账号',
						content: '确认注销账号吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确认',
						success: (res) => {
							if (res.confirm) {
								this.authorized = false
								app.globalData.token = ""
								app.globalData.avatar = "/static/icons/default_user.png"
								app.globalData.type = -1
								app.globalData.nickName = ""
								app.globalData.userName = ""
								app.globalData.email = ""
								this.myBlog = ""
								this.myCount = ""
								this.$refs.login.show()
							}
						}
					});
				}, () => {})
			},
			afterLogin() {
				if (this.authorized) {
					return
				}
				this.authorized = app.globalData.token.length > 0
				this.nick = app.globalData.nickName
				this.type = app.globalData.type
				this.user = app.globalData.userName
				this.email = app.globalData.email
				this.avatar = this.$params.host + app.globalData.avatar
				this.loadData()
			}
		}
	}
</script>

<style>
	@import url("profile.css");
</style>
