import React from 'react';
import VideoCardList from '../../components/videoCards/videoList';
import './exercise.scss';
import heroImage from '../../assets/img/ejs.webp';

const Exercise = () => {
  return (
    <div className="nutrition-page">
      <main className="wrapper">
        <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="overlay">
            <h1>Ejercicio</h1>
            <article>
              <p>En este apartado encontrarás videos divididos en secciones para poder aprender a realizar correctamente diferentes ejercicios.</p>
            </article>
          </div>
        </section>
      </main>
      <div className="exercise-page">
        <h1 className="text-6xl text-center my-4 mt-20 mb-10">Videos de ejercicios</h1>
        <VideoCardList />
      </div>
    </div>
  );
};

export default Exercise;
