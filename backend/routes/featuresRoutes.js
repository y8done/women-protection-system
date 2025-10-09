import express from 'express';
import Hotspot from '../models/hotspotModel.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all hotspots from the database
// @route   GET /api/features/hotspots
// @access  Private
router.get('/hotspots', protect, async (req, res) => {
  try {
    const hotspots = await Hotspot.find({});
    res.json(hotspots);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not fetch hotspots.' });
  }
});

export default router;