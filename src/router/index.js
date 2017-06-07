import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Articles from '@/views/articles'
import Article from '@/views/article'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/articles',
			name: 'Articles',
			component: Articles
		},
		{
			path: '/articles/:aid',
			name: 'Article',
			component: Article
		}
	]
})
