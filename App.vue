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
</style>
