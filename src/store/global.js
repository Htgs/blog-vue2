import global from './mutations_type.js'

const state = {
	global_user: null,
	global_message: {
		show: false,
		code: null,
		msg: null,
		class: null
	},
	global_activeNav: '/home'
}

const getters = {
	global_user: state => state.global_user,
	global_message: state => state.global_message,
	global_activeNav: state => state.global_activeNav
}

const actions = {
	toggleGlobalMessage ({ commit }, { delay, data, status, type }) {
		commit('GLOBAL_SHOW_MESSAGE', { msg: data.msg, code: status, class: type })
		setTimeout(() => {
			commit('GLOBAL_HIDE_MESSAGE')
		}, delay || 2000)
	}
}

const mutations = {
	[global.GLOBAL_SHOW_MESSAGE] (state, err) {
		state.global_message.show = true
		state.global_message.code = err.code
		state.global_message.msg = err.msg
		state.global_message.class = err.class
	},
	[global.GLOBAL_HIDE_MESSAGE] (state) {
		state.global_message.show = false
		state.global_message.code = null
		state.global_message.msg = null
		state.global_message.class = null
	},
	[global.GLOBAL_SET_USERINFO] (state, user) {
		state.global_user = user
	},
	[global.GLOBAL_UPDATE_USERINFO] (state, setting) {
		state.global_user.gender = setting.gender
		state.global_user.avatar = setting.avatar
		state.global_user.bio = setting.bio
	},
	[global.GLOBAL_RESET_USERINFO] (state) {
		state.global_user = null
	},
	[global.GLOBAL_ACTIVENAV] (state, path) {
		state.global_activeNav = path
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
