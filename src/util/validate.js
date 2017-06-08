exports.username = (rule, value, callback) => {
	if (String.trim(value).length > 10 || String.trim(value).length < 4) {
		callback(new Error('用户名长度为4~10'))
	} else {
		callback()
	}
}
exports.password = (rule, value, callback) => {
	if (String.trim(value).length > 20 || String.trim(value).length < 6) {
		callback(new Error('密码长度为6~20'))
	} else {
		callback()
	}
}
exports.repassword = (rule, value, callback) => {
	if (String.trim(value).length > 20 || String.trim(value).length < 6) {
		callback(new Error('密码长度为6~20'))
	}
	if (String.trim(value) === String.trim(rule['o']['password'])) {
		callback()
	} else {
		callback(new Error('两次密码不匹配'))
	}
}
exports.bio = (rule, value, callback) => {
	if (String.trim(value).length > 50) {
		callback(new Error('介绍不能超过50字'))
	} else {
		callback()
	}
}
