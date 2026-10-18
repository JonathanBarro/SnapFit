import React, { useContext } from 'react';
import './home.scss';
import Hero from "../../components/Hero/hero";
import CardFotos from '../../components/cards/cardHome';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext'; // Importa el contexto

const Home = () => {
  const { user } = useContext(UserContext); // Usa el contexto para obtener el usuario

  return (
    <div className="home-container">
      <div className="hero">
        <Hero />
        <div className="overlay"></div>
        <div className="text-overlay">
          <h1>Bienvenido a SnapFit</h1>
          <h3>Comienza tu nuevo estilo de vida con nosotros</h3>
        </div>
      </div>
      <div className="full-screen-container">
        <div className="info-section">
          <h2>¿Qué es SnapFit?</h2>
          <p>En SnapFit, nuestra misión es facilitar y ayudar a nuestros usuarios a comenzar un cambio de vida saludable basado en sus objetivos personales. Ya sea ganar masa muscular, perder peso, adoptar un estilo de vida más saludable o mejorar tu salud cardiovascular, estamos aquí para guiarte en cada paso del camino.</p>
          <p>Nuestra web utiliza la información proporcionada por los usuarios para crear dietas personalizadas y planes de entrenamiento semanales que se adaptan a tus necesidades específicas. Pero no solo queremos guiarte; también queremos que aprendas y crezcas en el proceso.</p>
          <p>En SnapFit, encontrarás secciones dedicadas a la nutrición, el ejercicio y la suplementación. Aquí, podrás adquirir conocimientos desde cero y aprender a mantener un estilo de vida saludable sin depender de ninguna aplicación o web. Nuestro objetivo es empoderarte con el conocimiento necesario para que puedas llevar una vida saludable de forma independiente.</p>
          <p>Únete a SnapFit y transforma tu vida hoy.</p>
          {!user && ( // Solo muestra el botón si el usuario no está logueado
            <Link to="/signup" className="signup-button">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Regístrate
            </Link>
          )}
        </div>
      </div>
      <div className="full-screen-container">
        <div className="info-section">
          <h2>ChatBot</h2>
          <p>Además, en SnapFit contamos con un chatbot inteligente que actúa como tu asistente personal en fitness y nutrición. Puedes utilizar el chatbot para resolver cualquier duda que tengas sobre dietas, ejercicios y hábitos saludables. ¿No sabes qué alimento puede sustituir a otro en tu dieta? ¿Te preguntas por qué es importante comer cierto tipo de alimentos? ¿Tienes dudas sobre cómo ejecutar un ejercicio correctamente? Nuestro chatbot está disponible para ayudarte en cualquier momento, proporcionándote respuestas rápidas y precisas a todas tus preguntas. Es como tener a un entrenador y nutricionista personal a tu disposición 24/7.El ChatBot se encuentra en la esquina inferior derecha de tu pantalla, si haces click en el icono se desplegará un chat y si ya has resuelto tus dudas y quieres vovler a cerrarlo solo tendras que hacer click en los tres puntitos que salen a la derecha del botón enviar.</p>
          <p>El ChatBot se encuentra en la esquina inferior derecha de tu pantalla, si haces click en el icono, la cabeza con colores alrededor girando, se desplegará un chat y si ya has resuelto tus dudas y quieres cerrarlo solo tendrás que hacer click en los tres puntitos que salen a la derecha del botón enviar.</p>
          </div>
        </div>
    </div>
  );
};

export default Home;
