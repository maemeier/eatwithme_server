const db_message = require('../models/event')

module.exports = (req,res)=>{
  // res.send('Hello Slack')

  let q = {}
  if (req.query && req.query.channel){
      q.channel = req.query.channel
  }
  db_message.find({}).sort('-_id').populate({
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
