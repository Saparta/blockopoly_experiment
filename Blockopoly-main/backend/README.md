# Backend

This is a minimal Node.js server providing room creation and WebSocket-based
communication for a multiplayer version of Blockopoly.
=======
# Backend Server

This directory contains a minimal Node.js server providing simple room creation and real-time communication via WebSockets. It exposes two HTTP endpoints and a Socket.IO gateway.


## Setup

```bash
npm install
```

## Running

```bash
node server.js
```

The server exposes an HTTP endpoint `/create-room` which returns a randomly
generated room code. Clients connect via WebSocket (Socket.IO) and emit
`join-room` with the room code to join a room. Messages sent with the `message`
event are broadcast to all other players in the same room.
=======
npm start
```

The server listens on port `3000` by default. You can override this with the `PORT` environment variable.

## Endpoints

- `POST /create-room` – creates a new room and returns a six-character `roomCode`.
- `POST /join-room/:roomCode` – checks that a room exists.

WebSocket clients can connect and join a room by emitting the `join` event with the `roomCode`.

This is only a minimal example. Integrate it with your game logic to broadcast game events between players in a room.