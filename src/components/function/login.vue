<template>
	<el-form label-width="80px" class="login">
		<el-form-item label="用户名" prop="name" class="w80 mlr-auto">
			<el-input></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password" class="w80 mlr-auto">
			<el-input></el-input>
		</el-form-item>
		<el-form-item label="记住账号" class="w80 mlr-auto">
			<el-checkbox></el-checkbox>
		</el-form-item>
		<el-form-item class="w80 mlr-auto">
			<el-button type="primary" class="w100">登录</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	export default {
		name: 'login',
		data () {
			return {
			}
		},
		methods: {
		}
	}
</script>
<style lang="less" scoped>
	.login {
	}
</style>
