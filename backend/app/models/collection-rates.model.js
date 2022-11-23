const mongoose = require("mongoose");

const collectionRatesSchema = new mongoose.Schema({
    money: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Grade"
    },
    tuitionFees: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "TuitionFees"
    }
});

module.exports = mongoose.model('CollectionRates', collectionRatesSchema);
