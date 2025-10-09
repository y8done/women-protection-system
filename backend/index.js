import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import profileRoutes from './routes/profileRoutes.js'; // Import the new profile routes
import featuresRoutes from './routes/featuresRoutes.js';
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend to communicate
  credentials: true,
}));
app.use(express.json()); // Enable parsing of JSON in request body
app.use(express.urlencoded({ extended: true })); // Allow form data
app.use(cookieParser()); // Enable parsing of cookies

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/profile', profileRoutes); // Use the profile routes
app.use('/api/features', featuresRoutes);
// Simple test route
app.get('/', (req, res) => {
  res.send('Women Protection API is running...');
});


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database. Server did not start.", error);
    process.exit(1);
  }
};

startServer();

