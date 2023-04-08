const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()
	return year + "-" + month + "-" + day + "-" + hour + ":" + minute + ":" + second
}

function remove(arr,index){//删除数组自定义函数
	arr[index] = arr[arr.length - 1];	
	arr.pop();
}

// function remove(arr, pos) { //删除数组自定义函数
// 	arr[pos] = arr[arr.length - 1]
// 	arr.pop()
// }
module.exports ={
	remove,
	formatTime
}