import React, { useState } from 'react';
import axios from 'axios';
import './chatBot.scss'; // Asegúrate de importar el archivo de estilos

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true); // Comienza el estado de carga

    try {
      const response = await axios.post('http://localhost:3030/openai/chat', { prompt: userInput });
      const botMessage = { role: 'bot', content: response.data.response.text || response.data.response };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false); // Termina el estado de carga
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            {message.content}
          </div>
        ))}
        {loading && <div className="chat-loading">Cargando...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          disabled={loading} // Deshabilita el input mientras carga
        />
        <button onClick={handleSend} disabled={loading}>Enviar</button> {/* Deshabilita el botón mientras carga */}
      </div>
    </div>
  );
};

export default ChatBot;
