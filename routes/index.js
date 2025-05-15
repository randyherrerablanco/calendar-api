const express = require('express');
const router = express.Router();
const { createEvent } = require('../bin/calendar');
const authenticateToken = require('../middleware/auth');

router.get('/api/test', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

router.post('/api/calendar/create', authenticateToken, async (req, res) => {
  const { summary, description, start, end } = req.body;

  if (!summary || !start || !end) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const event = await createEvent({ summary, description, start, end });
    return res.status(201).json({ success: true, event });
  } catch (err) {
    console.error('Error creating event:', err);
    return res.status(500).json({ error: 'Failed to create event' });
  }
});

module.exports = router;
