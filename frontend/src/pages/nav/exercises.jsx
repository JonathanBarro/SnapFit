import './exercise.scss';
import heroImage from '../../assets/img/ejs.webp';
import VideoCardList from '../../components/videoCards/videoList';

const Exercise = () => {
  return (
    <div className="nutrition-page">
      <main className="wrapper">
        <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="overlay">
            <h1>Ejercicio</h1>
            <article>
              <p>En este apartado tienes ejemplos de como se realizan diferentes ejercicios.</p>
            </article>
          </div>
        </section>
      </main>
      <div className="exercise-page">
            <h1 className="text-3xl font-bold text-center my-4">Exercise Videos</h1>
            <VideoCardList />
        </div>
    </div>
  );
};
  
  export default Exercise;