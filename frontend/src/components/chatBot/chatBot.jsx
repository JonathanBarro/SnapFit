import React, { useState } from 'react';
import axios from 'axios';
import './chatBot.scss'; // Asegúrate de importar el archivo de estilos
import iaImage from '../../assets/img/IA.png'; // Asegúrate de ajustar el path según la ubicación de tu imagen

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga
  const [isChatOpen, setIsChatOpen] = useState(false); // Estado para controlar la visibilidad del chatbot

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const instruction = "Please respond with no more than 500 tokens: ";
    const fullPrompt = instruction + userInput;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true); // Comienza el estado de carga

    try {
      const response = await axios.post('http://localhost:3030/openai/chat', { prompt: fullPrompt });
      const botMessage = { role: 'bot', content: response.data.response.text || response.data.response };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false); // Termina el estado de carga
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <div className={`loader ${isChatOpen ? 'hide' : 'show'}`} onClick={toggleChat}>
        <div className="spinnerr"></div>
        <img src={iaImage} alt="IA" />
      </div>
      <div className={`chat-container ${isChatOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleChat}></button>
        <div className="chat-history">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.role}`}>
              {message.content}
            </div>
          ))}
          {loading && (
            <div className="chat-loading">
              <div className="circle1"></div>
              <div className="circle1"></div>
              <div className="circle1"></div>
              <div className="circle1"></div>
              <div className="circle1"></div>
            </div>
          )}
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
    </>
  );
};

export default ChatBot;
