import Parrafo from "../../components/parrafo";

const AboutUs = () => {
  return (
    <section className="prose max-w-none pb-4 leading-relaxed md:prose-lg sm:pb-6 md:pb-8 bg-violet-200">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20 ">
          <h1 className="font-bold text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
            ¡Bienvenido a SnapFitnes!
          </h1>
        </div>
        <div className="prose max-w-none pb-4 leading-relaxed md:prose-lg sm:pb-6 md:pb-8">
        <Parrafo prrf="
            En SnapFitnes, creemos en un enfoque sencillo y fundamentado en la
            información para transformar vidas. Nuestra aplicación está diseñada
            para brindarte las herramientas necesarias para iniciar y mantener
            un cambio significativo en tu salud, de manera accesible y fácil de
            seguir." />
            <Parrafo prrf="¿Te has sentido perdido al intentar mejorar tu salud o transformar
            tu físico? ¡No estás solo! Entendemos que para muchos, la
            planificación puede convertirse en una barrera abrumadora. Por eso,
            hemos creado SnapFitnes con el objetivo de convertir esa barrera en
            una compañera de viaje." />
            <Parrafo prrf="Con solo ingresar tus datos, nuestra aplicación calcula las calorías
            necesarias en base a tus características y objetivos. Ya sea que
            quieras perder peso, ganar músculo o simplemente mejorar tu salud
            general, te proporcionaremos una dieta personalizada y planes de
            ejercicios adaptados a tus necesidades específicas." />
            <Parrafo prrf="Pero eso no es todo. En SnapFitnes, no solo te ofrecemos un plan de
            ejercicio, sino también una oportunidad para aprender. A lo largo
            del proceso, te explicaremos el porqué de cada paso y cómo se
            calculan las cosas. Queremos que seas consciente de cada elección
            que haces para tu salud, para que no solo sigas un plan, sino que
            también comprendas el impacto que tiene en tu cuerpo y bienestar.
            Además, en nuestra web encontrarás diferentes apartados con
            información detallada sobre suplementación, ejercicios, nutrición y
            una variedad de consejos útiles. Queremos proporcionarte todas las
            herramientas necesarias para que te conviertas en el mejor y más
            informado version de ti mismo." />
            <Parrafo prrf="Nuestro enfoque se centra en la simplicidad, la información y el
            aprendizaje. Queremos que te sientas empoderado para tomar el
            control de tu salud y que disfrutes del proceso de transformación.
            En SnapFitnes, te acompañamos en cada paso del camino hacia una
            versión más saludable y feliz de ti mismo." />
            <Parrafo prrf="¡Es hora de dejar atrás las excusas y comenzar tu viaje hacia una
            vida más saludable! Únete a la comunidad de SnapFitnes y descubre
            cómo pequeños cambios pueden marcar una gran diferencia en tu
            bienestar." />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
