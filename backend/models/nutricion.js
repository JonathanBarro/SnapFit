const mongoose = require('mongoose');

const NutricionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipoComida: { type: String, enum: ['desayuno', 'comida', 'cena'], required: true },
  kcals: { type: Number, required: true },
  macros: {
    carbs: { type: Number, required: true },
    proteinas: { type: Number, required: true },
    grasas: { type: Number, required: true }
  },
  restricciones: { type: [String], default: [] }, 
  ingredientes: [{ nombre: String, cantidad: String }],
},
{
  timestamps: true,
}); 

const Nutricion = mongoose.model("Nutricion", NutricionSchema);

module.exports = Nutricion;

 