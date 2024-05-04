const { OpenAI } = require('openai');
const OPENAI_API_KEY = procces.env.OPENAI_API_KEY

const openai = new OpenAI({
  OPENAI_API_KEY
});

async function callOpenAI() {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Tell me a joke" }],
      model: "gpt-3.5-turbo"
    });
    return response;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    // Arrojar error con más información
    throw new Error(`OpenAI API call failed: ${error.message}`);
  }
}

module.exports = { callOpenAI };
