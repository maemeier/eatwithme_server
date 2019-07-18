const mongoose = require('mongoose')
require('dotenv').config()
//connect to database

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}, (err)=>{
  if(err){
    console.log('Error', err);
  }else{
    console.log('Connected to Mongodb');
  }
})

module.exports = mongoose
