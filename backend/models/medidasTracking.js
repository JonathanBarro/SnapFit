const mongoose = require('mongoose');

const medidasTrackingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true  
    },
    medidas: [{
        brazo: { type: Number },
        pecho: { type: Number },
        cintura: { type: Number },
        muslo: { type: Number },
        date: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model("MedidasTracking", medidasTrackingSchema);