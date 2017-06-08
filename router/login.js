const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/user.js')
// const checkNotLogin = require('../middlewares/check.js').checkNotLogin

// router.get('/:name', function(req, res) {
// 	res.render('users', {
// 		name: req.params.name,
// 		port: 2222
// 	})
// })

// 提交登录信息
router.post('/', (req, res, next) => {
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
            // res.send(user)
            if (!user) {
                res.status(402).send({ msg: '用户不存在'})
            }
            if (sha1(password) !== user.password) {
                res.status(402).send({ msg: '用户密码不匹配'})
            }
            req.session.user = user
            res.send({ user: req.session.user, msg: '登录成功'})
        })
        .catch(next)
})
    
module.exports = router
