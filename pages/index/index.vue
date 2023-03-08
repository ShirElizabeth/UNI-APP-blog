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
		<view v-else class="item-container" v-for="(item,index) in blogs" :key="item.id">
			<text class="item-title">{{item.title}}</text>
			<rich-text :nodes="item.description" class="item-desc"></rich-text>
			<image :src="item.picture" mode="widthFix" class="img itme-pic"></image>
			<view class="">
				 <text class="item-tag" v-for="(tag,idx) in item.tags" :key="idx">{{tag}}</text>
			</view>
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
			// 快捷键ureq
         uni.request({
         	url: 'https://1.12.223.54/api/v1/blogs/',
         	method: 'GET',
			sslVerify:false,
         	data: {},
         	success: res => {
				this.blogs= res.data.data,
				res.data.data.forEach(blog => {
					if(!blog.picture.startsWith('http')){
						blog.picture = 'https://1.12.223.54/' + blog.picture
					}
					
				})
				console.log(this.blogs)
				
				},
			
         	fail: () => {},
         	complete: () => {}
         });
		},
		methods: {

		}
	}
</script>

<style>
	.item-container{
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
		width: 96%;
		height: 2%;
		margin-top: 10rpx ;
		margin-bottom: 20rpx;
		display: flex;
		border-radius: 40rpx;
		flex-direction: column;
		background-color: white,
		
	}
	.item-title{
		font-size:25rpx ;
		font-weight: bold;
		padding-top: 10rpx;
		padding-bottom: 5rpx;
		border-bottom: darkgray 3px solid;
		white-space: nowrap;
		text-overflow:ellipsis;
	    overflow: hidden;
		margin-left: 70rpx;
		margin-right: 30rpx;
				
	}
	.item-desc{
		font-size: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		
	}
		
	.item-pic{
		display: block;
		margin: auto;
		width: 96%;
		border-radius: 8rpx;
	}
	.item-tag{
		font-size: 12px;
		color: #55aa00;
		border:  2px solid;
		border-radius: 20px;
		float: left;
		padding: 2px;
		margin-top: 5px;
		margin-bottom: 5px;
		margin-left: 5px;
	}
</style>
