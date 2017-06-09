/**
* 把对象变成url参数
* @param object
* @returns {string}
*/
exports.$objectToParam = (object) => {
	let params = ''
	Object.keys(object).forEach(k => { params += k + '=' + object[k] + '&' })
	return params
}

/**
*
* 组合图片路径
*
* @param url
* @returns {*}
*/
exports.$img = (url, flag = true) => {
	if (url === undefined || url === null) {
		return
	}
	if (url.indexOf('base64') > 0) {
		return url
	}
	return 'http://localhost:8080' + '/static/uploads/' + url
	// if(flag) {
	//     return (env.is_server?env.app_ano_url:'') + '/public/' + url;
	// }else {
	//     return (env.is_server?env.app_ano_url:'') + '/' + url;
	// }
}
