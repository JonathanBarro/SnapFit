const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    edad: { type: Number },
    peso: { type: Number },
    altura: { type: Number },
    frec_actividad_sem: { type: Number }, // Frecuencia de actividad semanal
    t_disponible: { type: Number }, // Tiempo disponible
    r_comida: [{ type: String }], // Restricciones alimentarias (puede ser un array de strings)
    planNutricionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nutrition",
    },
    planEjercicioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
