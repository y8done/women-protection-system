import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import featuresRoutes from './routes/featuresRoutes.js';

// --- Main Server File ---
// This file initializes the Express server, connects to the database,
// and sets up all the middleware and routes.

const startServer = async () => {
  // Load environment variables
  dotenv.config();

  try {
    // Connect to Database
    await connectDB();

    const app = express();
    const PORT = process.env.PORT || 5001;

    const allowedOrigins = [
      'https://women-protection-client.onrender.com',
      'http://localhost:5173',
      'http://localhost:3000'
    ];

    const corsOptions = {
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    };

    app.use(cors(corsOptions));

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // API Routes
    app.use('/api/users', userRoutes);
    app.use('/api/alerts', alertRoutes);
    app.use('/api/profile', profileRoutes);
    app.use('/api/features', featuresRoutes);

    // Simple test route
    app.get('/', (req, res) => {
      res.send('Women Protection API is running...');
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

