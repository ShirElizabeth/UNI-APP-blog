//通知中心
//1.保存所有注册的通知(包含名称、要执行的代码、观察者)
let notices = []
//2.注册通知到通知中心
/**
 * 注册通知
 * @param {String} name 通知名称，不能冲突，建议写在全局文件中
 * @param {Function} selector 通知对应要执行的函数，发生相应事件即可执行
 * @param {Object} observer 观察者，一般就是page或component
 */
function add(name,selector,observer){
	let notice = {
		name: name,
		selector: selector,
		observer: observer
	}
	notices.push(notice)
}
//3.可以移除
/**
 * 移除通知，当观察者对象销毁时调用
 * @param {String} name 通知名称
 * @param {Object} observer 注册的观察者
 */
function remove(name,observer){
	for(let i = 0; i < notices.length; i++) {
		let noti = notices[i]
		if(noti.name == name && noti.observer == observer){
			notices.splice(i,1)
			return
		}
	}
}
//4.发送通知
/**
 * 被观察者observable/subject发送通知
 * @param {String} name 注册的通知名称
 * @param {Object} info 发送的参数
 */
function post(name,info){
	for(let i = 0; i < notices.length; i++) {
		let noti = notices[i]
		if(noti.name == name){
			noti.selector(info)
		}
	}
}

module.exports = {
	add,
	remove,
	post
}