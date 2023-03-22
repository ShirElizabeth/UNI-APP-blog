/**
 * 一半的GET请求不带参数
 * @param {String} url url接口
 * @param {function} funSuccess 成功的回调 
 * @param {function} funFail 失败的回调
 */
function get(url,funSuccess,funFail){
	uni.showLoading({
		title:"加载中...",
		mask:false,
			})
	uni.request({
		url: url,
		method: 'GET',
		sslVerify:false,
		header:{
			"content-type":"application/json;charset=UTF-8"
		},
		success: res => {
			funSuccess(res.data)
		},
		fail: err => {
			funFail(err)
		},
		complete: () => {}
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

function getWithHeader(url,header,funSuccess,funFail){
	uni.showLoading({
		title:"加载中......",
		mask:false
	});
	uni.request({
		url,
		header,
		method: 'GET',
		sslVerify:false,
		success: res => {
			funSuccess(res.data)
		},
		fail: err => {
			console.log(err);
		},
		complete: () => {
			uni.hideLoading();
			// funComplete()   未定义 不注释报错
		}
	});
}
module.exports = { //开放导出
	get,
	getWithHeader
}