const db_message = require('../models/event')
const jwt = require("jsonwebtoken");

module.exports = (req,res)=>{

	let token = req.headers.authorization.split(' ')[1]
	console.log(token)
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (decoded) {
			db_message.find({author: decoded._id}).sort('-date').populate({
				path: 'channel',
				select: 'author'
			}).populate({
				path: 'author',
				select: 'name email'
			}).then((data)=>{
				res.send(data)
			}).catch((err) => {
				res.send(err)
			})
		}
	})

}
