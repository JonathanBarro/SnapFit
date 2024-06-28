const mongoose = require('mongoose');

const imcTrackingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true  
    },
    imc: [{
        type: Number,
        required: true
    }],
    dates: [{
        type: Date,
        default: Date.now
    }]
}, { timestamps: true });

module.exports = mongoose.model("IMCTracking", imcTrackingSchema);