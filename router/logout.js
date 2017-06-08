const express = require('express')
const router = express.Router()

// const checkLogin = require('../middlewares/check.js').checkLogin

// 登出
router.get('/', (req, res, next) => {
    req.session.user = null
    res.send({ msg: '登出成功' })
})

module.exports = router
