const db_event = require('../models/restaurant')

module.exports = (req,res)=>{
  db_event.findById(req.params.id).populate({
    path: 'author',
    name: 'name title'
  }).then((event)=>{
    res.send(event)
  }).catch((err) => {
    res.send(err)
  })
}
