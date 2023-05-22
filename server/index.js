const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


io.on("connection", (socket) => {
    console.log("a user connected");
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});