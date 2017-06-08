<template>
	<div class="articles">
		<el-card class="box-card mt-10" v-for="(article, ky) in articles" :key="ky">
			<div slot="header">
				<h3>{{article.title}}</h3>
				<p>
					<span>{{article.author}}</span>
					<span>{{article.created_time}}</span>
				</p>
			</div>
			<router-link :to="'/articles/' + article.id">
				<pre>{{article.pre_p}}</pre>
				<span>{{article.pv}}</span>
				<span>{{article.comments}}</span>
			</router-link>
		</el-card>
	</div>
</template>
<script>
	export default {
		name: 'articles',
		data () {
			return {
				articles: [
					{
						id: 1,
						title: 'a',
						author: 'b',
						created_time: '22',
						comments: 5,
						pv: 10,
						pre_p: 'fefsfa'
					},
					{
						id: 2,
						title: 'a',
						author: 'b',
						created_time: '22',
						comments: 5,
						pv: 10,
						pre_p: 'fefsfa'
					}
				]
			}
		},
		methods: {
		}
	}
</script>
<style lang="less" scoped>
	.articles {
		.box-card {
			margin-left: auto;
			margin-right: auto;
			width: 480px;
		}
	}
</style>
