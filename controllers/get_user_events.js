const db_message = require('../models/event')
const jwt = require("jsonwebtoken");

module.exports = (req,res)=>{
//authentication
	let token = req.headers.authorization.split(' ')[1]
	// console.log(token)
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (decoded) {
			//query to find only that users events
			db_message.find({author: decoded._id}).sort('-date').populate({
				path: 'channel',
				select: 'author'
			}).populate({
				path: 'author',
				select: 'name email'
			}).then((data)=>{
				//to populate guests names, do another find for users with the ids of the guests in a map to get the names and then send the names with the data.
				//for each loop of events to find where author === decoded id then push to an array
				//for each loop of events where guest === decoded id then push to the same array
				res.send(data)
			}).catch((err) => {
				res.send(err)
			})
		}
	})

}
