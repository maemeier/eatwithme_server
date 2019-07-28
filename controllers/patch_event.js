const db_message = require('../models/event')

module.exports = (req, res) => {
  // res.send('Hello Slack')

  db_message.findByIdAndUpdate(req.params.id, req.body).then((data)=>{
    // res.send(data)
    // console.log('data', data);
    db_message.findById(data._id).populate('author').then((found_message)=> {
      res.send(found_message)
    })
  }).catch((err) => {
    res.send(err)
  })

}
