const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not defined in environment variables');
      console.error('Please create a .env file with MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/civic-eye?retryWrites=true&w=majority');
      return;
    }
    
    // Test connection
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✓ Database Name: ${conn.connection.name}`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('✓ Connection test completed successfully');
  } catch (error) {
    console.error(`✗ Error connecting to MongoDB: ${error.message}`);
    console.error('Troubleshooting tips:');
    console.error('1. If using MongoDB Atlas, ensure your connection string is correct');
    console.error('2. Check your username and password');
    console.error('3. Ensure your IP address is whitelisted in MongoDB Atlas');
    console.error('4. If using local MongoDB, ensure it is running on your system');
  }
};

connectDB();