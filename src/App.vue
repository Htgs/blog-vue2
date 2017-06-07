<template>
	<div id="app">
		<el-row :gutter="20">
			<el-col :span="24">
				<cNav></cNav>
			</el-col>
		</el-row>
		<el-row class="mt-60">
			<router-view></router-view>
		</el-row>
	</div>
</template>

<script>
	import cNav from '@/components/layouts/nav'
	export default {
		name: 'app',
		components: {
			cNav
		}
	}
</script>

<style>
	#app {}
</style>
