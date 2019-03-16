import {sequelize, updateSchedule} from './models/index'
import app from './app'
import IO from 'socket.io'
import {client} from './tweet'
require('dotenv').config({debug:process.env.DEBUG, path:'../.env'})

const server = require('http').Server(app)
const port = process.env.PORT ||5000;
let serveTweet = new IO()
serveTweet.on('connection', socket=>{
  socket.on('disconnection', reason=>{
    socket.disconnect(true)
  })
  socket.on('error', error=>{
    
  })
})



let updater
sequelize.sync({force:false}).then(function() {

  updater = updateSchedule() 
  serveTweet.attach(server)
  server.listen(port, () => console.log(`Listening on port ${port}`));
  // You can also get the stream in a callback if you prefer.
  client.stream('statuses/filter', {track:'ottawa'}, function(stream) {
    stream.on('data', function(event) {
      serveTweet.sockets.emit('tweet', event.user.name,event.id,event.text)
    })
  
    stream.on('error', function(error) {
      throw error;
    });
  });
});

