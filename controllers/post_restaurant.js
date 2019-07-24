const db_message = require('../models/restaurant')
const jwt = require('jsonwebtoken')
const path = require('path')
const cloudinary = require('cloudinary')
const Datauri = require('datauri')

const data_uri = new Datauri()

const create_uri = (image) => {
	return data_uri.format(path.extname(image.originalname).toString(), image.buffer)
}

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
})

// upload

const upload_file = (image) => {
	return new Promise(function(resolve, reject) {
		let uri = create_uri(image).content
		cloudinary.uploader.upload(uri).then((saved) => {
			console.log('saved', saved)
			resolve(saved)
		}).catch((err) => {
			console.log('err', err)
			reject(err)
		})
	})
}

const create_message = (body) => {
	return new Promise(function(resolve, reject) {
		db_message.create(body).then((data) => {
			db_message.findById(data._id)
				.populate({
					path: 'author',
					select: 'name email'
				}).then((message) => {
					resolve(message)
				}).catch((err) => {
					reject(err)
				})
		}).catch((err) => {
			reject(err)
		})
	})
}

module.exports = (req, res) => {
	// token
	let token = req.headers.authorization.split(' ')[1]
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (decoded) {
			req.body.author = decoded._id
			// file
			if (req.file && req.file != null) {
				upload_file(req.file).then((file) => {
					req.body.file = file.url
					// message with file
					create_message(req.body).then((message) => {
						res.send(message)
					}).catch((err) => {
						res.send(err)
					})
				}).catch((err) => {
					res.send(err)
				})
			} else {
				// message no file
				delete req.body.file
				console.log('req.body', req.body)
				create_message(req.body).then((message) => {
					res.send(message)
				}).catch((err) => {
					res.send(err)
				})
			}
		}
	})
}

//
// module.exports = (req, res) => {
// 	let token = req.headers.authorization.split(' ')[1]
// 	jwt.verify(token, 'fyni', (err, decoded) => {
// 		if (decoded) {
// 			console.log('decoded', decoded)
// 			req.body.author = decoded._id
// 			db_message.create(req.body).then((data) => {
// 				db_message.findById(data._id)
// 					.populate({
// 						path: 'author',
// 						select: 'name email'
// 					}).then((message) => {
// 						res.send(message)
// 					}).catch((err) => {
// 						res.send(err)
// 					})
// 			}).catch((err) => {
// 				res.send(err)
// 			})
// 		}
// 	})
// }
