<template>
	<view>
		<dialog-shell ref="shell" title="用户登录" confirm-text="登录" @confirm="confirmLogin()">
			<image src="../../static/icons/icon.png" class="login-img" mode=""></image>
			<text class="welcome">欢迎登录</text>
			<text class="info-register" @click="clickGoRegister">没有账号？请注册</text>


			<view class="login-container">
				<input placeholder-class="input-holder" :value="userValue" type="text" placeholder="username"
					@input="inputGetUser">
				<text class="iconfont icon-yonghu img-iconfont"></text>
			</view>


			<view class="login-container" style="margin-bottom: 20rpx;">
				<input v-if="isPwd" :value="pwdValue" type="password" placeholder="password"
					placeholder-class="input-holder" @input="inputGetPwd" />
				<input v-else type="text" :value="pwdValue" placeholder="password" placeholder-class="input-holder"
					@input="inputGetPwd" />
				<text
					:class="isPwd ? 'iconfont icon-ai47 img-iconfont ic-pwd-status'  :  'iconfont icon-ai44 img-iconfont ic-pwd-status'"
					@click="clickSwtich"></text>
				<text class=" iconfont icon-yuechi  img-iconfont"></text>
			</view>



		</dialog-shell>
	</view>
</template>

<script>
	export default {
		name: "login-dialog",
		data() {
			return {
				isPwd: true,
				pwdValue: "",
				userValue: ""
			};

		},
		mounted() {
			let userInfo = uni.getStorageSync("userLoginInfo")
			if (userInfo) {
				this.userValue = userInfo.username
				this.pwdValue = userInfo.password
			}
		},
		methods: {
			clickGoRegister(){
				uni.navigateTo({
					url: '../../pages/register/register',
					success: res => {
						this.$refs.shell.clickToHide()
					},
					fail: () => {},
					complete: () => {}
				});
			},
			show() {
				this.$refs.shell.show()
			},
			clickSwtich() {
				this.isPwd = !this.isPwd
			},
			inputGetPwd(e) {
				this.pwdValue = e.detail.value
			},
			inputGetUser(e) {
				this.userValue = e.detail.value
			},
			
			confirmLogin() {
				if (this.userValue.length == 0 || this.pwdValue.length == 0) {
					uni.showToast({
						title: "请输入用户名密码！",
						icon: "none"
					});
					return
				}

				let url = this.$params.host + this.$params.action_login
				let data = {
					username: this.userValue,
					password: this.pwdValue
				}
				this.$request.post(url, data, res => {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
					if (!res.success) {
						this.$refs.shell.show()
						this.userValue = ""
						this.pwdValue = ""
						return

					}
					uni.getStorageSync('userLoginInfo', data)
					let app = getApp()
					app.globalData.uid = res.data.id
					app.globalData.token = res.data.token
					app.globalData.avatar = res.data.avatar
					console.log(res.data.avatar);
					app.globalData.type = res.data.type
					app.globalData.nickName = res.data.nickName
					app.globalData.userName = res.data.userName
					app.globalData.email = res.data.email
					this.$emit("after")
					// this.$noti.post
 
				}, () => {})
			}
		}
	}
</script>

<style>
	@import url("login-dialog.css");
</style>
