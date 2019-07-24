const db_message = require('../models/restaurant')
const jwt = require('jsonwebtoken')
const path = require('path')
// const cloudinary = require('cloudinary')
// const Datauri = require('datauri')


module.exports = (req, res) => {
	let token = req.headers.authorization.split(' ')[1]
	jwt.verify(token, 'fyni', (err, decoded) => {
		if (decoded) {
			console.log('decoded', decoded)
			req.body.author = decoded._id
			db_message.create(req.body).then((data) => {
				db_message.findById(data._id)
					.populate({
						path: 'author',
						select: 'name email'
					}).then((message) => {
						res.send(message)
					}).catch((err) => {
						res.send(err)
					})
			}).catch((err) => {
				res.send(err)
			})
		}
	})
}
