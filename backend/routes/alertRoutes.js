import express from 'express';
import nodemailer from 'nodemailer';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Trigger an SOS alert
// @route   POST /api/alerts/sos
// @access  Private
router.post('/sos', protect, async (req, res) => {
  const { lat, lng } = req.body;
  const user = req.user;

  if (!user.emergencyContacts || user.emergencyContacts.length === 0) {
    return res.status(400).json({ message: 'No emergency contacts found.' });
  }

  // Use Nodemailer to send emails
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or another email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    subject: `SOS Alert from ${user.name}`,
  };

  try {
    // Send an email to each emergency contact
    for (const contact of user.emergencyContacts) {
      await transporter.sendMail({
        ...mailOptions,
        to: contact.email,
        html: `
          <p><b>EMERGENCY ALERT!</b></p>
          <p>${user.name} has triggered an SOS alert.</p>
          <p>Their last known location is:</p>
          <p><a href="${mapLink}" target="_blank">View on Google Maps</a></p>
          <p>Latitude: ${lat}, Longitude: ${lng}</p>
          <p>Please try to contact them immediately.</p>
        `,
      });
    }
    res.status(200).json({ message: 'SOS alerts sent successfully.' });
  } catch (error) {
    console.error('Error sending SOS email:', error);
    res.status(500).json({ message: 'Failed to send SOS alerts.' });
  }
});

export default router;
