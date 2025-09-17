const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Import database connection
const connectDB = require('./config/db');

// Initialize express app
const app = express();

// Connect to database (non-blocking)
connectDB().catch(err => {
  console.log('Database connection failed, continuing with mock database');
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Import routes
const authRoutes = require('./routes/auth.routes');
const hazardsRoutes = require('./routes/hazards.routes');

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/hazards', hazardsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Civic Eye Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`Civic Eye Backend server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});

module.exports = app;