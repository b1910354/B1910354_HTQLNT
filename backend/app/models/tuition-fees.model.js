const mongoose = require("mongoose");

const tuitionFeesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    collectionRates: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "CollectionRates"
    }]
});

module.exports = mongoose.model('TuitionFees', tuitionFeesSchema);

