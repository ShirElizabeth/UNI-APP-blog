function remove(arr,index){//删除数组自定义函数
	arr[index] = arr[arr.length - 1];
	arr.pop();
}


module.exports ={
	remove
}