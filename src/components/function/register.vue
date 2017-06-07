<template>
	<el-form label-width="80px" class="register">
		<el-form-item label="用户名" prop="name" class="w80 mlr-auto">
			<el-input></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password" class="w80 mlr-auto">
			<el-input></el-input>
		</el-form-item>
		<el-form-item label="确认密码" prop="type" class="w80 mlr-auto">
			<el-input></el-input>
		</el-form-item>
		<el-form-item class="w80 mlr-auto">
			<el-button type="primary" class="w100">提交</el-button>
		</el-form-item>
		<el-form-item class="w80 mlr-auto">
			<el-button class="w100">重置</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	export default {
		name: 'register',
		data () {
			return {
			}
		},
		methods: {
		}
	}
</script>
<style scoped>
	.register {}
</style>
