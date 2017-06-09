const fs = require('fs')
const path = require('path')
const User = require('./db/mongoose').User

module.exports = {
    create: function (user) {
        return User.create(user)
    },
    getUserByName: function (name) {
    	return User
            .update({ name: name }, { $set: { changed_at: Date.now() } })
            .findOne({ name: name })
    },
    passwordById: function (userId, password) {
    	return User
            .findOne({ _id: userId })
            .update({ _id: userId }, { password: password })
    },
    getSettingById: function (userId) {
        return User
            .findOne({_id: userId}, {gender: true, bio: true, avatar: true})
    },
    updateSettingById: function (userId, setting) {
    	return User
            .findOne({ _id: userId }, function (err, user) {
                if (err) return err
                if (user && user.avatar && setting.avatar) {
                    fs.unlink(path.join('static', 'uploads', user.avatar))
                }
            })
            .update({ _id: userId }, {$set: setting})
    }
}
