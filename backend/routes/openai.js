const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

async function callOpenAI(userInput, maxTokens = null) {
  try {
    const requestData = {
      model: 'gpt-4',
      messages: [{ role: 'user', content: userInput }],
    };

    if (maxTokens) {
      requestData.max_tokens = maxTokens;
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      requestData,
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0].message.content.trim();

    // Intentar parsear la respuesta como JSON
    let result;
    try {
      result = JSON.parse(content);
    } catch (e) {
      console.warn(`Response is not a valid JSON, treating as plain text: ${content}`);
      result = { text: content };
    }

    return result;
  } catch (error) {
    console.error('Error calling OpenAI:', error.message);
    throw new Error(`OpenAI API call failed: ${error.message}`);
  }
}

router.post('/', async (req, res) => {
  const userInput = req.body.prompt;
  console.log('Received POST request with prompt:', userInput);
  try {
    const response = await callOpenAI(userInput);
    res.json(response);
  } catch (error) {
    console.error("API Call Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get('/debug', (req, res) => {
  res.send('OpenAI route is working!');
});

router.post('/chat', async (req, res) => {
  const userInput = req.body.prompt;
  try {
    const response = await callOpenAI(userInput, 150);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/prueba', async (req, res) => {
  const { usuario, kcals } = req.body;

  const promptDieta = `
  Crear una dieta semanal para un usuario llamado ${usuario} con una ingesta diaria de ${kcals} calorías. Devuelve la respuesta en formato JSON sin ninguna explicación ni palabra adicional:
  {
    "dieta": {
      "days": [
        {
          "day": "lunes",
          "meals": [
            {
              "meal": "desayuno",
              "items": ["item1", "item2"]
            },
            {
              "meal": "almuerzo",
              "items": ["item1", "item2"]
            },
            {
              "meal": "cena",
              "items": ["item1", "item2"]
            }
          ]
        },
        ...
      ]
    }
  }
  `;

  const promptEjercicio = `
  Crear un plan de ejercicios semanal para un usuario llamado ${usuario} con una ingesta diaria de ${kcals} calorías. Devuelve la respuesta en formato JSON sin ninguna explicación ni palabra adicional:
  {
    "ejercicios": {
      "days": [
        {
          "day": "lunes",
          "exercises": [
            {
              "exercise": "ejercicio1",
              "sets": 3,
              "reps": 12
            },
            {
              "exercise": "ejercicio2",
              "sets": 3,
              "reps": 12
            }
          ]
        },
        ...
      ]
    }
  }
  `;

  try {
    const [responseDieta, responseEjercicio] = await Promise.all([
      callOpenAI(promptDieta),
      callOpenAI(promptEjercicio)
    ]);

    res.json({ dieta: responseDieta.dieta, ejercicios: responseEjercicio.ejercicios });
  } catch (error) {
    console.error("API Call Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
