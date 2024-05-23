// utils.js
const calculadora = (altura, kg, edad, obj, gen, act) => {
  let kcals;

  // Hombre o mujer
  if (gen === "Masculino") {
    kcals = (10 * kg) + (6.25 * altura) - (5 * edad) + 5;
  } else if (gen === 'Femenino') {
    kcals = (10 * kg) + (6.25 * altura) - (5 * edad) - 161;
  }

  if(act == 1){
    kcals = kcals * 1.15;
  }else if( act == 2){
    kcals = kcals * 1.35;
  }else if( act == 3){
    kcals = kcals * 1.35;
  }else if( act == 4){
    kcals = kcals * 1.55;
  }else if( act == 5){
    kcals = kcals * 1.55;
  }else if( act == 6){
    kcals = kcals * 1.75;
  }else if( act == 7){
    kcals = kcals * 1.95;
  }

  // Establecer las proporciones aproximadas de macronutrientes
  let proteinas = 0; // Valor por defecto para evitar undefined
  const factorProteinas = {
      "Perder peso": gen === "Masculino" ? 2 : 1.7,
      "Estilo de vida saludable": gen === "Masculino" ? 1.7 : 1.6,
      "Ganar masa muscular": gen === "Masculino" ? 2.5 : 1.8,
      "Mejorar salud cardiovascular": gen === "Masculino" ? 1.7 : 1.6
  };

  proteinas = kg * (factorProteinas[obj] || 1.6); // Usa un valor por defecto si obj no coincide

  const grasas = kg;
  const kcalPorProte = proteinas * 4; // 1 gramo de proteína tiene 4 kcal
  const kcalPorGrasa = grasas * 9; // 1 gramo de grasa tiene 9 kcal
  const carbohidratosPorKcal = kcals - (kcalPorProte + kcalPorGrasa);
  const carbohidratos = carbohidratosPorKcal / 4;

  return {
    proteinas: Math.round(proteinas),
    grasas: Math.round(grasas),
    carbohidratos: Math.round(carbohidratos),
    kcals: Math.round(kcals)
  };
};

  module.exports = { calculadora };