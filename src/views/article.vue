<template>
	<div class="article mlr-auto">
		<div class="article-header w100 mt-10">
			<h1>{{article.title}}</h1>
			<small class="mr-10">作者：{{article.title}}</small>
			<small class="mr-10">发表时间：{{article.title}}</small>
			<small>浏览数：{{article.pv}}</small>
		</div>
		<p class="mt-30 mb-30">{{article.pre_p}}</p>
		<Comment class="mt-10"></Comment>
		<div class="comments mt-10 clearfix" v-for="(comment, ky) in comments" :key="ky">
			<div class="info pull-left">
				<img :src="comment.author.avater" :alt="comment.author.name">
				<p>{{comment.author.name}}</p>
			</div>
			<div class="content pull-left">{{comment.comment}}</div>
		</div>
	</div>
</template>
<script>
	import Comment from '@/components/function/comment.vue'
	export default {
		name: 'article',
		components: {
			Comment
		},
		data () {
			return {
				article: {
					id: 1,
					title: 'a',
					author: 'b',
					created_time: '22',
					comments: 5,
					pv: 10,
					pre_p: 'fefsfafefsfaf fefsfafefsfaf fefsfafefsfaf fefsfafefsfaf fefsfafefsfaf fefsfafefsfaf fefsfafefsfaf fefsfafefsfaf fefsfafefsfaf fefsfafefsfaf'
				},
				comments: [{
					author: {
						avater: '/',
						name: 'test'
					},
					comment: 'blablabla blablabla blablabla'
				}, {
					author: {
						avater: '/',
						name: 'test'
					},
					comment: 'blablabla blablabla blablabla'
				}, {
					author: {
						avater: '/',
						name: 'test'
					},
					comment: 'blablabla blablabla blablabla'
				}]
			}
		},
		methods: {
		}
	}
</script>
<style lang="less" scoped>
	.article {
		width: 480px;
		.article-header {
			border-bottom: 1px solid #99A9BF;
		}
		.comments {
			width: 100%;
			border: 1px solid #d1dbe5;
			border-radius: 4px;
			background-color: #fff;
			overflow: hidden;
			box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
			padding: 20px;
			.info {
				width: 15%;
			}
			.content {
				width: 75%;
				padding: 10px;
				min-height: 60px;
				background-color: #D3DCE6;
				border-radius: 5px;
				border: 1px solid #EFF2F7;
			}
		}
	}
</style>
