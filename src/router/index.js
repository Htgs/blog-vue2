import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import notFound from '@/views/404'
import Home from '@/views/users/home'
import User from '@/views/users/user'
import Setting from '@/views/users/setting'
import Password from '@/views/users/password'
import Articles from '@/views/articles/articles'
import Article from '@/views/articles/article'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Index',
			redirect: '/home',
			component: Index,
			children: [
				{
					path: '/home',
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
				},
				{
					path: '/user/:username',
					name: 'User',
					component: User
				},
				{
					path: '/user/:username/setting',
					name: 'Setting',
					component: Setting
				},
				{
					path: '/user/:username/password',
					name: 'Password',
					component: Password
				}
			]
		},
		{
			path: '/404',
			name: '404',
			component: notFound
		}
	]
})
