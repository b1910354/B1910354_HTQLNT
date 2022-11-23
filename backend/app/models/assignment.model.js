const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        trim: true,
    },
    mission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mission',
        required: true,
    },
    note: {
        type: String,
        trim: true,
        lowercase: true,
    }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
