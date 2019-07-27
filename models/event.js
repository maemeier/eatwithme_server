const db = require('../db')
const mongoose = require('mongoose')

// schema
const db_event = db.model('event',{
  author:{
    type: String,
    ref: "user",

  },
  title:{
    type: String,
  },
  body:{
    type: String,
  },
  date:{
    type: Date,
    // default: Date.now()
  },
  time:{
    type: String,
    required:[true, 'Time is requried']
  },
  person:{
    type: Number,

  },
  image:{
    type: String,

  },
  city:{
    type: String,

  },
  likes: {
    type: Number,
    default: 0,
  }

})

module.exports = db_event
