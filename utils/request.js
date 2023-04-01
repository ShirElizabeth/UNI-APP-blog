/**
 * 一半的GET请求不带参数
 * @param {String} url url接口
 * @param {function} funSuccess 成功的回调 
 * @param {function} funFail 失败的回调
 */
function get(url, funSuccess, funComplete) {
	uni.showLoading({
		title: "加载中...",
		mask: false,
	})
	uni.request({
		url: url,
		method: 'GET',
		sslVerify: false,
		header: {
			"content-type": "application/json;charset=UTF-8"
		},
		success: res => {
			funSuccess(res.data)
		},
		fail: err => {
	
		},
		complete: () => {
			uni.hideLoading();
			funComplete	();
		}
	});

}
/**
 * 
 * GET请求，需要用户传递Header
 * @param {String} url 要请求的接口地址
 * @param {JSON} header 请求头，包含参数，若无参数可以使用get方法
 * @param {function} funSuccess 成功的回调
 * @param {function} funComplete 请求结束的回调，如果无需处理则传递一个空方法即可
 */

function getWithHeader(url, header, funSuccess, funComplete) {
	uni.showLoading({
		title: "加载中......",
		mask: false
	});
	uni.request({
		url,
		header,
		method: 'GET',
		sslVerify: false,
		success: res => {
			funSuccess(res.data)
		},
		fail: err => {
			console.log(err);
		},
		complete: () => {
			uni.hideLoading();
			funComplete() //禁止反复加载
		}
	});
}
// 在request.js中添加相应的post方法，并完成post数据到点赞接口的代码
function postParam(url, data, funSuccess, funComplete) {
	uni.showLoading({
		title: "提交数据...",
		mask: false
	});
	uni.request({
		url: url,
		header: {
			"Accept": "application/json; q=0.9,*/*; q=0.1",
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
		},
		method: "POST",
		sslVerify: false,
		data: data,
		success: res => funSuccess(res.data),
		fail: err => {
			console.log(err);
		},
		complete: () => {
			uni.hideLoading()
			funComplete()

		}
	});
}
module.exports = { //开放导出
	get,
	getWithHeader,
	postParam
}
