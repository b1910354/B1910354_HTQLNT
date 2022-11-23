const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal',
        required: false,
    }],
});

module.exports = mongoose.model('Session', sessionSchema);