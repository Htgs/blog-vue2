<template>
	<div class="user mlr-auto">
		<h3 class="txt-c mt-10 mb-10">个人主页</h3>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'user',
		data () {
			return {
			}
		},
		computed: {
			...mapGetters([
				'global_user'
			])
		},
		methods: {
		}
	}
</script>
<style lang="less" scoped>
	.user {
		width: 480px;
		h3 {
			position: relative;
			font: normal 18px/3 bold;
			border-radius: 3px;
		}
	}
</style>
