import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = 'clave_de_la_api';

interface ChatGPTRequest {
  model: string;
  messages: { role: string; content: string }[];
  max_tokens?: number;
  temperature?: number;
}

interface ChatGPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
}

async function chatWithGPT(message: string) {
  const requestPayload: ChatGPTRequest = {
    model: 'gpt-4',
    messages: [{ role: 'user', content: message }],
  };

  try {
    const response = await axios.post<ChatGPTResponse>(API_URL, requestPayload, {
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

// uso
chatWithGPT('Hola, ¿cómo estás?')
  .then(reply => console.log('Respuesta de ChatGPT:', reply))
  .catch(error => console.error('Error:', error));
