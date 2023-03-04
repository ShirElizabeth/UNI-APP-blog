<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{blogs}}</text>
		</view> -->
		<view v-if="blogs.length == 0" class="none">
			<image class="logo" src="../../static/icons/nodata.png" mode=""></image>
			<text class="text-area">抱歉，找不到相关文章</text>
		</view>
		<view v-else class="item-container">
			
			.
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				blogs: []
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 150rpx;
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
</style>
