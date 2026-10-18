const mongoose = require('mongoose');

const weightTrackingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true  
    },
    weights: [{
        type: Number,
        required: true
    }],
    dates: [{
        type: Date,
        default: Date.now
    }]
}, { timestamps: true });

const WeightTracking = mongoose.model('WeightTracking', weightTrackingSchema);

module.exports = WeightTracking;
