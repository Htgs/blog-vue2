const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()


const UserModel = require('../models/user.js')
const encryption = require('../middlewares/encryption.js')
// const checkLogin = require('../middlewares/check.js').checkLogin

// /user/register
// /user/login
// /user/logout
// /user/:useid/setting
// /user/:useid/password

router.post('/register', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    let repassword = req.body.repassword
    try {
        if (!(username.length >= 1 && username.length <= 10)) {
            throw new Error('名字请限制在 1-10 个字符');
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
    } catch (e) {
        return res.status(402).send({ msg: e.message })
    }
    password = sha1(password)
    let user = {
        name: username,
        password: password,
        gender: 0
    }
    UserModel.create(user)
        .then(function (result) {
            user = result
            req.session.user = user
            res.send({ user: req.session.user, msg: '注册成功'})
        })
        .catch(function (e) {
            if (e.message.match('E11000 duplicate key')) {
                return res.status(402).send({ msg: '用户名已被占用'})
            }
            next(e)
        })
})

router.post('/login', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    let cache_username = req.body.cache_username
    if (cache_username) {
        res.cookie('username', username, { maxAge: 900000, httpOnly: true })
    }
    try {
        if (username === '') {
            throw new Error('账号不能为空')
        }
        if (password === '') {
            throw new Error('密码不能为空')
        }
    } catch (e) {
        return res.status(402).send({ msg: e.message})
    }
    UserModel.getUserByName(username)
        .then(function (user) {
            if (!user) {
                return res.status(402).send({ msg: '用户不存在'})
            }
            if (sha1(password) !== user.password) {
                return res.status(402).send({ msg: '用户密码不匹配'})
            }
            req.session.user = user
            res.send({ user: req.session.user, msg: '登录成功'})
        })
        .catch(function (e) {
        	res.send(e)
            next(e)
        })
})

router.get('/logout', (req, res, next) => {
    req.session.user = null
    res.send({ msg: '登出成功' })
})

router.get('/:username/setting', (req, res, next) => {
	let userid = req.session.user._id
	UserModel.getSettingById(userid)
		.then(function (result) {
			res.send(result)
		})
		.catch(next)
})

const multer  = require('multer')
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join('static', 'uploads'))
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.fieldname + '.' + file.mimetype.split('/')[1])
	}
})
const upload = multer({storage: storage})

	// {
	// 	fieldname: 'avatar',
	// 	originalname: '资源 1.png',
	// 	encoding: '7bit',
	// 	mimetype: 'image/png',
	// 	destination: 'static/uploads/',
	// 	filename: '1496974865465-avatar.png',
	// 	path: 'static\\uploads\\1496974865465-avatar.png',
	// 	size: 2846 
	// }
router.post('/:username/setting', upload.single('avatar'), (req, res, next) => {
	let userid = req.session.user._id
	let gender = req.body.gender
	let bio = req.body.bio
	let setting = {
		gender: gender,
		bio: bio,
		changed_at: Date.now()
	}
	if (req.file) {
		let avatar = req.file
		try {
			if (avatar.mimetype.indexOf('png') < 0 && avatar.mimetype.indexOf('jpeg') < 0) {
				throw new Error('文件类型不正确')
			}
			if (avatar.size / 1024 > 200) {
				throw new Error('图片不能超过200kb')
			}
		} catch (e) {
			fs.unlink(avatar.path)
			return res.status(402).send({msg: e.message})
		}
		setting['avatar'] = avatar.filename
	}
	UserModel.updateSettingById(userid, setting)
		.then(function (result) {
            if (result.n > 0 && result.ok > 0) {
                UserModel.getSettingById(userid)
                    .then(function (result) {
                        res.send({ res: result, msg: '修改成功'})
                    })
                    .catch(next)
            }
		})
		.catch(next)
})

router.post('/:username/password', (req, res, next) => {
	let userid = req.session.user._id
	let password = req.body.password
	let repassword = req.body.repassword

	try {
		if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
	}
	catch (e) {
		return res.status(402).send({msg: e.message})
	}

	password = sha1(password)

	UserModel.passwordById(userid, password)
		.then(function (result) {
			if (result.n > 0 && result.ok > 0) {
				res.send({ res: result, msg: '密码修改成功'})
			}
		})
		.catch(next)
})


module.exports = router
