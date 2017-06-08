const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/user.js')
// const checkNotLogin = require('../middlewares/check.js').checkNotLogin

// 提交注册信息
router.post('/', (req, res, next) => {
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
            // res.send(result)
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

module.exports = router
