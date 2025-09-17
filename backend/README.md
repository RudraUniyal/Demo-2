# Civic Eye Backend

This is the backend API for the Civic Eye application, built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Hazard reporting and management
- RESTful API design
- MongoDB integration with Mongoose
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier)

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up MongoDB Atlas:
   - Follow the instructions in [MONGODB_ATLAS_SETUP.md](MONGODB_ATLAS_SETUP.md)
   - Update the [.env](file:///d:/Hackathon%20p2/backend/.env) file with your MongoDB connection string

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
backend/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── utils/           # Utility functions
├── .env             # Environment variables
├── server.js        # Entry point
└── package.json     # Dependencies and scripts
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Hazards
- `GET /api/hazards` - Get all hazards (protected)
- `POST /api/hazards` - Create a new hazard (protected)
- `GET /api/hazards/:id` - Get a specific hazard (protected)
- `PUT /api/hazards/:id` - Update a hazard (protected)
- `DELETE /api/hazards/:id` - Delete a hazard (protected)

## Environment Variables

Create a [.env](file:///d:/Hackathon%20p2/backend/.env) file in the root directory with the following variables:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

## Development

To start the development server:
```bash
npm run dev
```

The server will start on port 5000 or the port specified in your environment variables.

## Production

To start the production server:
```bash
npm start
```