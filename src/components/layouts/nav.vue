<template>
	<div class="nav">
		<el-menu :default-active="global_activeNav" mode="horizontal" @select="handleSelect" :router="true" class="w80 mlr-auto">
			<el-menu-item index="/home">home</el-menu-item>
			<el-menu-item index="/articles">articles</el-menu-item>
			<el-submenu v-if="global_user" index="/" class="pull-right">
				<template slot="title">
					<div class="clearfix inline-block pull-left">
						<img :src="imgUrl" alt="" class="pull-left avatar">
						<p class="pull-right ml-10">{{global_user.name}}</p>
					</div>
				</template>
				<el-menu-item :index="'/user/' + global_user.name">个人主页</el-menu-item>
				<el-menu-item :index="'/user/' + global_user.name + '/setting'">个人设置</el-menu-item>
				<el-menu-item :index="'/user/' + global_user.name + '/password'">修改密码</el-menu-item>
				<el-menu-item index="" @click="logout">登出</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import util from '../../util/util.js'
	export default {
		data () {
			return {
				imgUrl: null
			}
		},
		computed: {
			...mapGetters([
				'global_user',
				'global_activeNav'
			])
		},
		methods: {
			handleSelect (key, keyPath) {
				// console.log(key, keyPath)
			},
			logout () {
				axios.get('/user/logout')
					.then(res => {
						this.$store.dispatch('toggleGlobalMessage', res)
						this.$store.commit('GLOBAL_RESET_USERINFO')
						this.$router.push('/home')
						this.$store.commit('GLOBAL_ACTIVENAV', '/home')
					})
					.catch(err => {
						this.$store.dispatch('toggleGlobalMessage', err)
					})
			}
		},
		watch: {
			'global_user.avatar': function (val) {
				this.imgUrl = util.$img(val)
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
		.avatar {
			width: 36px;
			height: 36px;
			margin-top: 12px;
		}
	}
</style>
