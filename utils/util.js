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


/**
 * @param {Object} field 要检查的字段变量
 * @param {Object} len  变量最小长度
 * @param {Object} name 该字段的中文名称
 */
function checkLength(field, minLen, maxLen, name){
  if(field.length >= minLen && field.length <= maxLen){
    return true;
  }
  let message;
  if(field.length < minLen){
    message = name + "不能少于" + minLen + "个字符";
  } else if(field.length > maxLen){
    message = name + "不能超过" + maxLen + "个字符";
  } else {
    message = name + "不能为空";
  }
  uni.showToast({
    title:message,
    icon:"none"
  });
  return false;
}

module.exports ={
	remove,
	formatTime,
	checkLength
}