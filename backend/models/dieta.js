const mongoose = require("mongoose");

// Modificación del DiaSchema para incluir multiplicadores
const DiaSchema = new mongoose.Schema({
  desayuno: { type: mongoose.Schema.Types.ObjectId, ref: 'Nutricion' },
  desayunoMultiplicador: { type: Number, default: 1 },
  comida: { type: mongoose.Schema.Types.ObjectId, ref: 'Nutricion' },
  comidaMultiplicador: { type: Number, default: 1 },
  cena: { type: mongoose.Schema.Types.ObjectId, ref: 'Nutricion' },
  cenaMultiplicador: { type: Number, default: 1 }
});

const DietaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  lunes: DiaSchema,
  martes: DiaSchema,
  miercoles: DiaSchema,
  jueves: DiaSchema,
  viernes: DiaSchema,
  sabado: DiaSchema,
  domingo: DiaSchema
}, {
  timestamps: true
});

const Dieta = mongoose.model("Dieta", DietaSchema);

module.exports = Dieta;