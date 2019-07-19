const db_message = require('../models/event')

module.exports = (req, res) => {
			db_message.create(req.body).then((data) => {
				db_message.findById(data._id)
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
