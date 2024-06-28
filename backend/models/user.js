const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    edad: { type: Number },
    peso: { type: Number },
    altura: { type: Number },
    frec_actividad_sem: { type: Number },
    t_disponible: { type: Number },
    objetivo: { type: String },
    r_comida: [{ type: String }],
    genero: { type: String },
    kcals: { type: Number },
    proteinas: { type: Number },
    carbs: { type: Number },
    grasas: { type: Number },
    medidasCorporales: {
      brazo: { type: Number },
      pecho: { type: Number },
      cintura: { type: Number },
      muslo: { type: Number }
    },
    limitacionesNutricion: { type: String },
    limitacionesDeporte: { type: String },
    planNutricionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dieta",
    },
    planEjercicioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rutina",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
