const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: "sk-proj-3nXliBZ2Ix2MDq4m7uqqT3BlbkFJP85q6Qb3GMLUaGZpiTol"
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
