<template>
	<transition name="message">
		<div :class="['message', global_message.class]" v-if="global_message.show">
			<span>{{global_message.code}}</span>
			<span>{{global_message.msg}}</span>
		</div>
	</transition>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'message',
		computed: {
			...mapGetters([
				'global_message'
			])
		}
	}
</script>
<style lang="less" scoped>
	.message {
		position: fixed;
		top: 10%;
		left: 50%;
		width: 240px;
		height: 40px;
		margin-left: -120px;
		border-radius: 3px;
		line-height: 40px;
		padding: 5px;
	}
	.success {
		background-color: #13CE66;
		color: #fff;
	}
	.warning {
		background-color: #F7BA2A;
		color: #fff;
	}
	.msg {
		background-color: #20A0FF;
		color: #fff;
	}
	.error {
		background-color: #FF4949;
		color: #fff;
	}
	.message-enter, .message-leave-to{
		top: 0;
	}
	.message-enter-to, .message-leave{
		top: 10%;
	}
	.message-enter-active, .message-leave-active {
		transition: all .5s;
	}
</style>
