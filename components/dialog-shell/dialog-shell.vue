<template>
	<view class="dialog-container"v-if="display">
		<view class="dialog-background" @click="clickToHide"></view>//遮罩
		
		<view class="dialog-main">
			
			<view class="dialog-title">{{title}}</view>
			
				<slot></slot>
				<text @click="clickConfirm" class="dialog-btn">{{confirmText}}</text>
			</view>//主窗体
		
	</view>
</template>

<script>
	export default {
		name:"dialog-shell",
		props:{
			title:{
				type:String,
				required:true,
				validator:(val) =>{
					return val.length >0
				}
			},
			confirmText:{
				type:String,
			  default:"确定",
				  required:false,
				  validator:(val) =>{
					  return val.length >0
				  }
			}
		},
		data() {
			return {
				display:false
			};
		},
		methods:{
			clickToHide(){
				this.display=false
			},
			show(){
				this.display=true	
			},
			clickConfirm(){
				this.$emit("confirm")
				this.display=false
			}
		}
	}
</script>

<style>
@import url("dialog-shell.css");
</style>