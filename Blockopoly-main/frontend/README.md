# 🎲 Blockopoly – Frontend (Electron + React)

**Blockopoly** is a 3D, cross-platform digital card game inspired by _Monopoly Deal_, rebuilt for desktop using modern web tech. This is the **frontend** of the game, powered by React, Electron, and Vite.

---

## Features

- Cross-platform Electron desktop app (macOS, Windows, Linux)
- Interactive, 3D card table layout with animations
- Styled with Tailwind CSS + animated using Framer Motion
- Built with Vite + TypeScript for lightning-fast dev
- Connects to a Kotlin backend (via REST/WebSocket)
- Real-time multiplayer support
- Easy to extend and theme for future expansions

---

## Tech Stack

| Layer        | Stack                          |
| ------------ | ------------------------------ |
| UI Framework | React + Vite + TypeScript      |
| Styling      | Tailwind CSS + Framer Motion   |
| Desktop App  | Electron                       |
| State Mgmt   | Zustand or Redux Toolkit (TBD) |
| API Comm     | Axios + WebSocket              |
| Backend      | Kotlin                         |

---

---

### Connecting to the Example Backend

To try the multiplayer room functionality, first start the backend server in `../backend`. The frontend can then join a room by sending a `POST` request to `/create-room` and connecting to the Socket.IO gateway at the same host. This README does not include a full implementation, but the backend server demonstrates how rooms are managed.
