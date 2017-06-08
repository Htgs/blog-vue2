// const path = require('path')
// const fs = require('fs')

const multer  = require('multer')
const upload = multer({ dest: 'static/uploads/' })

module.exports = (app) => {
	// app.get('/', (req, res) => {
	// 	// fs.readFile(path.join(process.cwd(), '/views/index.html'), 'utf8', (err, data) => {
	// 	// 	if (err) throw err
	// 	// 	res.send(data)
	// 	// })
	// 	res.redirect('/articles')
	// })
	app.use('/register', require('./register'))
	app.use('/login', require('./login'))
	app.use('/logout', require('./logout'))
	// app.use('/user', require('./user'))
	// app.use('/article', require('./article'))

	// app.use('/adminuser', require('./adminuser'))

	app.use((req, res) => {
		if (!res.headersSent) {
			res.status(404).send('404')
		}
	})
}

