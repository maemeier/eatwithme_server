const db_user = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = (req,res)=>{
  let token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    console.log('decoded', decoded);
    db_user.findById(decoded._id).select({name:1, email:1}).then((user)=>{
      res.send(user)
    }).catch((err) => {
      res.send(err)
    })
  })

}
