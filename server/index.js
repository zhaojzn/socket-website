const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);

const gambleHistory = [];

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {
    console.log('A user connected');
  
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
  
      // Emit the result back to the client
      socket.emit('gambleResult', result);
    });
  
    // Event listener for disconnecting
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
server.listen(3000, () => {
    console.log('listening on *:3000');
});