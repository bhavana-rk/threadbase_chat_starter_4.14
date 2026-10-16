# Threadbase - Live Chat with Socket.io (Starter)

Add a real-time chat feature to Threadbase using Socket.io: wrap the HTTP server,
authenticate sockets with JWT, use a room to scope the thread's messages, and wire a
React `useSocket` hook. Two windows on the same thread should see each other's messages
instantly.

## Setup

```bash
# Terminal 1 - the Express + Socket.io server
cd server && cp .env.example .env && npm install && npm start

# Terminal 2 - the React app
cd client && cp .env.development.example .env.development && npm install && npm run dev
```

The server and client dependencies, including `socket.io` and `socket.io-client`, are
installed with `npm install` in their respective directories.

## How it works

The server wraps the Express app in an HTTP server, authenticates Socket.io handshakes
with the JWT from `auth.token`, and broadcasts chat messages only to joined thread rooms.
The React `useSocket` hook joins the requested room, receives messages, and disconnects
cleanly when its token or room changes.

`client/src/components/ChatRoom.jsx` is already wired to `useSocket` - once the hook works,
the UI works.

## Testing your work

- Open the app, log in as **Ada**. Open a second browser window (or incognito), log in as **Linus**.
- Type in one window and press Send. The message should appear in **both** windows in well under a second.
- Log in credentials: `ada@threadbase.dev` / `password` and `linus@threadbase.dev` / `password`.

## What is already done

- The Express server with `/auth/login` (issues a JWT) and an HTTP `verifyToken` route.
- The React app: login page, auth context (holds the `token`), and `ChatRoom.jsx`.
