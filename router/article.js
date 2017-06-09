const moment = require('moment')
const marked = require('marked')

const express = require('express')
const router = express.Router()

const ArticleModel = require('../models/article')
const CommentModel = require('../models/comment')
// const checkLogin = require('../middlewares/check.js').checkLogin

// 请求文章页
router.get('/', (req, res, next) => {
	let query = req.query.author
	ArticleModel.getArticles(query)
		.then(function (result) {
			let articles = result
			articles.forEach(function (item) {
				item.created_time = moment(item.created_at).format('YYYY-MM-DD HH:mm')
				item.contents = marked(item.content)
			})
			Promise.all(articles.map(function (article) {
				return Comment.getCommentsCountByArticleId(article._id)
					.then(function (commentsCount) {
						return commentsCount
					})
			}))
			.then(function (r) {
				res.render('articles', {
					articles: articles,
					commentsCounts: r
				})
			})
		})
		.catch(next)
})

// 提交请求发表文章
router.post('/add', (req, res, next) => {
	let author = req.session.user._id
	let title = req.fields.title
	let content = req.fields.content

	try {
		if (!title.length) {
			throw new Error('缺少标题')
		}
		if (!content) {
			throw new Error('缺少内容')
		}
	}
	catch (e) {
		req.flash('error', e.message)
		return res.redirect('back')
	}

	let article = {
		author: author,
		title: title,
		content: content,
	}

	ArticleModel.create(article)
		.then(function (result) {
			article = result
			req.flash('success', '发表成功')
			res.redirect(`/article/${article._id}`)
		})
		.catch(next)
})

// 看文章
router.get('/:articleId', (req, res, next) => {
	let articleId = req.params.articleId
	Promise.all([
		ArticleModel.getArticleById(articleId),
		CommentModel.getCommentsByArticleId(articleId),
		CommentModel.getCommentsCountByArticleId(articleId),
		ArticleModel.incPv(articleId)
	])
	.then(function (result) {
		let article = result[0]
		let comments = result[1]
		if (!article) {
			throw new Error('该文章不存在')
		}
		article['comment_num'] = result[2]
		article['contents'] = marked(article.content)
		comments.forEach(function (item) {
			item.created_time = moment(item.created_at).format('YYYY-MM-DD HH:mm')
		})
		res.render('article', {
			article: article,
			comments: comments
		})
	})
	.catch(next)
})

// 修改文章页
router.get('/:articleId/edit', (req, res, next) => {
	let articleId = req.params.articleId
	let author = req.session.user._id
	ArticleModel.getRawArticleById(articleId)
		.then(function (result) {
			let article = result
			if (!article) {
				throw new Error('该文章不存在')
			}
			if (author.toString() !== article.author._id.toString()) {
				throw new Error('权限不足')
			}
			article['url'] = `./edit`
			res.render('create', {
				article: article
			})
		})
		.catch(next)
})

// 修改文章
router.put('/:articleId/edit', (req, res, next) => {
	let articleId = req.params.articleId
	let author = req.session.user._id
	let title = req.fields.title
	let content = req.fields.content
	ArticleModel.updateArticleById(articleId, author, { title: title, content: content, changed_at: Date.now() })
		.then(function (result) {
			req.flash('success', '保存成功')
			res.redirect(`/article/${articleId}`)
		})
		.catch(next)
})

// 删除文章
router.delete('/:articleId', (req, res, next) => { 
	let articleId = req.params.articleId
	let author = req.session.user._id
	ArticleModel.deleteArticleById(articleId, author)
		.then(function (result) {
			req.flash('success', '删除成功')
			res.redirect(`/article`)
		})
		.catch(next)
})

// 发表留言
router.post('/:articleId/comment', (req, res, next) => {
	let author = req.session.user._id
	let articleId = req.params.articleId
	let content = req.fields.content
	let comment = {
		author: author,
		articleId: articleId,
		content: content
	}
	CommentModel.create(comment)
		.then(function (result) {
			comment = result
			req.flash('success', '评论成功')
			res.redirect('back')
		})
		.catch(next)
})

router.delete('/:articleId/comment/:commentId', (req, res, next) => {
	let commentId = req.params.commentId
	let author = req.session.user._id
	CommentModel.deleteCommentsById(commentId, author)
		.then(function (result){
			req.flash('success', '删除留言成功')
			res.redirect('back')
		})
		.catch(next)
})

module.exports = router
