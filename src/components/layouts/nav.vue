<template>
	<div class="nav">
		<el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" :router="true" class="w80 mlr-auto">
			<el-menu-item index="/">home</el-menu-item>
			<el-menu-item index="/articles">articles</el-menu-item>
			<el-submenu index="/user" class="pull-right">
				<template slot="title">
					<div class="clearfix inline-block pull-left">
						<img src="d" alt="" class="pull-left">
						<p class="pull-right ml-10">xxx</p>
					</div>
				</template>
				<el-menu-item index="/user/">个人主页</el-menu-item>
				<el-menu-item index="/user/set">个人设置</el-menu-item>
				<el-menu-item index="/user/password">修改密码</el-menu-item>
				<el-menu-item index="" @click="loginout">登出</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				activeIndex: '/'
			}
		},
		methods: {
			handleSelect (key, keyPath) {
				console.log(key, keyPath)
			},
			loginout () {
				console.log('loginout')
				let ps = new Promise((resolve, reject) => {
					axios.get('/loginout')
						.then(res => {
							resolve(res)
						})
						.catch(err => {
							reject(err)
						})
				})
				ps.then(resolve => {
					console.log(resolve)
					this.$router.push('/')
				}, reject => {
					console.log(reject)
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.nav {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		height: 60px;
		width: 100%;
		background-color: #eef1f6;
	}
</style>
