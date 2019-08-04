const db_message = require('../models/event')
const jwt = require("jsonwebtoken");

module.exports = (req,res)=>{
//authentication
	let token = req.headers.authorization.split(' ')[1]
	// console.log(token)
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (decoded) {
			//query to find only that users events
			db_message.find({guests: decoded._id}).sort('-date').populate({
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
