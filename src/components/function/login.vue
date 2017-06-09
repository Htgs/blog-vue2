<template>
	<el-form label-width="80px" class="login" :model="userInfo" ref="userInfo">
		<el-form-item 
			label="用户名" 
			prop="username" 
			class="w80 mlr-auto"
			:rules="[
				{ required: true, message: '请输入用户名', trigger: 'blur' },
				{ validator: usernameValidate, trigger: 'change blur', o: userInfo }
			]">
			<el-input v-model="userInfo.username" placeholder="请输入用户名"></el-input>
		</el-form-item>
		<el-form-item 
			label="密码" 
			prop="password" 
			class="w80 mlr-auto"
			:rules="[
				{ required: true, message: '请输入密码', trigger: 'blur' },
				{ validator: passwordValidate, trigger: 'change blur', o: userInfo }
			]">
			<el-input v-model="userInfo.password" type="password" placeholder="请输入密码" @keyup.enter="submitForm('userInfo')"></el-input>
		</el-form-item>
		<el-form-item label="记住账号" class="w80 mlr-auto">
			<el-checkbox v-model="userInfo.cache_username"></el-checkbox>
		</el-form-item>
		<el-form-item class="w80 mlr-auto">
			<el-button type="primary" class="w100" @click="submitForm('userInfo')">登录</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	import validate from '../../util/validate.js'
	export default {
		name: 'login',
		data () {
			return {
				userInfo: {
					username: '',
					password: '',
					cache_username: false
				}
			}
		},
		methods: {
			submitForm (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						axios.post('/user/login', this.userInfo)
							.then(res => {
								this.$store.dispatch('toggleGlobalMessage', res)
								this.$store.commit('GLOBAL_SET_USERINFO', res.data.user)
							})
							.catch(err => {
								this.$store.dispatch('toggleGlobalMessage', err)
							})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			usernameValidate: validate.username,
			passwordValidate: validate.password
		}
	}
</script>
<style lang="less" scoped>
	.login {
	}
</style>
