# MongoDB Atlas Setup Guide

## Step-by-Step Instructions

1. **Create an Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Click "Try Free" and sign up for an account

2. **Create a Free Tier Cluster**
   - After logging in, click "Build a Cluster"
   - Select the free tier (M0 Sandbox) labeled as "Shared"
   - Choose any provider (AWS, Google Cloud, or Azure)
   - Select a region near you
   - Keep the cluster name as default or rename it
   - Click "Create Cluster" (this may take a few minutes)

3. **Configure Database Access**
   - In the left sidebar, go to "Database Access" under the Security section
   - Click "Add New Database User"
   - Create a username and password (remember these credentials)
   - For user privileges, select "Atlas Admin"
   - Click "Add User"

4. **Configure Network Access**
   - In the left sidebar, go to "Network Access" under the Security section
   - Click "Add IP Address"
   - For development, you can select "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, you would add your specific IP address
   - Click "Confirm"

5. **Get Your Connection String**
   - Go back to your cluster view
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string

6. **Update Environment Variables**
   - Open the `.env` file in the backend directory
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Update the cluster URL if different from the default

## Connection String Format

```
mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/civic-eye?retryWrites=true&w=majority
```

## Testing the Connection

After updating your environment variables:

1. Make sure all dependencies are installed:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm run dev
   ```

3. Check the console for the "MongoDB Connected" message

## Troubleshooting

- If you get connection errors, double-check your username and password
- Ensure your IP address is whitelisted in Network Access
- Make sure you're using the correct connection string for your cluster
- Verify that you've created a database user with appropriate permissions