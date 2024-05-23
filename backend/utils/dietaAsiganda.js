const mongoose = require('mongoose');
const Nutricion = require('../models/nutricion')
const Dieta = require('../models/dieta')


async function encontrarPlato(tipoComida, kcalObjetivo, restricciones) {
  // Asegúrate de que 'restricciones' es un array antes de hacer la consulta
  const condicionesRestricciones = Array.isArray(restricciones) ? restricciones : [];

  const platos = await Nutricion.find({
    tipoComida: tipoComida,
    restricciones: { $nin: condicionesRestricciones } // Usando directamente las restricciones proporcionadas
  }).limit(10);  // Limitamos los resultados para mejorar el rendimiento

  if (platos.length === 0) {
    throw new Error('No se encontraron platos adecuados');
  }

  // Seleccionar aleatoriamente uno de los platos encontrados
  const platoSeleccionado = platos[Math.floor(Math.random() * platos.length)];
  const multiplicador = Math.ceil(kcalObjetivo / platoSeleccionado.kcals);
  
  return {
    plato: platoSeleccionado,
    multiplicador: multiplicador
  };
}

async function asignarDietaSemanal(usuarioId) {
  const usuario = await mongoose.model('User').findById(usuarioId);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  const dieta = new Dieta({ usuario: usuario._id });
  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
  const tipoComidas = ['desayuno', 'comida', 'cena'];
  const distribucionCalorica = { desayuno: 0.35, comida: 0.40, cena: 0.25 };

  for (let dia of dias) {
    dieta[dia] = {};
    for (let tipoComida of tipoComidas) {
      const kcalObjetivo = usuario.kcals * distribucionCalorica[tipoComida];
      const resultado = await encontrarPlato(tipoComida, kcalObjetivo, usuario.restricciones);
      dieta[dia][tipoComida] = resultado.plato._id;
      dieta[dia][`${tipoComida}Multiplicador`] = resultado.multiplicador;
    }
  }

  await dieta.save();
  return dieta;
}

module.exports = asignarDietaSemanal;
