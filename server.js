const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Enable CORS
app.use(cors());
app.use(express.json());

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Store connected clients and their messages
const clients = new Map();
const messages = [];

// WebSocket connection handling
wss.on('connection', (ws) => {
    const userId = Math.random().toString(36).substring(7);
    clients.set(ws, userId);

    console.log(`New client connected: ${userId}`);

    // Send existing messages to new client
    ws.send(JSON.stringify({
        type: 'history',
        messages: messages
    }));

    // Handle incoming messages
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            const messageObject = {
                userId: clients.get(ws),
                text: data.text,
                timestamp: new Date(),
                type: 'message'
            };

            // Store message
            messages.push(messageObject);

            // Broadcast message to all connected clients except sender
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(messageObject));
                }
            });
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log(`Client disconnected: ${clients.get(ws)}`);
        clients.delete(ws);
    });

    // Handle errors
    ws.on('error', (error) => {
        console.error(`WebSocket error for client ${clients.get(ws)}:`, error);
    });
});

// Basic REST endpoints
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error handling
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});
