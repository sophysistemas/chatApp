const socket = io();

// DOM elements
const message = document.getElementById('message');
const username = document.getElementById('username');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', function() {

  // Send data to server
  socket.emit('chat:send', {
    username: username.value,
    message: message.value
  })
});

// Notifies that the user is writing a message
message.addEventListener('keypress', function() {
  socket.emit('chat:typing', username.value);
});


// Receive the messages and print on view
socket.on('chat:return', function(data) {
  actions.innerHTML = '';
  output.innerHTML += `<p>
  <strong>${data.username}</strong>: ${data.message}
  </p>`
});

socket.on('chat:typing', function(data) {
  actions.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});

