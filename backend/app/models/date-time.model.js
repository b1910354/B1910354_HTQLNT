const mongoose = require('mongoose');

const dateTimeSchema = new mongoose.Schema({
    timeStart: {
        type: Date,
        default: Date.now,
        required: true,
    },
    timeEnd: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

module.exports = mongoose.model('Date_Time', dateTimeSchema);