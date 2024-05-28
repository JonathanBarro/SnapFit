const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EjercicioSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Object, required: true }
});

module.exports = mongoose.model('EjercicioG', EjercicioSchema);
