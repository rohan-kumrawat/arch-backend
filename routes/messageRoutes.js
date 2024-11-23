const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST: Add a new message
router.post('/', async (req, res) => {
  try {
    const { name, number, requirement } = req.body;

    // Validation
    if (!name || !number) {
      return res.status(400).json({ message: 'Name and number are required.' });
    }

    const newMessage = new Message({ name, number, requirement });
    await newMessage.save();

    res.status(201).json({ message: 'Message submitted successfully.', data: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting message.', error: error.message });
  }
});

// GET: Fetch all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages.', error: error.message });
  }
});

module.exports = router;
