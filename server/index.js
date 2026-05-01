const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5000', '*'],
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

// Routes
const incidentRoutes = require('./routes/incidents');
const scheduleRoutes = require('./routes/schedule');

app.use('/api/incidents', incidentRoutes);
app.use('/api/schedule', scheduleRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// WebSocket connection for real-time updates
io.on('connection', (socket) => {
  console.log('✓ New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('✗ Client disconnected:', socket.id);
  });
});

// Simulate real-time incident updates
setInterval(() => {
  io.emit('incident-update', {
    timestamp: new Date(),
    message: 'Incident data refreshed'
  });
}, 30000);

// Simulate schedule updates
setInterval(() => {
  io.emit('schedule-update', {
    timestamp: new Date(),
    message: 'Schedule data refreshed'
  });
}, 60000);

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`
🚒 Siletz Valley Fire District Dashboard`);
  console.log(`📊 Server running on http://localhost:${PORT}`);
  console.log(`🔌 WebSocket enabled for real-time updates
`);
});

module.exports = { app, io };
