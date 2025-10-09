import express from 'express';
import User from '../models/userModel.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/profile/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  // The user object is attached to the request by the `protect` middleware
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    emergencyContacts: req.user.emergencyContacts,
  });
});

// @desc    Update user profile
// @route   PUT /api/profile/me
// @access  Private
router.put('/me', protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // If password is sent, update it
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      emergencyContacts: updatedUser.emergencyContacts,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Update emergency contacts
// @route   PUT /api/profile/contacts
// @access  Private
router.put('/contacts', protect, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        // We expect an array of contacts in the request body
        const { emergencyContacts } = req.body;
        if (Array.isArray(emergencyContacts)) {
            user.emergencyContacts = emergencyContacts;
            const updatedUser = await user.save();
            res.json(updatedUser.emergencyContacts);
        } else {
            res.status(400).json({ message: 'Invalid data format for contacts' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


export default router;
