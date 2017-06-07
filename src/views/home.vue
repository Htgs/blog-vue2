<template>
	<div class="home">
		<el-row class="mt-30">
			<el-col :span="10" :offset="1">
				<div>blog</div>
			</el-col>
			<el-col :span="6" :offset="4" class="form">
				<h3 class="txt-c">
					用户登录
					<a href="javascript:;" @click="changed">没有账号</a>
				</h3>
				<component
					:is="currentView"
					class="mt-10">
				</component>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import Login from '@/components/function/login'
	import Register from '@/components/function/register'
	export default {
		data () {
			return {
				currentView: 'Login'
			}
		},
		components: {
			Login,
			Register
		},
		methods: {
			changed () {
				this.currentView = this.currentView === 'Login' ? 'Register' : 'Login'
			}
		}
	}
</script>
<style lang="less" scoped>
	.home {
		.info {
			background-color: #D3DCE6;
		}
		.form {
			border: 1px solid #99A9BF;
			h3 {
				position: relative;
				font: normal 18px/3 bold;
				background-color: #C0CCDA;
				border-radius: 3px;
				a {
					position: absolute;
					right: 10px;
					top: 50%;
					margin-top: -9px;
					font-size: 12px;
					line-height: 18px;
					color: #475669;
				}
			}
		}
	}
</style>
