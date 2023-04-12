<template>
	<view>
		<view class="secret-info" v-if=" transfrom!= 'translateY(0)'">
			<text>lzzy.cxy制作</text>
			<image src="../../static/icons/加班.jpg" mode=""></image>

		</view>


		<view @touchcancel="touchStart" @touchmove="touchMove" @touchend="touchEnd" :style="bodyStyle"
			class="sign-up-header">
			<image class="sign-up-img" :src="signupAvartar" mode=""></image>
			<view class=""><text class="welcome">WELCOME!</text></view>
			<view class=""><text class="welcome2">欢迎加入CHAN</text></view>
		</view>
		<view @click="clickChooseImage" class="user">
			<image class="user-img" :src="userAvartar" mode=""></image>
			<text class="user-img-SC">{{avatarUrl}}</text>

		</view>

		<view class="sign-up-container">
			<input @click="inputGet" id="nick" type="text" placeholder="请输入昵称">
		</view>
		<view class="sign-up-container">
			<input @click="inputGet" id="email" type="text" placeholder="请输入邮箱">
		</view>

		<view @click="inputGet" id="user" class="sign-up-container">
			<input type="text" placeholder="请输入用户名">
		</view>
		<view @click="inputGet" id="password" class="sign-up-container">
			<input type="password" placeholder="请输入密码">
		</view>

		<button @click="clickRegister" class="sign-up">注册</button>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				transfrom: "translateY(0)",
				transition: "",
				avatarUrl: "点击上传头像",
				userAvartar: "../../static/icons/default_user.png",
				signupAvartar: "../../static/icons/icon.png",
				//使用ID绑定
				nick: "",
				email: "",
				user: "",
				password: "",
			}
		},
		computed: {
			bodyStyle: function() {
				return {
					"transfrom": this.transfrom,
					"transition": this.transition
				}
			}
		},
		methods: {
			 clickRegister() {
			      if (!checkLength(this.nick, 1,10, '昵称')) {
			        return
			      }
			      if (!checkLength(this.email, 5, '邮箱')) {
			        return
			      }
			      if (!checkLength(this.user, 3,10, '用户名')) {
			        return
			      }
			      if (!checkLength(this.password, 6,18, '密码')) {
			        return
					
			      }
			      // 如果以上所有字段的长度都符合要求，则可以进行注册操作
			      // ...
			    },
			inputGet(event) {
				let id = event.currentTarget.id //nick
				//如果字符串作为变量名称，那么引用该变量就要使用模板字符串，将该变量名字作为插值，并在外层中使用中括号
				this[`${id}`] = event.detail.value
				console.log(event);
			},
			clickChooseImage() {
				let url = this.$params.host + this.$params.action_upload
				uni.chooseImage({
					success: res => {
						let filePath = res.tempFilePaths[0]
						uni.showLoading({
							title: "上传头像...",
							mask: false
						});
						this.$request.postFile(url, 'file', filePath, {}, res => {
							uni.hideLoading()
							let json = JSON.parse(res.data)
							if (json.success) {
								this.avatarUrl = json.data
								this.userAvartar = this.$params.host + json.data
								this.signupAvartar = this.$params.host + json.data
							}
						})
					}
				})
			},
			touchStart(e) {
				pointY = e.touches[0].clientY
			},
			touchMove(e) {
				let distance = e.touches[0].clientY - DOMPointReadOnly
				if (distance > 150) {
					distance = 150
				}
				if (distance < 50) {
					return
				}
				this.transfrom = `translateY(${distance}rpx)`
				this.transition = ""
			},
			touchEnd(e) {
				this.transfrom = 'translateY(0)'
				this.transition = 'transform 800ms linear'
			}
		}
	}
</script>

<style>
	@import url("register.css");
	
</style>
