import './suplements.scss';
import heroImage from '../../assets/img/suple.jpg';

const Suplements = () => {
  return (
    <div className="nutrition-page">
      <main className="wrapper">
        <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="overlay">
            <h1>Suplementación</h1>
            <article>
              <p>En este apartado te informarás sobre los diferentes suplementos.</p>
            </article>
          </div>
        </section>

      </main>
    </div>
  );
  }
  
  export default Suplements;