const mongoose = require("mongoose");

const mealTicketSchema = mongoose.Schema({
    child: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Children",
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classes",
        required: true,
    },
    meal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal",
        required: true, 
    },
    dateTime: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Date_Time',
    }
});

module.exports = mongoose.model('MealTicket', mealTicketSchema);
