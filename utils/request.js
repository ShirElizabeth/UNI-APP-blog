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
			funComplete();
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
			"Accept": "application/json;q=0.9,*/*;q=0.1",
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
		},
		method: 'POST',
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
/**
 * 
 * POST请求
 * @param {String} url 要请求的接口地址
 * @param {JSON} data要提交的数据
 * @param {function} funSuccess 成功的回调
 * @param {function} funComplete 请求结束的回调，如果无需处理则传递一个空方法即可
 */
function post(url, data, funSuccess, funComplete) {
	uni.showLoading({
		title: "提交数据...",
		mask: false
	});
	uni.request({
		url: url,
		method: 'POST',
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


function deleteParams(url, data, funSuccess, funComplete) {
	uni.request({
		url: url,
		header: {
			"Accept": "application/json;q=0.9,*/*;q=0.1",
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
		},
		method: 'DELETE',
		sslVerify: false,
		data: data,
		success: res => funSuccess(res.data),
		fail: err => {},
		complete: () => {
			funComplete()
		}
	});
}



/**
 * @param {String} url 要请求的接口地址
 * @param {String} name 文件上传接口参数名，一般为file
 * @param {String} filepath 本地文件
 * @param {JSON} data 其他表单参加入user、password等
 * @param {function} funSuccess 成功的回调
 */
function postFile(url, name, filePath, data, funSuccess) {
	uni.uploadFile({
		url,
		name,
		filePath,
		formData: data,
		success: res => funSuccess(res)
	});
}

/**
 * 异步请求函数，使用 Promise 封装 uni.request 方法
 * @param {string} url - 请求的地址
 * @param {Object} data - 请求的数据，默认为空对象
 * @param {string} method - 请求方法，默认为 GET
 * @returns {Promise} 返回一个 Promise 实例，该实例在异步操作成功时调用 resolve()，在失败时调用 reject()
 */
function requestAsync(url, data = {}, method = 'GET') {
	// 返回一个 Promise 实例，该实例在异步操作成功时调用 resolve()，在失败时调用 reject()
	return new Promise((resolve, reject) => {
		// 调用 uni.request() 方法发起网络请求
		uni.request({
			url, // 请求的地址
			method, // 请求方法，默认为 GET
			data, // 请求数据，默认为空对象
			sslVerify: false,
			success: res => {
				// 请求成功时的回调函数，调用 resolve() 并将返回值传递给 then() 方法的回调函数
				resolve(res)
			},
			fail: err => {
				// 请求失败时的回调函数，调用 reject() 并将错误信息传递给 catch() 方法的回调函数
				reject(err)
			},
			complete: () => {
				// 请求完成时的回调函数，不管请求成功或失败都会执行
				// 此处不需要进行任何处理，可以省略
			}
		})
	})
}

module.exports = { //开放导出
	get,
	getWithHeader,
	postParam,
	post,
	deleteParams,
	postFile,
	requestAsync
}
