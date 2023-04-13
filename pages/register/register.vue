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

		<!-- <view class="sign-up-container">
			<input @input="inputGet" id="nick" type="text" placeholder="请输入昵称">
		</view>
		<view class="sign-up-container">
			<input @input="inputGet" id="email" type="text" placeholder="请输入邮箱">
		</view>

		<view @input="inputGet" id="user" class="sign-up-container">
			<input type="text" placeholder="请输入用户名">
		</view>
		<view @input="inputGet" id="password" class="sign-up-container">
			<input type="password" placeholder="请输入密码">
		</view>

		<button @click="clickRegister()" class="sign-up">注册</button> -->

		<input type="text" class="sign-up-container" placeholder-class="input-holder" value="" placeholder="请输入昵称"
			id="nick" @input="inputGet" />


		<input type="text" class="sign-up-container" placeholder-class="input-holder" value="" placeholder="请输入邮箱"
			id="email" @input="inputGet" />


		<input type="text" class="sign-up-container" placeholder-class="input-holder" value="" placeholder="请输入用户名"
			id="user" @input="inputGet" />


		<input type="safe-password" class="sign-up-container" placeholder-class="input-holder" value=""
			placeholder="请输入密码" id="password" @input="inputGet" />
		<button class="sign-up" @click="clickRegister">注册</button>

	</view>
</template>

<script>
	let pointY = 0
	let pic = ""
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
			// checkValid() {
			//     if (this.nick.length == 0) {
			//      this.nick = this.user
			//     }

			//     if (!this.$utli.checkLength(this.user, 6, "用户名") || !this.$utli.checkLength(this.password, 6, "密码")) {
			//      return false;
			//     }
			//     if (this.email.length === 0 || !this.validateEmail(this.email)) {
			//      uni.showToast({
			//       title: '电子邮箱格式不正确',
			//       icon: 'none'
			//      });
			//      return false;
			//     }
			//     if (this.userAvartar == "../../static/icons/default_user.png") {
			//      uni.showToast({
			//       title: '请点击图片上传',
			//       icon: 'none'
			//      });
			//      return false
			//     }
			//     return true;
			//    },
			//    validateEmail(email) {
			//     // 使用正则表达式检查邮箱格式
			//     const emailRegEx = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
			//     return emailRegEx.test(email);
			//    },
			// 		   clickRegister() {
			// 		    if (!this.checkValid()) {
			// 		     return
			// 		    }
			// 		    let data = {
			// 		     "nick_name": this.nick,
			// 		     "user_name": this.user,
			// 		     "password": this.password,
			// 		     "avatar": pic,
			// 		     "email": this.email
			// 		    } 
			// 		    let url = this.$params.host + this.$params.action_register
			// 		    this.$request.post(url,data,res => {
			// 		     uni.showToast({
			// 		      title: res.message,
			// 		      icon:'icon'
			// 		     });
			// 		     if(!res.success){
			// 		      return
			// 		     }
			// 		     let app = getApp()
			// 		     app.globalData.uid = res.data.id
			// 		     app.globalData.token = res.data.token
			// 		     app.globalData.avatar = res.data.avatar
			// 		     app.globalData.type = res.data.type
			// 		     app.globalData.nickName = res.data.nickName
			// 		     app.globalData.userName = res.data.userName
			// 		     app.globalData.email = res.data.email
			// 		     this.$noti.post(this.$params.noti_login_status)
			// 		     uni.navigateBack();
			// 		    }),() =>{}
			// 		   },
			//数据校验
			   checkValid() {
			    if (this.nick.length == 0) {
			     this.nick = this.user
			    }
			
			    // if (!this.$utli.checkLength(this.user, 6, "用户名") || !this.$utli.checkLength(this.password, 6, "密码")) {
			    //  return false
			    // }
			                //正则表达式检查电子邮件地址是否合法
			    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  
			        if (!regex.test(this.email)) {
			         uni.showToast({
			          title: "邮箱格式错误",
			          icon: 'none'
			         });
			         return false
			        }
			    // 判断是否上传头像
			    if (this.userAvartar == "") {
			     uni.showToast({
			      title: '请上传头像',
			      icon: 'none'
			     });
			     return false
			    }
			
			   },
			   //注册请求
			   clickRegister() {
			    //调用方法进行数据校验
			    if (this.checkValid()) {
			     return
			    }
			    //请求地址
			    let url = this.$params.host + this.$params.action_register
			    // 封装数据
			    let data = {
			     'avatar': pic,
			     'email': this.email,
			     'nick_name': this.nick,
			     'password': this.password,
			     'user_name': this.user
			    }
			    // 发请求
			    this.$request.post(url, data, res => {
			     console.log(res.data)
			     uni.showToast({
			      title:res.message,
			      icon:'none'
			     });
			     if(!res.success){
			      return
			     }
			     // 用户信息封装
			     let app =getApp()
			     app.globalData.uid=res.data.id
			     app.globalData.token =res.data.token
			     app.globalData.avatar=res.data.avatar
			     app.globalData.type=res.data.type
			     app.globalData.nickName=res.data.nickName
			     app.globalData.userName=res.data.userName
			     app.globalData.email=res.data.email
			     this.$noti.post(this.$params.noti_login_status)
			     // 返回上一页
			     uni.navigateBack() 
			    },()=>{})
			
			
			
			   },
			   //根据id获取相应输入框数据
			   inputGet(event) {
			    let id = event.currentTarget.id
			    //如果需要将字符串作为变量名，请使用模板字符串将该变量名作为插值，并在外层使用中括号
			    this[`${id}`] = event.detail.value
			    console.log(this.nick)
			    console.log(this.user)
			    console.log(this.email)
			    console.log(this.password)
			    
			   },


			inputGet(event) {

				let id = event.currentTarget.id //"nick"
				//如果字符串作为变量名称，那么引用该变量就要使用模板字符串，将该变量名字符串作为插值，并在外层使用中括号
				this[`${id}`] = event.detail.value
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
								pic = json.data
								this.userAvartar = this.$params.host + json.data
								this.signupAvartar = this.$params.host + json.data
								console.log(json.data);
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
