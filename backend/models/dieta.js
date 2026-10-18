const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DietaSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Object, required: true }
});

module.exports = mongoose.model('DietaG', DietaSchema);
