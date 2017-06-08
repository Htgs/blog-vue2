import global from './mutations_type.js'

const state = {
	global_user: null,
	global_message: {
		show: false,
		code: null,
		msg: null,
		class: null
	}
}

const getters = {
	global_user: state => state.global_user,
	global_message: state => state.global_message
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
		console.log(user)
		state.global_user = user
	},
	[global.GLOBAL_RESET_USERINFO] (state) {
		state.global_user = null
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
