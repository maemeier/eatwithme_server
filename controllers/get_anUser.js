const db_user = require('../models/user')

module.exports = (req,res)=>{
  db_user.findById(req.params.id).populate({
    path: 'name',
    name: 'name email'
  }).then((event)=>{
    res.send(event)
  }).catch((err) => {
    res.send(err)
  })
}
