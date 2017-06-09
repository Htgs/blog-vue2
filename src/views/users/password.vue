<template>
	<div class="password mlr-auto">
		<h3 class="txt-c mt-10 mb-10">修改密码</h3>
		<el-form label-width="80px" :model="pd" ref="pd">
			<el-form-item 
				label="新密码" 
				prop="password"
				:rules="[
					{ validator: passwordValidate, trigger: 'blur' }
				]">
				<el-input type="password" v-model="pd.password" placeholder="请输入新密码"></el-input>
			</el-form-item>
			<el-form-item 
				label="确认新密码" 
				prop="repassword"
				:rules="[
					{ validator: repasswordValidate, trigger: 'change blur', o: pd }
				]">
				<el-input type="password" v-model="pd.repassword" placeholder="请输入确认新密码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" class="w100" @click="submitForm('pd')">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import validate from '../../util/validate.js'
	export default {
		name: 'password',
		data () {
			return {
				pd: {
					password: '',
					repassword: ''
				}
			}
		},
		computed: {
			...mapGetters([
				'global_user'
			])
		},
		methods: {
			passwordValidate: validate.password,
			repasswordValidate: validate.repassword,
			submitForm (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						axios.post('/user/' + this.global_user.name + '/password', this.pd)
							.then(res => {
								this.$store.dispatch('toggleGlobalMessage', res)
								this.$router.push('/home')
								this.$store.commit('GLOBAL_ACTIVENAV', '/home')
							})
							.catch(err => {
								this.$store.dispatch('toggleGlobalMessage', err)
							})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.password {
		width: 480px;
		h3 {
			position: relative;
			font: normal 18px/3 bold;
			border-radius: 3px;
		}
	}
</style>
