const path = require('path');
const express = require('express');
const app = express();

// sattic files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
const server = app.listen(3000, function() {
  console.log('Server started on port 3333');
});

// websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
  
  // Receive message from client
  socket.on('chat:send', (data) => {

    // Send the message to all users
    io.sockets.emit('chat:return', data);
  });

  // Shows the notification that someone is typing a message
  socket.on('chat:typing', (data) => {
    socket.broadcast.emit('chat:typing', data); //broadcast sends to all user, except to user who sent the message
  });

});
