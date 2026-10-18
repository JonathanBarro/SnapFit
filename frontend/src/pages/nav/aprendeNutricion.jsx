import React, { useState } from 'react';
import './aprendeNutricion.scss';
import heroImage from '../../assets/img/nutri-hero.webp';
import protes from '../../assets/img/protes.jpeg';
import carbs from '../../assets/img/acarbs.webp';
import grasas from '../../assets/img/grasas.jpg';
import calorias from '../../assets/img/cals.jpg';

const LearnNutrition = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      image: protes,
      title: 'Proteínas',
      text: (
        <>
          <p><b>Funciones:</b></p>
          <ul>
            <li>Construcción y Reparación: Las proteínas son esenciales para la construcción y reparación de tejidos corporales, incluyendo músculos, piel y órganos.</li>
            <li>Enzimas y Hormonas: Actúan como enzimas que aceleran las reacciones químicas y como hormonas que regulan procesos corporales.</li>
            <li>Inmunidad: Forman anticuerpos que ayudan a combatir infecciones.</li>
            <li>Transporte y Almacenamiento: Transportan moléculas a través del cuerpo y almacenan nutrientes importantes.</li>
          </ul>
        </>
      ),
      extendedText: (
        <>
          <p><b>Tipos de Proteínas:</b></p>
          <ul>
            <li>Completas: Contienen todos los aminoácidos esenciales. Se encuentran en productos animales como carne, pescado, huevos y productos lácteos.</li>
            <li>Incompletas: Carecen de uno o más aminoácidos esenciales. Se encuentran en la mayoría de las fuentes vegetales como legumbres y frutos secos.</li>
          </ul>
          <p><b>Ejemplos de Alimentos:</b></p>
          <ul>
            <li>Carnes (pollo, res, cerdo)</li>
            <li>Pescado y mariscos</li>
            <li>Huevos</li>
            <li>Productos lácteos (leche, queso, yogur)</li>
            <li>Legumbres (frijoles, lentejas, garbanzos)</li>
            <li>Nueces y semillas</li>
          </ul>
        </>
      ),
    },
    {
      image: carbs,
      title: 'Carbohidratos',
      text: (
        <>
          <p><b>Funciones:</b></p>
          <ul>
            <li>Energía Rápida: Los carbohidratos son la principal fuente de energía para el cuerpo. Se descomponen en glucosa, que las células utilizan para generar energía.</li>
            <li>Almacenamiento de Energía: El exceso de glucosa se almacena en el hígado y los músculos como glucógeno para ser usado cuando sea necesario.</li>
            <li>Función Cerebral: El cerebro depende en gran medida de la glucosa para su funcionamiento óptimo.</li>
          </ul>
        </>
      ),
      extendedText: (
        <>
          <p><b>Tipos de Carbohidratos:</b></p>
          <ul>
            <li>Simples: Se encuentran en azúcares naturales como frutas (fructosa) y leche (lactosa), así como en azúcares añadidos en dulces y refrescos.</li>
            <li>Complejos: Se encuentran en alimentos ricos en almidón y fibra como granos enteros (arroz integral, avena), legumbres (frijoles, lentejas) y verduras.</li>
          </ul>
          <p><b>Ejemplos de Alimentos:</b></p>
          <ul>
            <li>Panes y cereales integrales</li>
            <li>Pasta</li>
            <li>Arroz</li>
            <li>Patatas y otros tubérculos</li>
            <li>Frutas (manzanas, plátanos, naranjas)</li>
            <li>Verduras (brócoli, zanahorias)</li>
          </ul>
        </>
      ),
    },
    {
      image: grasas,
      title: 'Grasas',
      text: (
        <>
          <p><b>Funciones:</b></p>
          <ul>
            <li>Energía Concentrada: Proporcionan más del doble de energía por gramo en comparación con carbohidratos y proteínas.</li>
            <li>Absorción de Vitaminas: Facilitan la absorción de vitaminas liposolubles (A, D, E, K).</li>
            <li>Protección y Aislamiento: Protegen los órganos vitales y ayudan a mantener la temperatura corporal.</li>
            <li>Componentes Celulares: Forman parte de las membranas celulares, asegurando su integridad y funcionalidad.</li>
          </ul>
        </>
      ),
      extendedText: (
        <>
          <p><b>Tipos de Grasas:</b></p>
          <ul>
            <li>Saturadas: Se encuentran en productos animales y algunos aceites tropicales. Se deben consumir con moderación.</li>
            <li>Insaturadas: Incluyen grasas monoinsaturadas y poliinsaturadas, que son beneficiosas para la salud cardiovascular. Se encuentran en aceites vegetales, nueces y pescados grasos.</li>
            <li>Trans: Grasas artificiales que deben evitarse, ya que pueden aumentar el riesgo de enfermedades cardíacas.</li>
          </ul>
          <p><b>Ejemplos de Alimentos:</b></p>
          <ul>
            <li>Aceites vegetales (aceite de oliva, aceite de canola)</li>
            <li>Nueces y semillas (almendras, nueces, semillas de chía)</li>
            <li>Aguacates</li>
            <li>Pescados grasos (salmón, sardinas, caballa)</li>
            <li>Productos lácteos enteros (mantequilla, queso)</li>
            <li>Carnes (con moderación, especialmente las grasas saturadas)</li>
          </ul>
        </>
      ),
    },
    {
      image: calorias,
      title: 'Calorías',
      text: (
        <>
          <p><b>Definición:</b></p>
          <ul>
            <li>Las calorías son una unidad de medida de energía. En términos de nutrición, representan la cantidad de energía que los alimentos y bebidas proporcionan al cuerpo. El cuerpo utiliza esta energía para realizar todas sus funciones, desde las más básicas como respirar y mantener el corazón latiendo, hasta actividades más complejas como correr o levantar pesas.</li>
          </ul>
        </>
      ),
      extendedText: (
        <>
          <p><b>Funcionamiento del Cuerpo con las Calorías:</b></p>
          <ul>
            <li>Metabolismo Basal (TMB): El metabolismo basal es la cantidad de calorías que el cuerpo necesita para mantener sus funciones vitales en reposo, como respirar, bombear sangre y regular la temperatura corporal. Esta tasa varía según la edad, el sexo, el peso y la composición corporal de cada persona.</li>
            <li>Actividad Física: Las calorías quemadas durante la actividad física incluyen cualquier movimiento del cuerpo, desde actividades cotidianas como caminar y limpiar, hasta ejercicios estructurados como correr, nadar o levantar pesas.</li>
            <li>Termogénesis Inducida por la Dieta: Este es el gasto energético asociado con la digestión, absorción y metabolismo de los alimentos. Representa un pequeño porcentaje del total de calorías quemadas cada día.</li>
          </ul>
          <p><b>Calorías y Peso Corporal:</b></p>
          <ul>
            <li>Balance Energético: El peso corporal está determinado por el equilibrio entre las calorías consumidas (a través de alimentos y bebidas) y las calorías gastadas (a través del metabolismo basal, actividad física y termogénesis inducida por la dieta).</li>
            <ul>
              <li>Balance Energético Neutro: Si consumes la misma cantidad de calorías que quemas, mantendrás tu peso.</li>
              <li>Balance Energético Positivo: Si consumes más calorías de las que quemas, el exceso de calorías se almacena en el cuerpo como grasa, lo que lleva al aumento de peso.</li>
              <li>Balance Energético Negativo: Si consumes menos calorías de las que quemas, el cuerpo utiliza las reservas de grasa para obtener energía, lo que lleva a la pérdida de peso.</li>
            </ul>
          </ul>
          <p><b>Aumento de Peso:</b></p>
          <ul>
            <li>Consumo de Exceso de Calorías: Cuando consumes más calorías de las que tu cuerpo necesita, estas calorías adicionales se almacenan en forma de grasa. Esto es un mecanismo de supervivencia del cuerpo para asegurarse de tener reservas de energía en tiempos de escasez de alimentos.</li>
            <li>Factores que Contribuyen al Exceso de Calorías:</li>
            <ul>
              <li>Dieta Alta en Calorías: Comer alimentos ricos en calorías como comidas rápidas, dulces y bebidas azucaradas.</li>
              <li>Bajo Nivel de Actividad Física: No realizar suficiente actividad física para quemar las calorías consumidas.</li>
              <li>Factores Genéticos y Metabólicos: Algunas personas tienen un metabolismo más lento, lo que significa que queman menos calorías en reposo.</li>
            </ul>
          </ul>
          <p><b>Pérdida de Peso:</b></p>
          <ul>
            <li>Déficit de Calorías: Para perder peso, debes crear un déficit calórico, es decir, consumir menos calorías de las que tu cuerpo necesita. Esto hace que el cuerpo utilice las reservas de grasa como fuente de energía, lo que lleva a la pérdida de peso.</li>
            <li>Estrategias para Crear un Déficit Calórico:</li>
            <ul>
              <li>Dieta: Comer alimentos bajos en calorías y ricos en nutrientes, como frutas, verduras, proteínas magras y granos enteros.</li>
              <li>Ejercicio: Aumentar el nivel de actividad física para quemar más calorías. Esto puede incluir ejercicios cardiovasculares como correr, nadar o andar en bicicleta, y ejercicios de resistencia como levantar pesas.</li>
              <li>Combinación de Ambos: La combinación de una dieta saludable y ejercicio regular es la estrategia más efectiva para perder peso de manera sostenible.</li>
            </ul>
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
            <h1>Nutrición</h1>
            <article>
              <p>En este apartado aprenderás todo lo necesario sobre macronutrientes y calorías para saber qué cantidad y alimento es adecuada y por qué.</p>
            </article>
          </div>
        </section>
        <section className="breweries" id="breweries">
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

export default LearnNutrition;
