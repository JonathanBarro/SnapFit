import React from 'react';
import './supplements.scss'; // Asegúrate de crear y vincular este archivo SCSS

const Supplements = () => {
   return (
    <div id="parallax-world-of-ugg">
      <section className="bg-white text-center py-20">
        <div className="title">
          <h3 className="text-black uppercase tracking-widest text-sm font-medium">Let's do some</h3>
          <h1 className="text-black uppercase text-3xl tracking-wider">PARALLAX</h1>
        </div>
      </section>

      <section className="parallax-bg-one">
        <h2 className="text-white text-8xl uppercase tracking-widest">SOUTHERN CALIFORNIA</h2>
      </section>

      <section className="bg-white text-justify p-20 mx-auto max-w-screen-lg">
        <div className="block">
          <p><span className="first-character sc">I</span>n 1978, Brian Smith landed...</p>
        </div>
      </section>

      <section className="parallax-bg-two">
        <h2 className="text-white text-8xl uppercase tracking-widest">NEW YORK</h2>
      </section>

      <section className="bg-white text-justify p-20 mx-auto max-w-screen-lg">
        <div className="block">
          <p><span className="first-character ny">B</span>reaking into the New York fashion world...</p>
        </div>
      </section>

      <section className="parallax-bg-three">
        <h2 className="text-white text-8xl uppercase tracking-widest">ENCHANTED FOREST</h2>
      </section>

      <section className="bg-white text-justify p-20 mx-auto max-w-screen-lg">
        <div className="block">
          <p><span className="first-character atw">W</span>hen the New York fashion community...</p>
        </div>
      </section>
    </div>
  );
};
export default Supplements;
