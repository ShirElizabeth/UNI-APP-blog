<template>
	<view>

		<view v-if="authorized" class="">
			<view class="head-container">
				<image :src="avatar" class="img-avatar" mode=""></image>
				<view class="user-info-container">
					<view class="nick-type-container">
						<text class="nick-badge">{{nick + "-" + "["+ uTypes[type] +"]"}}</text>
						<image class="img-badge" :src="badges[type]" mode=""></image>
						<image @click="clickLogout" class="clickLogout" src="../../static/icons//点击图标.png" mode="">
						</image>

					</view>
					<text class="user-email">{{email}}</text>
				</view>

			</view>
			<view class="data-container">
				<view @click="clickSwitch" class="data-title-container">
					<text class="data-title-name">我发布的文章</text>
					<text :class="status.visible ? 'iconfont icon-under ic-arrow' : 'iconfont icon-up ic-arrow'"></text>
				</view>

				<scroll-view v-if="status.visible" scroll-x class="scroll" scroll-with-animation="true">

					<view class="scroll-item">
						<image src="../../static/icons/加班.jpg" mode=""></image>
						<image src="../../static/icons/加班.jpg" mode=""></image>
						<image src="../../static/icons/加班.jpg" mode=""></image>
						<image src="../../static/icons/加班.jpg" mode=""></image>


					</view>

				</scroll-view>

			</view>


		</view>
		<login-dialog ref="login" @after="afterLogin"></login-dialog>
	</view>
</template>

<script>
	let app = getApp()
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
				status: {
					visible: false // 设置初始值
				},

			}
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
			clickSwitch() {
				let now = this.status.visible
				this.status.visible = !now
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
								this.$refs.login.show()
							}
						}
					});
				}, () => {})
			},
			afterLogin() {
				this.authorized = app.globalData.token.length > 0
				this.nick = app.globalData.nickName
				this.type = app.globalData.type
				this.user = app.globalData.userName
				this.email = app.globalData.email
				this.avatar = this.$params.host + app.globalData.avatar
			}
		}
	}
</script>

<style>
	@import url("profile.css");
</style>
