# WhatsApp Clone

A simple WhatsApp clone built with HTML, CSS, JavaScript, and Node.js. This application features real-time messaging using WebSocket technology.

## Features

- Real-time messaging
- Contact list with search functionality
- Message history
- Responsive design
- WebSocket connection for instant message delivery
- Automatic reconnection on connection loss

## Project Structure

```
whatsapp-clone/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── backend/
│   ├── package.json
│   └── server.js
└── README.md
```

## Setup and Running

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd whatsapp-clone/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

The server will start on port 3000 (http://localhost:3000)

### Frontend Access

Once the backend server is running, you can access the application by:

1. Opening your web browser
2. Navigate to http://localhost:3000

The frontend is served statically by the backend server, so there's no need to run it separately.

## Usage

1. Open the application in multiple browser windows to simulate different users
2. Type messages in the input field and press Enter to send
3. Use the search bar to filter contacts
4. Click on different contacts to switch between conversations

## Technical Details

- Frontend:
  - Pure HTML, CSS, and JavaScript
  - WebSocket client for real-time communication
  - Responsive design for mobile and desktop views

- Backend:
  - Node.js with Express
  - WebSocket server for real-time message handling
  - In-memory storage for messages and client connections

## Development

To modify the application:

1. Frontend files are in the `frontend` directory
   - `index.html` - Structure and layout
   - `styles.css` - Styling and animations
   - `script.js` - Client-side functionality

2. Backend files are in the `backend` directory
   - `server.js` - WebSocket and HTTP server implementation
   - `package.json` - Project dependencies and scripts

## Future Improvements

- User authentication
- Persistent message storage with database
- File sharing capabilities
- Read receipts
- Online/offline status
- Group chat functionality
- Voice and video calls
- Message encryption
