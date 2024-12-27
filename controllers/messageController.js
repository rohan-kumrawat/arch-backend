const Message = require('../models/Message');

// Submit a message
exports.submitMessage = async (req, res) => {
    const { name, number, requirement } = req.body;

    try {
        if (!name || !number) {
            return res.status(400).json({ error: 'Name and number are required.' });
        }

        const newMessage = new Message({ name, number, requirement });
        await newMessage.save();

        res.status(201).json({ message: 'Message submitted successfully.', data: newMessage });
    } catch (err) {
        res.status(500).json({ error: 'Error submitting message.', details: err.message });
    }
};
