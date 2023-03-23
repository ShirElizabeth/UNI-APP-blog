<template>
	<view>
		<text>这是详情页   id为{{id}}</text>
	</view>
	<!-- <view class="blog-container" >
		<text class="blog-title">{{blog.title}}</text>
		<rich-text :nodes="blog." class="blog-desc"></rich-text>
		<image :src="blog.picture" mode="widthFix" class="img blog-pic"></image>
		</view> -->
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				blog:{}
			}
		},
		onLoad(options) {//获取id
			this.id = options.id		
		},
		methods:{
			
		}
	}
</script>

<style>

</style>
