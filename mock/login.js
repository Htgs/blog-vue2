const Mock = require('mockjs')

const express = require('express')
const router = express.Router()

// const template = Mock.mock({
// 	'username': /[a-z][A-Z][0-9]/,
// 	'password|6-12': /[a-z][A-Z][0-9]/
// })

const template = Mock.mock({
	'username': 'admin',
	'password|6-12': 'adminn'
})

router.post('/', (req, res, next) => {
	let username = req.body.username
	let password = req.body.password
	let cache_username = req.body.cache_username

	if (cache_username) {
		res.cookie('username', username, { maxAge: 900000, httpOnly: true })
	}
	try {
		if (username == '') {
			throw new Error('账号不能为空')
		}
		if (password == '') {
			throw new Error('密码不能为空')
		}
	} catch (e) {
		res.status(402).send(e.message)
	}
	if (username == 'admin' && password == 'adminn') {
		res.send('登录成功')
	} else {
		res.status(402).send('账号密码不正确')
	}
})

module.exports = router
