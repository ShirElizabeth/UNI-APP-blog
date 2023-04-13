<template>
	<view >
		
		<view v-if="authorized" class="">
		<view class="head-container">
			<image src="../../static/icons/加班.jpg" mode=""></image>		
			<view class="user-info-container">
		<view class="nick-type-container">
			<text class="nick-badge">昵称-[管理员]</text>
			<image class="img-badge" src="../../static/icons/badge0.png" mode=""></image>
			<image src="../../static/icons/ic_publish.png" mode=""></image>
			
				</view>
				<text class="user-email">2424284314@qq.com</text>
			</view>
				
		</view>
		<view class="data-container">
					<view class="data-title-container">
						<text class="title-name"></text>
						<text class="iconfont icon-icon-test ic-arrow"></text>
					</view>
					<view class="category-container">
		
					</view>
					<view class="data-container">
		
					</view>
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
				authorized:app.globalData.token.length>0,
				avatar:this.$params.host + app.globalData.avatar
			}
		},
		mounted(){
			this.authorized = app.globalData.token.length>0
			if(!this.authorized){
				this.$refs.login.show()
			}
		},
		methods: {
		afterLogin(){
			 this.authorized = app.globalData.token.length>0
			 
		 }
		}
	}
</script>

<style>

</style>
