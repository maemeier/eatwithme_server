const db_event = require('../models/event')

module.exports = (req,res)=>{
	console.log('req get an event',req);
  db_event.findById(req.params.id).populate({
    path: 'author',
    name: 'name title'
  }).then((event)=>{
    res.send(event)
  }).catch((err) => {
    res.send(err)
  })
}
