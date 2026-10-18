
const User = require('../models/user');
const Rutina = require('../models/exercise');

async function asignarRutinaAUsuario(userId, objetivo, tDisponible) {
    const rutina = await Rutina.findOne({
        objetivo: objetivo,
        dias: tDisponible
    });

    if (!rutina) {
        throw new Error('No hay rutinas disponibles que coincidan con los criterios.');
    }

   
    await User.findByIdAndUpdate(userId, { planEjercicioId: rutina._id });
}

module.exports = asignarRutinaAUsuario;
