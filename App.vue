<script>
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		// 4.4
		globalData:{
			uid:"",
			token:"",
			avatar:"/static/icons/default_user.png",
			type:-1,
			// type:-1 类似这种数据是1或者2的时候,设置一个为负数的初始值
			nickName:"",
			userName:"",
			email:""
		}
		
	}
</script>

<style>
	 @import url("/iconfont/iconfont.css");
	

	/*每个页面公共css */
	/* @import url("/common/iconfont.css"); */
	.none{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 20%;
		}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		
	}
	
	.logo {
		height: 100rpx;
		width: 300rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	
	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.title {
		font-size: 36rpx;
		color:  #a8d8b9;
	}
	.img{
		display: block;
		margin: auto;
		width: 96%;
		border-radius: 8rpx;
	}
	.icon-container {
			display: flex;
			flex-direction: row;
			border-top: darkgray 1px solid;
			padding: 5rpx;
			padding-left: 15rpx;
		}
		.icon {
				width: 50rpx;
				height: 50rpx;
				font-size: 50rpx;
				margin-top: 10rpx;
				margin-right: 5rpx;
			}
</style>
