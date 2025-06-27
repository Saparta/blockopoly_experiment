# Backend

This is a minimal Node.js server providing room creation and WebSocket-based
communication for a multiplayer version of Blockopoly.

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
