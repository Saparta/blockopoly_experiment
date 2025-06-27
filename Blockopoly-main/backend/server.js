const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const rooms = new Map(); // roomCode -> Set of socket ids

app.use(express.json());

app.post('/create-room', (req, res) => {
  const roomCode = uuidv4().slice(0, 6); // simple 6-char code
  rooms.set(roomCode, new Set());
  res.json({ roomCode });
});

app.post('/join-room/:roomCode', (req, res) => {
  const { roomCode } = req.params;
  if (!rooms.has(roomCode)) {
    return res.status(404).json({ error: 'Room not found' });
  }
  res.json({ success: true });
});

io.on('connection', (socket) => {
  socket.on('join', (roomCode) => {
    if (!rooms.has(roomCode)) {
      socket.emit('error', 'Room not found');
      return;
    }
    rooms.get(roomCode).add(socket.id);
    socket.join(roomCode);
    socket.emit('joined', roomCode);
    socket.to(roomCode).emit('player-joined', socket.id);
  });

  socket.on('message', ({ roomCode, data }) => {
    if (rooms.has(roomCode)) {
      socket.to(roomCode).emit('message', { from: socket.id, data });
    }
  });

  socket.on('disconnect', () => {
    for (const [roomCode, members] of rooms.entries()) {
      if (members.delete(socket.id)) {
        socket.to(roomCode).emit('player-left', socket.id);
        if (members.size === 0) {
          rooms.delete(roomCode);
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
