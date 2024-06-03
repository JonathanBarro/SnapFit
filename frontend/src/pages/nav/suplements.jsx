import React, { useState } from 'react';
import './suplements.scss';
import heroImage from '../../assets/img/suple.jpg';
import protes from '../../assets/img/protes.jpeg';

const Suplements = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      image: protes,
      title: 'Proteína en Polvo',
      text: (
        <>
          <p><b>Beneficios:</b></p>
          <ul>
            <li>Ayuda en la recuperación muscular post-entrenamiento.</li>
            <li>Contribuye a aumentar la masa muscular.</li>
            <li>Proporciona una fuente rápida de proteína.</li>
          </ul>
        </>
      ),
      extendedText: (
        <>
          <p><b>Tipos de Proteína en Polvo:</b></p>
          <ul>
            <li>Proteína de suero de leche.</li>
            <li>Proteína de caseína.</li>
            <li>Proteína vegetal (soja, guisante).</li>
          </ul>
        </>
      ),
    },
    {
      image: protes,
      title: 'Creatina',
      text: (
        <>
          <p><b>Beneficios:</b></p>
          <ul>
            <li>Mejora el rendimiento en ejercicios de alta intensidad.</li>
            <li>Aumenta la fuerza y la masa muscular.</li>
            <li>Promueve la recuperación muscular.</li>
          </ul>
        </>
      ),
      extendedText: (
        <>
          <p><b>Formas de Creatina:</b></p>
          <ul>
            <li>Monohidrato de creatina.</li>
            <li>Creatina HCL.</li>
            <li>Creatina etil éster.</li>
          </ul>
        </>
      ),
    },
    {
      image: protes,
      title: 'BCAA',
      text: (
        <>
          <p><b>Beneficios:</b></p>
          <ul>
            <li>Reduce la fatiga durante el ejercicio.</li>
            <li>Mejora la recuperación muscular.</li>
            <li>Previene la pérdida de masa muscular.</li>
          </ul>
        </>
      ),
      extendedText: (
        <>
          <p><b>Componentes de BCAA:</b></p>
          <ul>
            <li>Leucina.</li>
            <li>Isoleucina.</li>
            <li>Valina.</li>
          </ul>
        </>
      ),
    },
    {
      image: protes,
      title: 'Vitaminas y Minerales',
      text: (
        <>
          <p><b>Beneficios:</b></p>
          <ul>
            <li>Apoya el sistema inmunológico.</li>
            <li>Contribuye al bienestar general.</li>
            <li>Mejora la salud ósea.</li>
          </ul>
        </>
      ),
      extendedText: (
        <>
          <p><b>Tipos de Suplementos de Vitaminas:</b></p>
          <ul>
            <li>Multivitamínicos.</li>
            <li>Vitamina D.</li>
            <li>Calcio.</li>
          </ul>
        </>
      ),
    },
  ];

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="nutrition-page">
      <main className="wrapper">
        <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="overlay">
            <h1>Suplementación</h1>
            <article>
              <p>En este apartado enontrarás infromación sobre algunos los difertenes tipos de suplementación más utilizados.</p>
            </article>
          </div>
        </section>
        <div className="full-screen-container">
          <div className="info-section">
            <h2>Suplementación</h2>
            <p>En SnapFit, nuestra misión es facilitar y ayudar a nuestros usuarios a comenzar un cambio de vida saludable basado en sus objetivos personales. Ya sea ganar masa muscular, perder peso, adoptar un estilo de vida más saludable o mejorar tu salud cardiovascular, estamos aquí para guiarte en cada paso del camino.</p>
            <p>Nuestra web utiliza la información proporcionada por los usuarios para crear dietas personalizadas y planes de entrenamiento semanales que se adaptan a tus necesidades específicas. Pero no solo queremos guiarte; también queremos que aprendas y crezcas en el proceso.</p>
            <p>En SnapFit, encontrarás secciones dedicadas a la nutrición, el ejercicio y la suplementación. Aquí, podrás adquirir conocimientos desde cero y aprender a mantener un estilo de vida saludable sin depender de ninguna aplicación o web. Nuestro objetivo es empoderarte con el conocimiento necesario para que puedas llevar una vida saludable de forma independiente.</p>
            <p>Únete a SnapFit y transforma tu vida hoy.</p>
          </div>
        </div>
        <section className="supplements" id="supplements">
          <ul>
            {sections.map((section, index) => (
              <li key={index}>
                <figure>
                  <img src={section.image} alt={section.title} />
                  <figcaption><h3>{section.title}</h3></figcaption>
                </figure>
                <div className="text-content">
                  {section.text}
                  {expandedSection === index && <div>{section.extendedText}</div>}
                </div>
                <button onClick={() => toggleSection(index)}>
                  {expandedSection === index ? 'Leer menos' : 'Leer más'}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Suplements;
