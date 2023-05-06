<template>
	<view class="">
		<view class="">
			<h2>基本饼图</h2>
			<view class="charts-box">
				<qiun-data-charts type="pie" :opts="opts" :chartData="pie" />
			</view>
		</view>

		<view class="">
			<h2>最新博客分析</h2>
			<view class="charts-box">
				<qiun-data-charts type="column"
					:opts=" { enableScroll: true, xAxis: {disableGrid: true, scrollShow: true,itemCount: 4 }}"
					:chartData="column" :ontouch="true" />
			</view>
		</view>
		<view class="">
			<h2>常用标签词云</h2>
			<view class="charts-box">
				<qiun-data-charts type="word" :opts="{ padding: undefined,enableScroll: false,}" :chartData="ciyun" />
			</view>
		</view>


	</view>
</template>
<style scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>
<script>
	export default {
		data() {
			return {
				pie: {},
				opts: {},
				column: {},
				ciyun: {},
				word: {
				            type: "normal",
				            autoColors: false
				          }
			}
		},
		onLoad() {
			this.getCategories()
			this.getTopBlogs()
			this.getciyun()
		},
		methods: {
			getciyun() {
				this.ciyun = {}
				let json = {
					"series": []
				}
				let ciyun = JSON.parse(JSON.stringify(json))
				let url = this.$params.host + this.$params.action_tags
				this.$request.get(url, res => {
					url = this.$params.host + this.$params.action_tag_count
					res.data.forEach(async (t) => {
						let r = await this.$request.requestAsync(url + t.id)
						if (r.data.success && r.data.data > 0) {
							let tag = {
								name: t.name,
								textSize: parseInt(r.data.data) * 10 > 25 ? 25 : parseInt(r.data
									.data) * 10
							}
							ciyun.series.push(tag)
						}
					})
					this.ciyun = ciyun
				}, () => {
					uni.stopPullDownRefresh()
				})
			},
			getTopBlogs() {
				this.column = {}
				let json = {
					"categories": [],
					"series": [{
						"name": "阅读量",
						"data": []
					}, {
						"name": "评论数",
						"data": []
					}]
				}
				this.column = JSON.parse(JSON.stringify(json))
				let url = this.$params.host + this.$params.action_hot
				this.$request.get(url, res => {
					res.data.forEach(blog => {
						this.column.categories.push(this.$util.ellipsis(blog.title, 10))
						this.column.series[0].data.push(blog.readCount)
						this.column.series[1].data.push(blog.comments.length)
					})
				}, () => {})
			},
			getCategories() {
				this.pie = {}
				let json = {
					"series": [{
						"data": []
					}]
				}
				this.pie = JSON.parse(JSON.stringify(json))
				let url = this.$params.host + this.$params.action_categories
				this.$request.get(url, res => {
					url = this.$params.host + this.$params.action_category_count
					res.data.forEach(async (c) => {
						let r = await this.$request.requestAsync(url + c.id)
						if (r.data.success && r.data.data > 0) {
							let category = {
								name: c.name,
								value: r.data.data
							}
							this.pie.series[0].data.push(category)
						}
					})
				}, () => {})
			}
		}
	}
</script>

<style>

</style>
