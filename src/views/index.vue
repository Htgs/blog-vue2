<template>
	<div id="index">
		<el-row :gutter="20">
			<el-col :span="24">
				<cNav></cNav>
			</el-col>
		</el-row>
		<el-row class="mt-60">
			<router-view></router-view>
		</el-row>
		<Message></Message>
	</div>
</template>

<script>
	import cNav from '@/components/layouts/nav'
	import Message from '@/components/basic/message'
	export default {
		name: 'index',
		components: {
			cNav,
			Message
		}
	}
</script>

<style>
	.index {}
</style>
