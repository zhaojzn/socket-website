const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);

const gambleHistory = [];
const users = [];
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {
    console.log('A user connected');
    //add socket id to users
    users.push(socket.id);

    // Event listener for placing a bet
    socket.on('placeBet', (betAmount) => {
      // Generate a random outcome (example logic)
      const outcome = Math.random() < 0.5 ? 'win' : 'lose';
      const result = {
        betAmount,
        outcome,
      };
      // Add the result to gamble history
      gambleHistory.push(result);
      console.log("gambleHistory", gambleHistory)
      // Emit the result back to the client
      socket.emit('gambleResult', result);
    });
  
    socket.on('getUsers', () => {
        socket.emit('users', users);
    });


    // Event listener for disconnecting
    socket.on('disconnect', () => {
      console.log('A user disconnected');
        // Remove the socket id from users
        users.splice(users.indexOf(socket.id), 1);
        
    });
  });
server.listen(3000, () => {
    console.log('listening on *:3000');
});