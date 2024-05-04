const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    descripcion: { type: String, required: true },
    rutina: [
      {
        dia: { type: String, required: true },
        ejercicios: [
          {
            nombre: { type: String, required: true },
            tipo: { type: String, enum: ["cardio", "fuerza"], required: true },
            duracion: {
              type: Number,
              required: function() { return this.tipo === "cardio"; },
              min: 1 // Asegura que la duración no sea menor de 1 minuto si es necesario
            },
            series: {
              type: Number,
              required: function() { return this.tipo === "fuerza"; }
            },
            repeticiones: {
              type: Number,
              required: function() { return this.tipo === "fuerza"; }
            }
          }
        ]
      }
    ],
    usuarioId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true  // Automáticamente añade campos para createdAt y updatedAt
  }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
