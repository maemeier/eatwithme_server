const express = require('express')
const bodyParser = require('body-parser')
const cors = require ('cors')
require ('dotenv').config()

const app = express()
require('./db')
app.use(cors({credentials:true}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get('/api/messages', require('./controllers/get_messages'))
app.get('/api/user', require('./controllers/get_user'))


app.post('/api/login', require('./controllers/login'))
app.post('/api/signup', require('./controllers/signup'))

app.post('/api/event', require('./controllers/post_event'))
app.get('/api/getEvent', require('./controllers/get_event'))

app.post('/api/restaurant', require('./controllers/post_restaurant'))
app.get('/api/getRestaurant', require('./controllers/get_restaurant'))

app.get('/api/getanEvent/:id', require('./controllers/get_anEvent'))


app.listen(process.env.PORT,(err)=>{
    if(err){
      console.log('ERROR', err);
    }else{
      console.log(`Ready on port ${process.env.PORT}`)
    }
})
