const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

async function callOpenAI(userInput) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: userInput }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error calling GPT-4:', error);
    throw new Error(`GPT-4 API call failed: ${error.message}`);
  }
}

router.post('/', async (req, res) => {
  const userInput = req.body.prompt;
  try {
    const response = await callOpenAI(userInput);
    res.json(response);
  } catch (error) {
    console.error("API Call Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
