const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()
	return year + "-" + month + "-" + day + "-" + hour + ":" + minute + ":" + second
}

function remove(arr, index) { //删除数组自定义函数
	arr[index] = arr[arr.length - 1];
	arr.pop();
}

// function remove(arr, pos) { //删除数组自定义函数
// 	arr[pos] = arr[arr.length - 1]
// 	arr.pop()
// }


/**
 * @param {Object} field 要检查的字段变量
 * @param {Object} len  变量最小长度
 * @param {Object} name 该字段的中文名称
 */
//数据校验(数据，长度，名字)
function checkLength(field, len, name) {
	if (field.length >= len) {
		return true
	}
	let message = name + "不能少于" + len + "个字符串"
	if (field.length == 0) {
		message = name + "不能为空"
	}
	uni.showToast({
		title: message,
		icon: 'none'
	})
}

	
function ellipsis(str, len) {
	if (str && str.length > len) {
		return str.substr(0, len - 3) + "..."
	}
	return str
}
module.exports = {
	remove,
	checkLength,
	formatTime,
	ellipsis

}
