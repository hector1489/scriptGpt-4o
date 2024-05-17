const axios = require('axios');

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = 'clave_de_api';

//hay acceso al model en tu cuenta OpenAI
async function chatWithGPT(message) {
  const requestPayload = {
    model: 'gpt-4',
    messages: [{ role: 'user', content: message }],
  };

  try {
    const response = await axios.post(API_URL, requestPayload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    const reply = response.data.choices[0].message.content;
    console.log('ChatGPT:', reply);
    return reply;
  } catch (error) {
    console.error('Error interacting with ChatGPT API:', error);
    throw error;
  }
}

chatWithGPT('Hola, ¿cómo estás?')
  .then(reply => console.log('Respuesta de ChatGPT:', reply))
  .catch(error => console.error('Error:', error));
