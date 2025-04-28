// 

import express from 'express';
import axios from 'axios';

const router = express.Router();

// Your Cohere API key here
const COHERE_API_KEY = process.env.COHERE_API_KEY;

console.log('Cohere API Key:', process.env.COHERE_API_KEY); // Debug print

router.post('/', async (req, res) => {
  const { message } = req.body;  // Get message from client-side

  try {
    // Call Cohere API
    const response = await axios.post(
      'https://api.cohere.ai/v1/chat',  // Cohere's chat endpoint
      {
        model: 'command-r',  // You can use other models, but 'command-r' works best for chat
        message: message,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const reply = response.data.text || response.data.reply || JSON.stringify(response.data);
    res.json({ reply });
  } catch (err) {
    console.error('Cohere API error:', err.response?.data || err.message);
    res.status(500).json({ reply: 'Sorry, something went wrong.' });
  }
});

export default router;
