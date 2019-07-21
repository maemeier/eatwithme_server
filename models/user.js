const db = require('../db')
const mongoose = require('mongoose')

// schema
const db_user = db.model('user',{
    name:{
    type: String,
    require:[true, 'Username is required']
  },
    password:{
      type: String,
      require:[true, 'Password is required']
    },
    email: {
      type: String,
      require:[true, 'Email is required']
    }
    // admin
  })
module.exports = db_user
