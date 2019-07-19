const db = require('../db')
const mongoose = require('mongoose')

// schema
const db_restaurant = db.model('restaurant',{
  author:{
    type: String,
  },
  title:{
    type: String,
  },
  body:{
    type: String,
  },
  address:{
    type: String,
  },
  price:{
    type: Number,
  }

})

module.exports = db_restaurant
