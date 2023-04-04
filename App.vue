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
		color: #8f8f94;
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
