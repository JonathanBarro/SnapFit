import './home.scss';
import Hero from "../../components/Hero/hero";
import CardFotos from '../../components/cards/cardHome';
import { Link } from 'react-router-dom';

const Home = () => {
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
          <Link exact to="/signup" className="signup-button">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
