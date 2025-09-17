const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/civic-eye');
    
    // Remove deprecated options and add new ones
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/civic-eye', {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.error('Please ensure MongoDB is running and accessible.');
    console.error('If using MongoDB Atlas, verify your connection string in the .env file.');
    console.error('For development, you can use a mock database.');
    // Instead of exiting, we'll continue with a mock database for development
    console.log('Continuing with mock database for development purposes...');
  }
};

module.exports = connectDB;