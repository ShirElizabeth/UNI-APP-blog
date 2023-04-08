<template>
	<view>
		<view class="secret-info" v-if=" transfrom!= 'translateY(0)'">
			<text >lzzy.cxy制作</text>
			<image src="../../static/icons/加班.jpg" mode=""></image>
			
		</view>
		
		
		<view @touchcancel="touchStart" @touchmove="touchMove" @touchend="touchEnd" :style="bodyStyle" class="sign-up-header">
			<image class="sign-up-img" src="../../static/icons/icon.png" mode=""></image>
			<view class=""><text class="welcome">WELCOME!</text></view>
			<view class=""><text class="welcome2">欢迎加入CHAN</text></view>
		</view>
		<view class="user">
			<image class="user-img" src="../../static/icons/default_user.png" mode=""></image>
			<text class="user-img-SC">请点击选择图片上传</text>

		</view>

		<view class="sign-up-container">
			<input type="text" placeholder="请输入昵称">
		</view>
		<view class="sign-up-container">
			<input type="text" placeholder="请输入邮箱">
		</view>

		<view class="sign-up-container">
			<input type="text" placeholder="请输入用户名">
		</view>
		<view class="sign-up-container">
			<input type="text" placeholder="请输入密码">
		</view>

		<button class="sign-up">注册</button>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				transfrom: "translateY(0)",
				transition: ""
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
