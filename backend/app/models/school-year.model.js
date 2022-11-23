const mongoose = require('mongoose');

const schoolYearSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    grades: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Grade'
    }]
});

module.exports = mongoose.model('SchoolYear', schoolYearSchema);
