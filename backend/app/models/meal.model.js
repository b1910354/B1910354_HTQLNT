const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({ 
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    session: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true,
    }],
    mealTicket: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'MealTicket',
    }]
});

module.exports = mongoose.model('Meal', mealSchema);
