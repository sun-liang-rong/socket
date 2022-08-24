const express = require('express')
const socket = require('socket.io');
var cors = require('cors')
const app = express()
// const http = require('http').Server(app)
app.use(cors())
const port = 3000
// var server = app.listen(8088)
// var io = require('socket.io').listen(server)
const io = socket(8088, { 
  cors :  { 
    methods :  [ "GET" ,  "POST" ] 
  } 
} )
require('./model/socket')(io)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})