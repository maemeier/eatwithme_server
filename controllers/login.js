const db_user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
	console.log('i like dogs',req.body)
	// 1. Check if email exists in db
	db_user.findOne({email: req.body.email}).then((user) => {
		if (user) {
			// 2. If email found, match passwords
			bcrypt.compare(req.body.password, user.password, (err, match) => {
				if (match) {
					// 4. If passwords match, res OK
					
          let token = jwt.sign(user.toObject(), 'fyni')
					res.json({
          message:'You are logged in',
          token: token
          })
				} else {
					res.send('Sorry, invalid password')
				}
			})
		} else {
			res.send('Sorry, email not found')
		}
	}).catch((err) => {
		res.status(300).send(err)
	})

}
