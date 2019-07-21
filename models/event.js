const db = require('../db')
const mongoose = require('mongoose')

// schema
const db_event = db.model('event',{
  author:{
    type: String,
    ref: "user",
    required:[true, 'Author is required']
  },
  title:{
    type: String,
  },
  body:{
    type: String,
  },
  date:{
    type: Date,
    default: Date.now()
  },
  time:{
    type: String,
    required:[true, 'Time is requried']
  },
  person:{
    type: Number,
    required:[true, 'Number of person is requried']
  },
  image:{
    type: String,
    required:[true, 'Number of person is requried']
  },
  city:{
    type: String,
    required:[true, 'Number of person is requried']
  }

})

module.exports = db_event
