const db_user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  console.log('i like cats',req.body);
  // create signup
  bcrypt.hash(req.body.password, 10, (err, encrypted) => {
    if (err) {
      res.status(300).send('Error', err)
    } else {
      req.body.password = encrypted
      db_user.create(req.body).then((user) => {
        let token = jwt.sign(user.toObject(), process.env.SECERT)
    		res.status(200).json({
          message: "you are sign up",
          token: token
        })
    	}).catch((err) => {
    		res.send(err)
    	})
    }
  })
}
