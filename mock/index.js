const login = require('./login')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

module.exports = (app) => {

	app.use('/login', login)
}
