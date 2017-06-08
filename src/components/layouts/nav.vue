<template>
	<div class="nav">
		<el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" :router="true" class="w80 mlr-auto">
			<el-menu-item index="/home">home</el-menu-item>
			<el-menu-item index="/articles">articles</el-menu-item>
			<el-submenu v-if="global_user" index="/" class="pull-right">
				<template slot="title">
					<div class="clearfix inline-block pull-left">
						<img :src="'\\static\\uploads\\' + global_user.avater" alt="" class="pull-left">
						<p class="pull-right ml-10">{{global_user.name}}</p>
					</div>
				</template>
				<el-menu-item index="/user/">个人主页</el-menu-item>
				<el-menu-item index="/setting">个人设置</el-menu-item>
				<el-menu-item index="/user/password">修改密码</el-menu-item>
				<el-menu-item index="" @click="logout">登出</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		data () {
			return {
				activeIndex: '/'
			}
		},
		computed: {
			...mapGetters([
				'global_user'
			])
		},
		methods: {
			handleSelect (key, keyPath) {
				console.log(key, keyPath)
			},
			logout () {
				axios.get('/logout')
					.then(res => {
						this.$store.dispatch('toggleGlobalMessage', res)
						this.$store.commit('GLOBAL_RESET_USERINFO')
					})
					.catch(err => {
						this.$store.dispatch('toggleGlobalMessage', err)
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
