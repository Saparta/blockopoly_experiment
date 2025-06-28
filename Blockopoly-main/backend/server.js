const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());

const rooms = {}; // { roomCode: Set of socket ids }

function generateRoomCode() {
  return crypto.randomBytes(3).toString('hex'); // 6 hex chars
}

app.post('/create-room', (req, res) => {
  const code = generateRoomCode();
  rooms[code] = new Set();
  res.json({ roomCode: code });
});

io.on('connection', (socket) => {
  socket.on('join-room', (code) => {
    if (!rooms[code]) {
      socket.emit('error', 'Room does not exist');
      return;
    }
    rooms[code].add(socket.id);
    socket.join(code);
    socket.emit('joined', code);
  });

  socket.on('message', ({ roomCode, message }) => {
    socket.to(roomCode).emit('message', message);
  });

  socket.on('disconnect', () => {
    for (const [code, members] of Object.entries(rooms)) {
      members.delete(socket.id);
      if (members.size === 0) {
        delete rooms[code];
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
