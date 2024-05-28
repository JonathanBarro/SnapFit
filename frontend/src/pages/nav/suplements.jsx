import './suplements.scss';
import heroImage from '../../assets/img/suple.jpg';

const Suplements = () => {
  return (
    <div className="nutrition-page">
      <main className="wrapper">
        <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="overlay">
            <h1>Nutrición</h1>
            <article>
              <p>En este apartado aprenderás todo lo necesario sobre macronutrientes y calorías para saber qué cantidad y alimento es adecuada y por qué.</p>
            </article>
          </div>
        </section>

      </main>
    </div>
  );
  }
  
  export default Suplements;