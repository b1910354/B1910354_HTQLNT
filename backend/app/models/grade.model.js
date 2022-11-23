const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    note: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        default: 'no notes'
    },
    schoolYear: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'SchoolYear'
    },
    class: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Class'
    }],
    collectionRates: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'CollectionRates'
    }]
});

module.exports = mongoose.model('Grade', gradeSchema);