<template>
	<el-form label-width="80px" class="register" :model="register" ref="register">
		<el-form-item 
			label="用户名" 
			prop="username" 
			class="w80 mlr-auto"
			:rules="[
				{ required: true, message: '请输入用户名', trigger: 'blur' },
				{ validator: usernameValidate, trigger: 'change blur', o: register }
			]">
			<el-input v-model="register.username" placeholder="请输入用户名"></el-input>
		</el-form-item>
		<el-form-item 
			label="密码" 
			prop="password" 
			class="w80 mlr-auto"
			:rules="[
				{ required: true, message: '请输入密码', trigger: 'blur' },
				{ validator: passwordValidate, trigger: 'change blur', o: register }
			]">
			<el-input type="password" v-model="register.password" placeholder="请输入密码"></el-input>
		</el-form-item>
		<el-form-item 
			label="确认密码" 
			prop="repassword" 
			class="w80 mlr-auto"
			:rules="[
				{ required: true, message: '请输入密码', trigger: 'blur' },
				{ validator: repasswordValidate, trigger: 'change blur', o: register }
			]">
			<el-input type="password" v-model="register.repassword" placeholder="请输入确认密码" @keyup.enter="submitForm('register')"></el-input>
		</el-form-item>
		<el-form-item class="w80 mlr-auto">
			<el-button type="primary" class="w100" @click="submitForm('register')">提交</el-button>
		</el-form-item>
		<el-form-item class="w80 mlr-auto">
			<el-button class="w100" @click="resetForm('register')">重置</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	import validate from '../../util/validate.js'
	export default {
		name: 'register',
		data () {
			return {
				register: {
					username: '',
					password: '',
					repassword: ''
				}
			}
		},
		methods: {
			submitForm (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						axios.post('/user/register', this.register)
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
			resetForm (formName) {
				this.$refs[formName].resetFields()
			},
			usernameValidate: validate.username,
			passwordValidate: validate.password,
			repasswordValidate: validate.repassword
		}
	}
</script>
<style scoped>
	.register {}
</style>
