const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB Atlas Connection...');
console.log('Using connection string:', process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    
    // Try to connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✓ Database Name: ${conn.connection.name}`);
    console.log(`✓ Connection Status: ${conn.connection.readyState}`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('✓ Connection closed successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error.message);
    console.error('Error Code:', error.code);
    console.error('Error Name:', error.name);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.error('\nTroubleshooting tips:');
      console.error('1. Check if your IP address is whitelisted in MongoDB Atlas Network Access');
      console.error('2. Verify your username and password are correct');
      console.error('3. Ensure your cluster URL is correct');
      console.error('4. Check if your MongoDB Atlas cluster is active');
    }
    
    process.exit(1);
  }
};

connectDB();